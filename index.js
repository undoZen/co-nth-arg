function nth(n, fn) {
  return function (err) {
    return fn.call(this, err, arguments[n]);
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
exports.first = thunkNthArg.bind(null, 1);
exports.second = thunkNthArg.bind(null, 2);
