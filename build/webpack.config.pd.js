const webpack = require('webpack')
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const path = require('path')
const Clean = require('clean-webpack-plugin')
const config =  require('./webpack.config.base.js')
const packageInfo = require(process.cwd() + '/package.json')

config.plugins.push(
    new webpack.DllPlugin({
        context: '.',
        name: '[name]',
        path: `dist/pd/${packageInfo.version}/[name].json`
    }),
    new uglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    // 压缩 css
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
)
config.plugins.push(new Clean(['dist/pd'],{
    root: process.cwd()
}))  //清空目录

config.output.path = path.resolve(process.cwd(), `dist/pd/${packageInfo.version}`)

module.exports = config
