'use strict'
const path = require('path');
const webpack = require('webpack');
const pkg = require('../package')

module.exports = {
  port: 4000,
  title: 'trendever2',
  vendor: Object.keys(pkg.dependencies),
  babel: {
    babelrc: false,
    presets: [
      ['es2015', {modules: false}],
      'stage-1'
    ],
    plugins: [
      'transform-vue-jsx'
    ]
  },
  postcss: [
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('postcss-nested'),
    require('precss'),
    require('postcss-import')({
      path: path.join(__dirname, '../client'),
      addDependencyTo: webpack
    })
  ],
  cssModules: true,
}
