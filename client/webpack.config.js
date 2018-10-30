const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist_client'),
    filename: 'zmff.bundle.js'
  },
  plugins: [
    new CopyPlugin([{
      from: path.resolve(__dirname, 'public'),
      to: path.resolve(__dirname, '../dist_client')
    }])
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname),
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'eval-source-map'
}