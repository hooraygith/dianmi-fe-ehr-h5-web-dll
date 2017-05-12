var webpack = require('webpack');
var path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  entry: {
    vendor: [   'axios',
                'vue',
                'vue-router',
                'vuex',
                'jquery',
                'mint-ui',
                'mint-ui/lib/style.css'
        ]
  },
  output: {
    filename: 'dll.js',
    path: path.resolve(__dirname, './dist'),
    library: 'dll_lib',
  },
  module: {
    loaders: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!sass-loader'
            })
      }
    ]
  },
  plugins: [
      new webpack.DllPlugin({
        name: 'dll_lib',
        path: 'dist/manifest.json',
      }),
      new ExtractTextPlugin('dll.css')
  ]
};