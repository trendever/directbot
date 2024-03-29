var fs = require('fs');
var path = require('path');

function MyPlugin() {};

MyPlugin.prototype.apply = function (compiler) {

  var textTrendeverOldColors = `
    $color__brand: #31bebc;
    $color__brand-dark: #0e3333;
    $color__brand-opacity: rgba(24, 92, 90, .7);
    $color__brand-light: #279897;
    $color__brand-bright: #c4e4e8;
    $color__brand-border: #85cccb;

  `;

  var textTrendeverGreenForest = `
    $color__brand: #1EA503;
    $color__brand-dark: #0C2107;
    $color__brand-opacity: rgba(31, 77, 19, .85);
    $color__brand-light: #23870E;
    $color__brand-bright: #DBEBDB;
    $color__brand-border: #A4C2A4;

  `;

  var textDirectbot = `
    $color__brand:#5E8BCE;
    $color__brand-dark:#09162B;
    $color__brand-light:#496DA1;
    $color__brand-opacity:rgba(94, 139, 206,.6);
    $color__brand-bright: #CEDCF2;
    $color__brand-border: #8FADD9;
  `

  compiler.plugin('compile', function() {
    var config = require('../../config');
    var current = config.trendever ? textTrendeverOldColors : textDirectbot;
    fs.writeFile(path.join(__dirname, '../../client/style/vars/brand.pcss'), current,'utf-8', function (err) {
      if (err) return console.log(err);
      console.log('make vars.css');
    });
  });
}


module.exports = MyPlugin;
