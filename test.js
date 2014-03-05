var ASSERT = require('assert').ok
var exec = require('child_process').exec
var wc = require('./index')
var li = require('lorem-ipsum')
var fs = require('fs')
var rimraf = require('rimraf')

var dummy = __dirname + '/dummy.txt'

function r(u, l) {
  return Math.floor(Math.random() * (u - l + 1)) + l;
}

fs.writeFileSync(dummy, li({
  count: r(50, 5000),
  units: 'paragraphs',
  sentenceLowerBound: 5,
  sentenceUpperBound: 15,
  paragraphLowerBound: 3,
  paragraphUpperBound: 7,
  format: 'plain',
  random: Math.random
}))

var counters = {}

function verify() {

  exec('wc ' + dummy, function (error, stdout, stderr) {
    var output = stdout.split(/\s/).filter(Number)

    ASSERT(output[0], counters.lcount)
    console.log('Line counts match')

    ASSERT(output[1], counters.wcount)
    console.log('The word counts match')

    ASSERT(output[2], counters.ccount)
    console.log('The character counts match')
    rimraf(dummy, function() {
      console.log('Tests pass')
    })
  })
}

fs
  .createReadStream(dummy)
  .pipe(wc(counters))
  .on('end', verify)
