const webpack = require('webpack')
const { merge } = require('webpack-merge')

const HtmlWebpackPlugin    = require('html-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].bundle.css'}
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: 'src/template.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false
        })
    ]
})
