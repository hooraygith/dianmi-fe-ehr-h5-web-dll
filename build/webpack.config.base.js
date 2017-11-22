const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        dll: [
            'vue',
            'vuex',
            'vue-router',
            'zepto'
        ]
    },
    output: {
        // name hash chunkhash
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../src')],
        alias: {
            'vue': 'vue/dist/vue.common.js'
        },
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
        {
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
            loader: 'babel-loader'
        }, {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!postcss-loader!sass-loader"
                })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!postcss-loader!less-loader"
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
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'vue'
        }),

        // css 插入 html head
        new ExtractTextPlugin('dll.css')
    ]
}
