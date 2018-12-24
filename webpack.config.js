const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const root = __dirname;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  target: 'node',
  entry: [
    '@babel/polyfill',
    './src/index.js'
  ],
  module: {
    rules: [{
      test: /\.(js|jsx|mjs)$/,
      include: path.join(root, 'src'),
      loader: 'babel-loader?cacheDirectory',
      options: {
        compact: true,
      },
    }
    ],
  },
  output: {
    path: path.join(root, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: true,
      sourceMap: true
    })],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
