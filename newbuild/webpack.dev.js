'use strict'
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const base = require('./webpack.base')
const _ = require('./utils')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

base.devtool = 'eval-source-map'
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
)

// push loader for css files
_.cssProcessors.forEach(processor => {
  let loaders
  if (processor.loader === '') {
    loaders = ['postcss-loader']
  } else {
    loaders = ['postcss-loader', processor.loader]
  }
  base.module.loaders.push(
    {
      test: processor.test,
      loaders: ['style-loader', _.cssLoader].concat(loaders)
    }
  )
})


base.module.loaders.push(
  {
    test: /\.font\.(js|json)$/,
    loader: 'style-loader!css-loader!webfonts-loader?fileName=static/fonts/[fontname].[hash:7][ext]',
  }
)

module.exports = base
