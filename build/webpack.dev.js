'use strict'
const webpack = require('webpack')
const base = require('./webpack.base')
const _ = require('./utils')

base.devtool = 'eval-source-map'
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

// push loader for .css file
base.module.loaders.push(
  {
    test: /\.css$/,
    loader: _.cssLoader
  }
)

base.module.loaders.push(
  {
    test: /\.font\.(js|json)$/,
    loader: 'style-loader!css-loader!fontgen-loader?fileName=static/fonts/[fontname].[hash:7][ext]',
  }
)

module.exports = base
