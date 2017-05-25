const fs = require('fs');
const webpack = require('webpack');

const nodeModules = fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce(
    (modules, module) => Object.assign(modules, { [module]: `commonjs ${module}` }),
    {}
  )

const config = {
  entry: './src/statics.js',
  output: {
    filename: 'statics.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: nodeModules,
  target: 'node'
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$super', '$', 'exports', 'require'] // Try without it
      }
    })
  ];
}

module.exports = config;