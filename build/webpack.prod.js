const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const banner = require('./banner');

// https://webpack.js.org/guides/production/
module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                // Must used with webpack.SourceMapDevToolPlugin to enable SourceMap support with minified file
                // , or it will be not working
                sourceMap: true,
                parallel: true,
                extractComments: false,
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: {},
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                }
            })
        ],
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            // exclude: ['vendor.js']
        })
    ]
});