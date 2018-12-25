const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getEnv } = require('./env');

/**
 * Paths
 */
const { NODE_ENV = 'development' } = process.env;
const ENV = getEnv(NODE_ENV);
const PORT = process.env.PORT || 8080;
const SOURCE_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, './public');
const DIST_PATH = path.resolve(__dirname, './dist');

/**
 * Base configuration
 */
const config = {
  entry: path.join(SOURCE_PATH, 'main.js'),

  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename:
      NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name].[hash:16].js',
  },

  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: NODE_ENV === 'development' && 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NodeEnvironmentPlugin('NODE_NODE_ENV'),
    new SimpleProgressWebpackPlugin({
      format: NODE_ENV === 'development' ? 'minimal' : 'compact',
    }),
    new ExtractTextPlugin(
      NODE_ENV === 'development' ? 'main.css' : 'main.[hash:16].css',
    ),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_PATH, './index.html'),
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      ENV: JSON.stringify(ENV),
    }),
  ],

  resolve: {
    modules: ['node_modules', SOURCE_PATH],
    extensions: ['.js', '.vue', '.css'],
    alias: {
      '@': SOURCE_PATH,
    },
  },

  devServer: {
    port: PORT,
    contentBase: DIST_PATH,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/http': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      },
    },
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: [/node_modules/, /\.spec.js$/],
        include: [SOURCE_PATH],
      },

      {
        loader: 'vue-loader',
        test: /\.vue$/,
        options: {
          extractCss: true,
        },
      },

      {
        loader: 'url-loader',
        test: /\.(png|jpe?g|svg|ttf|eot|woff2?)$/,
        options: {
          limit: 8000,
        },
      },
    ],
  },
};

if (NODE_ENV === 'development') {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  );
}

module.exports = config;
