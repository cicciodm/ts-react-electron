/// <reference path="node_modules/@types/node/index.d.ts"/>

// Used to build node.js files

var webpack = require('webpack');
var path = require("path");

var config = {
  entry: [
    './ElectronApp.js'
  ],

  output: {
      path: path.join(__dirname, 'objd'),
      filename: 'ElectronApp.js',
      libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['', '.js', '.json'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'electron',

  node: {
    __dirname: false,
    __filename: false
  },

  externals: [
  ],

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
};

module.exports = config;