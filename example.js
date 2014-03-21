var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');
var nth = require('./index.js');

var asyncMath = function (list, cb) {
  setTimeout(function () {
    cb(null, Math.max.apply(Math, list), Math.min.apply(Math, list));
  }, 500);
};

var show = function () { console.log(arguments); };

var exists = nth(0, thunkify(fs.exists)); // or nth.zeroth(thunkify(fs.exists)) or nth.thunkify(0, fs.exists);

co(function *() {
  console.log(yield exists('./package.json'));
  console.log(yield exists('non-exists'));
})();

var tam = thunkify(asyncMath);
var ttam = nth(1, tam);

tam([1,4,7])(show);
ttam([3,6,9])(show);

co(function *() {
  console.log(yield tam([1,2,3,4,5]));
  console.log(yield ttam([1,2,3,4,5]));
  console.log(yield nth(1, tam)([1,2,3,4,5]));
  console.log(yield nth(2, tam)([1,2,3,4,5]));
  console.log(yield nth.first(tam)([1,2,3,4,5]));
  console.log(yield nth.second(tam)([1,2,3,4,5]));
})();

var request = require('request');

function sleep(n, cb) {
  return function (cb) {
    setTimeout(cb, n * 1000);
  }
}

get = nth(1, thunkify(request)); // or nth.first(thunkify(request));
getBody = nth(2, thunkify(request)); // or nth.second(thunkify(request));

co(function *() {
  yield sleep(4);
  var res = yield get('http://google.com');
  console.log(res.statusCode);
  console.log(res.headers);
  console.log(res.body.length);

  var bingBody = yield getBody('http://bing.com');
  console.log(bingBody.length);
})();
