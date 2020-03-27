const path = require('path');
const nodeExternals = require('webpack-node-externals');

const PATHS = require('../config/paths');
const getWebpackBaseConfig = require('./webpack.config.common');

const isServer = true;
const config = {
  entry: path.join(PATHS.SERVER_DIR, 'index.js'),
  output: {
    path: PATHS.SSR_DIR,
    publicPath: '/',
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()]
};

module.exports = getWebpackBaseConfig(isServer, config);
