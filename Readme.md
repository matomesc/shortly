# shorty

```
client for the bit.ly shortener (for now). more coming
```

## example
```javascript
var inspect = require('util').inspect;
var shorty = require('shorty');

//
// bit.ly
//
var bitly = new shorty.Bitly({ login: 'foo', key: 'bar' });

bitly.clicks({ shortUrl: 'http://bit.ly/yerCKs' }, function (err, res) {
  console.log(inspect(res, true, 10));
});

//
// goo.gl
//
```

## install

```
$ npm install shorty
```

## usage

### bitly

basically the supported api methods seen [here](http://http://code.google.com/p/bitly-api/wiki/ApiDocumentation)
are mapped to the bitly object and they all have the following signature:

```
bitly.method(queryParams, callback)
```

where callback is called with ```(err, response)```