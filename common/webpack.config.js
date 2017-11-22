'use strict'

const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')

module.exports = {
    output: {
        filename: '[name]-[hash:8].js',
        chunkFilename: '[name]-[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [path.resolve(process.cwd(), 'node_modules/@dm/sass-boilerplate/src/index.scss')]
                    }
                }
            ]
        }, {
            test: /\.(woff|svg|eot|ttf|gif|jpg|swf|png)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                cssModules: {
                    // localIdentName: '[path][name]-[local]-[hash:base64:5]',
                    localIdentName: '[local]-[hash:base64:5]',
                    camelCase: true
                },
                loaders: {
                    js: [{
                        loader: 'babel-loader',
                        options:{
                            "compact": true,
                            "presets": [
                                "es2015",
                                "es2016",
                                "es2017"
                            ],
                            "plugins": [
                                "transform-runtime",
                                "transform-object-rest-spread",
                                "transform-vue-jsx"
                            ]
                        }
                    }],
                    css: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [path.resolve(process.cwd(), 'node_modules/@dm/sass-boilerplate/src/index.scss')]
                            }
                        }
                    ],
                    scss: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [path.resolve(process.cwd(), 'node_modules/@dm/sass-boilerplate/src/index.scss')]
                            }
                        }
                    ]
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
                options:{
                    "compact": true,
                    "presets": [
                        "es2015",
                        "es2016",
                        "es2017"
                    ],
                    "plugins": [
                        "transform-runtime",
                        "transform-object-rest-spread",
                        "transform-vue-jsx"
                    ]
                }
            }
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }]
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            'vue': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'vue'
        })
    ]
}
