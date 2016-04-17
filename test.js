'use strict'

process.argv[2] = 'foo'
require('./')
process.exit()
