const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/client.jsx',
  output: {
    filename: 'bundle.js'
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
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
           {
             loader: 'css-loader',
             options: {
               modules: true,
               localIdentName: process.env.NODE_ENV === 'production'
                ? '[hash:base64:5]'
                : '[name]__[local]___[hash:base64:5]'
             }
           }
         ],
        }),
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([{
      from: './assets'
    }], {})
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$super', '$', 'exports', 'require'] // Try without it
      }
    })
  );
} else {
  config.plugins.push(
    new LiveReloadPlugin()
  );
}

module.exports = config;