const path = require('path')
const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')

module.exports = {
    entry: {
        dll: [
            'vue',
            'vuex',
            'vue-router',
            'zepto-webpack'
        ]
    },
    output: {
        path: path.resolve(process.cwd(), `dist/`),
        filename: '[name].js',
        library: '[name]'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: `dist/[name].json`
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new Clean(['dist'], {
            root: process.cwd()
        })
    ]
}
