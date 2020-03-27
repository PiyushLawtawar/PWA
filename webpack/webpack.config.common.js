const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = require('../config/paths');

const isProduction = process.env.NODE_ENV === 'production';

const babelRules = (isServer) => {
  const bConfig = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: {
      customize: require.resolve(
        'babel-preset-react-app/webpack-overrides'
      ),
      presets: ['react-app'],
      plugins: [
        [
          require.resolve('babel-plugin-named-asset-import'),
          {
            loaderMap: {
              svg: {
                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
              },
            },
          },
        ],
      ],
      cacheDirectory: true,
      // Save disk space when time isn't as important
      cacheCompression: true,
      compact: true,
    }
  };

  if (!(isServer && isProduction)) {
    bConfig.options.plugins = [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
            },
          },
        },
        'react-hot-loader/babel',
      ],
    ];
  }

  return bConfig;
}

const rules = (isServer) => ([{
    test: /\.(ico|gif|png|jpe?g|svg)$/,
    loaders: [{
      loader: 'file-loader',
      options: {
        name: 'static/img/[path][name].[ext]',
        context: PATHS.CLIENT_DIR
      }
    }]
  },
  babelRules(isServer),
  {
    test: /\.(styl|css)$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
    include: PATHS.CLIENT_DIR
  }
]);

const resolve = () => ({
  extensions: ['*', '.js', '.jsx', '.css', '.styl'],
  // alias: {
  //   '@theme': `../src/styles/themes/${theme}`
  // }
});

const plugins = () => ([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.BABEL_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new ManifestPlugin({
    fileName: 'manifest.json'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash:6].css',
    chunkFilename: '[id].[hash:6].css',
    minimize: true
  })
]);

const prodWebPlugin = () => ([
  ...plugins(),
  new HtmlWebPackPlugin({
    template: path.join(PATHS.CLIENT_DIR, 'index.html'),
    filename: './index.html'
  })
]);

const devWebPlugin = () => ([
  ...prodWebPlugin(),
  new webpack.HotModuleReplacementPlugin()
]);

const prodServerPlugin = () => ([
  ...plugins()
]);

const devServerPlugin = () => ([
  ...plugins(),
  new webpack.HotModuleReplacementPlugin()
]);

const getWebpackConfig = (isServer, config) => {
  return Object.assign({}, {
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: isServer ? rules(isServer) : [...rules(isServer), {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      }]
    },
    resolve: resolve(),
    plugins: isServer
      ? isProduction ? prodServerPlugin() : devServerPlugin()
      : isProduction ? prodWebPlugin() : devWebPlugin()
  }, config);
};

module.exports = getWebpackConfig;
