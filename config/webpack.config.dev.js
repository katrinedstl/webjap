var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var path = require('path');
var fs = require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var getClientEnvironment = require('./env');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    resolveApp('src/index.jsx')
  ],
  output: {
    path: resolveApp('build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: resolveApp('src'),
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: resolveApp('src'),
        loader: 'babel',
        query: {
          presets:['es2015','react','stage-2'],
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
      extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'assets', to: 'assets' } ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp('public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(resolveApp('node_modules'))
  ]
};
