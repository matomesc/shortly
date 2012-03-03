/**
 * bitly json api wrapper
 * Copyright(c) 2011 Mihai Tomescu <matomesc@gmail.com>
 * MIT Licensed
 */

var request = require('request');
var util = require('util');
var querystring = require('querystring');
var url = require('url');

// missing oauth stuff

var PATHS = [
  'expand',
  'shorten',
  'validate',
  'clicks',
  'referrers',
  'countries',
  'clicks_by_minute',
  'clicks_by_day',
  'bitly_pro_domain',
  'lookup',
  'info'
];

// endpoint template: https://api-ssl.bitly.com/<version>/<method>
var ENDPOINT = 'https://api-ssl.bitly.com/%s/%s';

module.exports = Bitly;

function Bitly(options) {
  this.login = options.login;
  this.key = options.key;
  this.version = options.version || 'v3';
}

PATHS.forEach(function (p) {
  Bitly.prototype[p] = function (params, callback) {
    var defaults = { login: this.login, apiKey: this.key, format: 'json' };
    var query = merge(defaults, params);
    var urlObj = url.parse(util.format(ENDPOINT, this.version, p));
    var reqObj = { url: urlObj, qs: query };

    request(reqObj, function (err, res, body) {
      if (err) {
        return callback(err);
      }
      try {
        body = JSON.parse(body);
      } catch (e) {
        e._body = body;
        return callback(e);
      }
      return callback(null, body);
    });
  };
});

function merge(into) {
  var others = [].slice.call(arguments, 1);
  others.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      into[key] = obj[key];
    });
  });
  return into;
}

if (require.main === module) {
  runTests();
}

function runTests() {
  var bitly = new Bitly({ login: 'matomesc', key: 'R_3288a21e858b9de0544eb086a3a99c07' });
  bitly.expand({
    shortUrl: ['http://bit.ly/g2L1FU', 'http://bit.ly/yerCKs'],
    hash: ['kWFzZ8', 'kvO8vK'] },
    function (err, res) {
      console.log(util.inspect(res, true, 10));
    }
  );
  bitly.clicks({ shortUrl: 'http://bit.ly/yerCKs' }, function (err, res) {
    if (err) console.log(err._body);
    console.log(util.inspect(res, true, 10));
  });
}