const path = require('path')
const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')
const packageInfo = require(process.cwd() + '/package.json')

module.exports = {
    mode: 'production',
    entry: {
        dll: [
            'vue/dist/vue.runtime.common.js',
            'vuex',
            'vue-router',
            'zepto-webpack'
        ]
    },
    output: {
        path: path.resolve(process.cwd(), `dist/${packageInfo.version}`),
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
            path: `dist/${packageInfo.version}/[name].json`
        }),
        new Clean(['dist'], {
            root: process.cwd()
        })
    ]
}
