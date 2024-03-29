'use strict'
const path = require('path')
const webpack = require('webpack')
const BrandChangePlugin = require('./plugins/brandChange')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./conf')
const _ = require('./utils')
const globalConfig = require('../config');

let isSlash = process.env.NODE_ENV === 'development' ? '' : '/'

module.exports = {
  entry: {
    client: './client/index.js'
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: _.publicPath
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../client'),
      app: path.join(__dirname, '../client'),
      style:path.join(__dirname,'../client/style'),
      services: path.join(__dirname, '../client/services'),
      components: path.join(__dirname, '../client/components'),
      views: path.join(__dirname, '../client/views')
    },
    modules: [
      _.cwd('node_modules'),
      // this meanse you can get rid of dot hell
      // for example import 'components/Foo' instead of import '../../components/Foo'
      _.cwd('client')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader']
      },
      {
        test:   /\.pcss$/,
        loaders: "style-loader!css-loader!postcss-loader?sourceMap"
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.es6$/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        //loaders: [`file-loader?name=${isSlash}static/media/[name].[hash:8].[ext]`,'webp-loader?{quality: 80}'],
        query: {
          name: `${isSlash}static/media/[name].[hash:8].[ext]`
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },
    ]
  },
  plugins: [
    new BrandChangePlugin(),
    new HtmlWebpackPlugin({
      trendever: globalConfig.trendever,
      title: config.title,
      template: path.resolve(__dirname, 'index.html'),
      filename: _.outputIndexPath
    }),
    new webpack.LoaderOptionsPlugin(_.loadersOptions()),
    // new CopyWebpackPlugin([
    //   {
    //     from: _.cwd('./static'),
    //     // to the roor of dist path
    //     to: './'
    //   }
    // ])
  ],
  target: _.target
}
