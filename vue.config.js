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
const { NODE_ENV = 'development', SOURCE_MAP, WEBPACK_MODE } = process.env;
const ENV = getEnv(NODE_ENV);
const PORT = process.env.PORT || 8080;
const PUBLIC_PATH = path.resolve(__dirname, './public');
const DIST_PATH = path.resolve(__dirname, './dist');

const config = {
  outputDir: DIST_PATH,
  productionSourceMap: false,
  lintOnSave: false,

  configureWebpack: {
    devtool: SOURCE_MAP && 'cheap-module-eval-source-map',

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new SimpleProgressWebpackPlugin({
        format: WEBPACK_MODE === 'development' ? 'minimal' : 'compact',
      }),
      new ExtractTextPlugin(
        WEBPACK_MODE === 'development' ? 'main.css' : 'main.[hash:16].css',
      ),
      new HtmlWebpackPlugin({
        template: path.resolve(PUBLIC_PATH, './index.html'),
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(ENV),
      }),
    ],
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));
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
};

if (WEBPACK_MODE === 'development') {
  config.configureWebpack.plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  );
}


module.exports = config;
