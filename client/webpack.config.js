const path = require('path');

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '../dist_client'),
    filename: 'client.bundle.js'
  },
  mode: development,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}