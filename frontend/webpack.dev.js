const webpack = require('webpack')
const { merge } = require('webpack-merge')

const HtmlWebpackPlugin    = require('html-webpack-plugin')

const common = require('./webpack.common.js')
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
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'src/template.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: true
        })
    ]
})