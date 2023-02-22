const path = require('path')

const Dotenv = require('dotenv-webpack')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: [__dirname + '/src/js/main.js', __dirname + '/src/scss/main.scss'],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: '[base]',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'assets/',
          publicPath: 'assets/',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      prefix: 'meta.env.', // reference your env variables as 'meta.env.ENV_VAR'.
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/icons/*.png', to: 'assets/icons/[base]' }],
    }),
  ],
}
