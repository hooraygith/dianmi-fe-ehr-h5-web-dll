const webpack = require('webpack')
const path = require('path')
const Clean = require('clean-webpack-plugin')
const config =  require('./webpack.config.base.js')
const packageInfo = require(process.cwd() + '/package.json')

config.plugins.push(
    new webpack.DllPlugin({
        name: '[name]',
        path: `dist/dev/${packageInfo.version}/[name].json`
    }),
    new Clean(['dist/dev'], {
        root: process.cwd()
    })
)  //清空目录

config.output.path = path.resolve(process.cwd(), `dist/dev/${packageInfo.version}`)


module.exports = config
