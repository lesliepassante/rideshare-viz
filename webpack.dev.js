const merge = require('webpack-merge');
const common = require('./webpack.common.js');

if (!process.env.MAPBOX_ACCESS_TOKEN) {
  console.error('Missing required environment variable MAPBOX_ACCESS_TOKEN.');
  process.exit(1);
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader/url' }, { loader: 'file-loader' }]
      }
    ]
  }
});
