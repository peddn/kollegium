const webpack = require('webpack')
const {merge} = require('webpack-merge')
const dotenv = require('dotenv')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

// load .env
const env = dotenv.config().parsed

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/template.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: true,
      // we have to use 'process.env' here
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
      'process.env.API_URL': JSON.stringify(env.API_URL),
    }),
  ],
})
