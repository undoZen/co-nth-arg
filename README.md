co-nth-arg
==========

If the thunk you yielded in a [Co](https://github.com/visionmedia/co) wrapped generator function call the callback with more than 2 arguments, it will be returned as an array by Co. For example, below is an example from [co/examples/requests.js](https://github.com/visionmedia/co/blob/master/examples/requests.js):

    co(function *(){
      for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var res = yield get(url);
        console.log('%s -> %s', url, res[0].statusCode);
      }
    })()

since request's callback will be called with 3 arguments: `function (error, response, body)`.

It's annoying that every time you deal with that kind of thunk you write code like

    var _res = yield get(url);
    var res = _res[0];

or:

    var res = (yield get(url))[0];

So I write this module. If you are sure that you always only need one of the arguments, you can use co-nth-arg to wrap your thunkified function:

    var co = require('co');
    var nth = require('co-nth-arg');
    var request = require('request');
    
    get = nth(1, thunkify(request)); // or nth.first(thunkify(request));
    getBody = nth(2, thunkify(request)); // or nth.second(thunkify(request));

    co(function *() {
      var res = yield get('http://google.com');
      console.log(res.statusCode);
      console.log(res.headers);
      console.log(res.body.length);

      var bingBody = yield getBody('http://bing.com');
      console.log(bingBody.length);
    })();
