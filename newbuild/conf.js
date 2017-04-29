'use strict'
const path = require('path');
const webpack = require('webpack');
const pkg = require('../package')
const config = require('../config');
module.exports = {
  port: config.webserver.port,
  title: config.trendever ?
    'Trendever.com - шопинг в Instagram стал проще' :
    'Directbot.io - CRM для бизнеса в Instagram',
  vendor: Object.keys(pkg.dependencies),
  babel: {
    babelrc: true,
    presets: [
      ['es2015', {modules: false}],
      'stage-2'
    ],
    plugins: [
      'transform-vue-jsx'
    ]
  },

  postcss: function(){
    return [
      require( `postcss-use` )(
        {
          modules: [
            'postcss-autoreset',
            'postcss-initial'
          ]
        }
      ),
      require('postcss-import')({
        path: path.resolve('./client'),
        addDependencyTo: webpack
      }),
      require("postcss-url")(),
      require('postcss-nested')(),
      require('postcss-comment/hookRequire')(),
      require('postcss-discard-comments')(),
      require('postcss-short')(),
      require('precss')(),
      require('postcss-color-function')(),
      require('postcss-flexbugs-fixes')(),
      require('autoprefixer')({
        // Vue does not support ie 8 and below
        browsers: ['last 2 versions', 'ie > 8']
      })

    ]

  },
  cssModules: true,
}
