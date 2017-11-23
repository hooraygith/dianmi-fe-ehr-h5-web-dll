'use strict'

const path = require('path')
const webpack = require('webpack')
const vuxLoader = require('vux-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let config = {
    output: {
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/[name]-[chunkhash:8].js',
        publicPath: '/',
        crossOriginLoading: 'anonymous'
    },
    resolve: {
        modules: ['node_modules', process.cwd() + '/src'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.common.js'
        },
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'css': [
                        'vue-style-loader',
                        {
                            'loader': 'css-loader!postcss-loader!sass-loader'
                        }
                    ]
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!postcss-loader!sass-loader"
                })
        }, {
            test: /\.(jpe?g|svg|png|gif|webp)$/,
            loader: 'url-loader',
            query: {
                limit: 5000,
                name: 'img/[name]-[hash:8].[ext]'
            }
        }, {
            test: /\.(eot|woff2?|ttf)$/,
            loader: 'url-loader',
            query: {
                limit: 1,
                name: 'font/[name]-[hash:8].[ext]'
            }
        }, {
            test: /\.(html|ejs)$/,
            loader: 'html-loader'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'vue',
            $: 'zepto-webpack'
        })
    ]
}

module.exports = vuxLoader.merge(config, {
    plugins: ['vux-ui']
})
