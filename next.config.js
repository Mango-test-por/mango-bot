const path = require('path')

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
