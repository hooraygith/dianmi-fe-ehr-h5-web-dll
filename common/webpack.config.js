'use strict'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const vuxLoader = require('vux-loader')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const variable = fs.readFileSync(path.resolve(process.cwd(), 'src/static/styles/variable.scss'), 'utf8')


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
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'css-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]-[hash:base64:5]'
                    }
                },
                'postcss-loader',
                'resolve-url-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        data: variable
                    }
                }
            ]
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
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
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'vue',
            $: 'zepto-webpack'
        }),
        new VueLoaderPlugin()
    ]
}

module.exports = config

// module.exports = vuxLoader.merge(config, {
//     plugins: [
//         'vux-ui',
//         {
//             name: 'less-theme',
//             path: 'src/static/styles/vux-theme.less'
//         }
//     ]
// })
