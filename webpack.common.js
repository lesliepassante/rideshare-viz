const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /workers\/([a-zA-Z0-9\s_\\.\-():])+.js$/,
        use: { loader: 'worker-loader', options: { inline: true, name: '[name].[hash].js' } }
      }
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
    new HtmlWebpackPlugin({
      title: 'rideshare viz',
      template: 'src/js/templates/index.html'
    }),
    new GenerateJsonPlugin('config.json', {
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
      MAPBOX_STYLE: process.env.MAPBOX_STYLE
    })
  ],
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/js/actions'),
      components: path.resolve(__dirname, 'src/js/components'),
      containers: path.resolve(__dirname, 'src/js/containers'),
      hooks: path.resolve(__dirname, 'src/js/hooks'),
      reducers: path.resolve(__dirname, 'src/js/reducers'),
      selectors: path.resolve(__dirname, 'src/js/selectors'),
      utils: path.resolve(__dirname, 'src/js/utils'),
      workers: path.resolve(__dirname, 'src/js/workers')
    },
    extensions: ['.js', '.jsx']
  }
};
