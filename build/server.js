'use strict'
const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev')
const config = require('./config')


let textTrendever = `
  @import 'style/vars/colors.pcss';
  @import 'style/vars/fonts.pcss';
  @import 'style/vars/media.pcss';
  @import 'style/vars/sizes.pcss';
  @import 'style/vars/zIndex.pcss';
  @import 'style/vars/mixins.pcss';

  $transition: .3s;
  $btn-transition: 64ms ease-in-out;


  $color__brand: #31bebc;
  $color__brand-dark: #0e3333;
  $color__brand-opacity: rgba(24, 92, 90, .7);

`;
let textDirectbot = `
  //D I R E C T B O T
  @import 'style/vars/colors.pcss';
  @import 'style/vars/fonts.pcss';
  @import 'style/vars/media.pcss';
  @import 'style/vars/sizes.pcss';
  @import 'style/vars/zIndex.pcss';
  @import 'style/vars/mixins.pcss';

  $transition: .3s;
  $btn-transition: 64ms ease-in-out;

  $color__brand:#5E8BCE;
  $color__brand-dark:#09162B;
  $color__brand-light:#496DA1;
  $color__brand-opacity:rgba(94, 139, 206,.6);

`

let current = config.trendever ? textTrendever : textDirectbot;

fs.writeFile(path.join(__dirname, '../client/style/vars/vars.pcss'), current,'utf-8', function (err) {
  if (err) return console.log(err);
  console.log('make vars.css');
});


const app = express()

const port = config.port
webpackConfig.entry.client = [
  `webpack-hot-middleware/client`,
  webpackConfig.entry.client
]

const compiler = webpack(webpackConfig)

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
})
app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler))

const mfs = devMiddleWare.fileSystem
const file = path.join(webpackConfig.output.path, 'index.html')
app.get('*', (req, res) => {
  devMiddleWare.waitUntilValid(() => {
    const html = mfs.readFileSync(file)
    res.end(html)
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
