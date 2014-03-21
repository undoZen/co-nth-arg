'use strict';
var thunkify = require('thunkify')

function nth(n, fn) {
  return function (err) {
    return fn.call(this, n ? err : null, arguments[n]);
  }
}

function passNthArg(n, fn) {
  return function (f) {
    return fn(nth(n, f));
  }
}

function thunkNthArg(n, fn) {
  return function () {
    var f = fn.apply(this, arguments);
    return passNthArg(n, f);
  }
}

exports = module.exports = thunkNthArg;
exports.zeroth = thunkNthArg.bind(null, 0);
exports.first = thunkNthArg.bind(null, 1);
exports.second = thunkNthArg.bind(null, 2);

exports.thunkify = function (n, fn) {
  if ('number' == typeof n) return thunkNthArg(n, thunkify(fn));
  else return thunkify(fn);
}
