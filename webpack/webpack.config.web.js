const path = require('path');

const PATHS = require('../config/paths');
const getWebpackBaseConfig = require('./webpack.config.common');

const isProduction = process.env.NODE_ENV === 'production';
const isServer = false;
const config = {
  entry: path.join(PATHS.CLIENT_DIR, 'index.js'),
  output: {
    path: PATHS.BUILD_DIR,
    publicPath: '/',
    filename: '[name].[hash:6].js'
  }
};

const optimization = {
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all',
        name: 'vendor',
        enforce: true
      }
    }
  }
};

if (isProduction) {
  config.optimization = optimization;
}

module.exports = getWebpackBaseConfig(isServer, config);
