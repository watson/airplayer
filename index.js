'use strict'

var EventEmitter = require('events').EventEmitter
var Bonjour = require('bonjour')
var AirPlay = require('airplay-protocol')

module.exports = function () {
  var bonjour = Bonjour()
  var list = new EventEmitter()
  var found = []
  var browser = bonjour.find({ type: 'airplay' }, function (service) {
    if (~found.indexOf(service.fqdn)) return

    var player = new AirPlay(service.host, service.port)
    player.name = service.name

    found.push(service.fqdn)
    list.players.push(player)

    list.emit('update', player)
  })

  list.players = []
  list.update = browser.update.bind(browser)
  list.destroy = function () {
    browser.stop()
    bonjour.destroy()
  }

  return list
}
