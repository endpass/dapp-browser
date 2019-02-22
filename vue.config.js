const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
    resolve: { symlinks: false },

    devtool: SOURCE_MAP && 'cheap-module-eval-source-map',

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(PUBLIC_PATH, './index.html'),
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(ENV),
      }),
    ],
  },

  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: 'src/assets/icons',
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: 'img/icons.[hash:8].svg', // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true,
      },
    },
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
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
