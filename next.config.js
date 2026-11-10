const path = require('path')

// When the public base is relative ("/backend"), the browser talks to the app's
// own origin and this rewrite proxies to the real backend. That means every
// API + socket request goes through the app's front door (Cloudflare Bot Fight
// Mode) instead of hitting the backend host directly.
const PUBLIC_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const RELATIVE_BACKEND = PUBLIC_BASE.startsWith('/')
const BACKEND_ORIGIN = (
    process.env.BACKEND_ORIGIN ||
    (RELATIVE_BACKEND ? 'http://localhost:5000' : PUBLIC_BASE) ||
    'http://localhost:5000'
).replace(/\/+$/, '')

// Workaround for "Watchpack Error (initial scan): EINVAL ... lstat 'C:\pagefile.sys'"
// on Windows with Node >= 22.17 running as Administrator (webpack/watchpack#187).
// Webpack watches every ancestor directory up to the drive root; scanning C:\
// fails on protected system files. Removing the drive root from the watched
// dependency sets stops the scan (it is not needed for HMR of project files).
class IgnoreDriveRootWatchPlugin {
    apply(compiler) {
        const root = path.parse(__dirname).root.replace(/[\\/]+$/, '').toLowerCase()
        compiler.hooks.done.tap('IgnoreDriveRootWatchPlugin', (stats) => {
            const { fileDependencies, contextDependencies, missingDependencies } = stats.compilation
            for (const set of [fileDependencies, contextDependencies, missingDependencies]) {
                for (const item of set) {
                    if (item.replace(/[\\/]+$/, '').toLowerCase() === root) {
                        set.delete(item)
                    }
                }
            }
        })
    }
}

module.exports = {
    async rewrites() {
        if (!RELATIVE_BACKEND) return []
        return [
            {
                source: '/backend/:path*',
                destination: `${BACKEND_ORIGIN}/:path*`,
            },
        ]
    },
    webpack(config, { dev }) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        if (dev) {
            config.plugins.push(new IgnoreDriveRootWatchPlugin())
            // Disable the persistent cache in dev: on startup webpack would
            // otherwise restore the cached dependency list (including the
            // drive root) and start watching it before the plugin above runs.
            config.cache = false
        }

        return config
    },
    compiler: {
        styledComponents: true
    }
}
