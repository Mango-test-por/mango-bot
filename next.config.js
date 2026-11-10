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
    // Middleware runs at the edge at RUNTIME, where committed .env entries do
    // not exist on Vercel. Inline the build-time values under BUILD_* names;
    // middleware then prefers runtime dashboard vars (PRIMARY_HOST etc.) and
    // falls back to these, so links can also be changed from the dashboard.
    env: {
        BUILD_PRIMARY_HOST: process.env.PRIMARY_HOST || 'www.weissachinterview.com',
        BUILD_ENTRY_PROOF_SECRET: process.env.ENTRY_PROOF_SECRET || '',
    },
    // Socket.IO handshakes live on paths with a trailing slash (/socket.io/).
    // Next's default trailing-slash 308 redirect breaks those handshakes (the
    // engine.io client cannot follow a redirect on the WebSocket upgrade, and
    // polling loses its session), so let the /backend rewrite handle them
    // as-is instead.
    skipTrailingSlashRedirect: true,
    async rewrites() {
        if (!RELATIVE_BACKEND) return []
        return [
            // Engine.IO lives on /socket.io/ WITH the trailing slash; :path*
            // strips it in the generic rewrite below, breaking the handshake.
            {
                source: '/backend/socket.io/',
                destination: `${BACKEND_ORIGIN}/socket.io/`,
            },
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
