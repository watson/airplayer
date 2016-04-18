#!/usr/bin/env node
'use strict'

var util = require('util')
var fs = require('fs')
var http = require('http')
var mime = require('mime')
var bonjour = require('bonjour')()
var rangeParser = require('range-parser')
var ip = require('internal-ip').v4()
var AirPlay = require('airplay-protocol')

var filename = process.argv.slice(2).pop()

if (!filename) {
  console.error('Usage: airplayer filename')
  process.exit(1)
}

var contentType = mime.lookup(filename)

var browser = bonjour.find({ type: 'airplay' }, function (tv) {
  browser.stop()

  server.listen(function () {
    var port = server.address().port

    var airplay = AirPlay(tv.host, tv.port)

    airplay.play('http://' + ip + ':' + port + '/stream.m4v', function (err, res, body) {
      if (err) throw err
    })
  })
})

var server = http.createServer(function (req, res) {
  var stat = fs.statSync(filename)
  var size = stat.size
  var range = req.headers.range
  range = range && rangeParser(size, range)[0]

  res.writeHead(206, {
    'Access-Control-Allow-Origin': '*',
    'Accept-Ranges': 'bytes',
    'Content-Length': (range.end - range.start + 1),
    'Content-Type': contentType,
    'Content-Range': util.format('bytes %d-%d/%d', range.start, range.end, size)
  })

  fs.createReadStream(filename, range).pipe(res)
})
