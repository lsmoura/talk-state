const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const ENTRY_MAP = {
  'hello-world': '0-hello_world',
  'stateless-table': '1-stateless_table',
  'sort-table': '2-sort_table',
  'cork-board': '3-cork_board',
  'improved-board': '4-improved_cork_board',
};

const config = {
  mode: PRODUCTION ? 'production' : 'development',
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  entry: Object.keys(ENTRY_MAP).reduce(
    (output, key) => {
      output[key] = path.resolve(__dirname, 'src', ENTRY_MAP[key]);
      return output;
    },
    {},
  ),
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractCssChunks.loader, options: {
              hmr: !PRODUCTION,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new ExtractCssChunks({
      filename: '[name].[hash:8].css',
    }),
    !PRODUCTION ? new ReactRefreshWebpackPlugin() : null,
  ].concat(Object.keys(ENTRY_MAP).map(
    key => new HtmlWebpackPlugin({
      chunks: [key],
      filename: `${key}.html`,
      minify: PRODUCTION,
    }),
    ))
    .filter(Boolean),
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          chunks: 'all',
          name: 'react',
          test: /[\\/]react(-dom)?[\\/]/,
        },
      },
    },
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    port: PORT,
  },
};

module.exports = config;