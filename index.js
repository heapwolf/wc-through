var txs = require('txs')()

module.exports = function(counters) {

  if (typeof counters != 'object') {
    throw new Error('requires a counter object')
  }

  counters.ccount = 0
  counters.wcount = 0
  counters.lcount = 0

  var s = txs(function(obj) {

    if (obj == null) return s.emit('end')

    var chunk = String(obj)

    chunk.replace(/\n/g, function() {
      ++counters.lcount
    })

    chunk.replace(/[^\s]+/g, function(a) {
      ++counters.wcount
    })

    counters.ccount += chunk.length

    return obj
  })

  return s
}
