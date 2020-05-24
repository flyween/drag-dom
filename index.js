'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/dragMove.min.js')
} else {
  module.exports = require('./dist/dragMove.js')
}
