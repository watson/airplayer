# airplayer

A simple command line tool that play local videos on your Apple TV.

This application also serves as an example implementation of the
[airplay-protocol](https://github.com/watson/airplay-protocol) module.

[![Build status](https://travis-ci.org/watson/airplayer.svg?branch=master)](https://travis-ci.org/watson/airplayer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install airplayer --global
```

## Example Usage

Simply install module globally and run the `airplayer` command with the
file you want to play as the first argument.

The `airplayer` command will look for an Apple TV on your local network.
When one is found, it will start playing the chosen video.

```
$ airplayer my-video.m4v
```

Note that the video must be supported by your Apple TV in order for
`airplayer` to play it.

## License

MIT
