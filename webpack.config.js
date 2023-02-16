const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader" 
        }),
        exclude: /node_modules/,
        include:path.resolve(__dirname, './src/css') 
       },
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
	new UglifyJsPlugin({
      uglifyOptions: {
        parallel: true,
        output: {
          comments: false,
          beautify: false,
        },
        compress: true
      }
	})
  ]
}
