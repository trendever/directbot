let fs = require('fs');
let path = require('path');
let config = require('../../config');
function MyPlugin() {};

MyPlugin.prototype.apply = function (compiler) {
  let textTrendever = `
    $color__brand: #31bebc;
    $color__brand-dark: #0e3333;
    $color__brand-opacity: rgba(24, 92, 90, .7);

  `;
  let textDirectbot = `
    $color__brand:#5E8BCE;
    $color__brand-dark:#09162B;
    $color__brand-light:#496DA1;
    $color__brand-opacity:rgba(94, 139, 206,.6);
  `
  let current = config.trendever ? textTrendever : textDirectbot;

  compiler.plugin('compile', function() {
    fs.writeFile(path.join(__dirname, '../../client/style/vars/brand.pcss'), current,'utf-8', function (err) {
      if (err) return console.log(err);
      console.log('make vars.css');
    });
  });
}


module.exports = MyPlugin;
