"use strict"

let mod = {}

let test = ['resizeImages', 'imageOperations', 'colorManipulations']
test.forEach(function (module) {
  require('./' + module)(mod);
});

module.exports = mod