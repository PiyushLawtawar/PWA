const path = require('path');

const PATHS = require('../config/paths');
const getWebpackBaseConfig = require('./webpack.config.common');

const isProduction = process.env.NODE_ENV === 'production';
const isServer = false;
const PORT = 3000;
const config = {
  devtool: 'eval',
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${PORT}`,
      'webpack/hot/only-dev-server',
      path.join(PATHS.CLIENT_DIR, 'index.js')
    ]
  },
  output: {
    path: PATHS.BUILD_DIR,
    publicPath: '/',
    filename: '[name].[hash:6].js'
  }
};

const webpackConfig = getWebpackBaseConfig(isServer, config);

webpackConfig.devServer = {
  port: PORT,
  inline: true,
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true
  }
};

webpackConfig.resolve = {
  extensions: ['*', '.json', '.js', '.jsx', '.css', '.styl'],
  modules: [PATHS.CLIENT_DIR, 'node_modules']
};

module.exports = webpackConfig;
