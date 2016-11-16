var test = require('tape')
var chord = require('..')
var DATA = require('../chords.json')

test('chord: chord data integrity', function (t) {
  chord.names(true).forEach(function (name) {
    if (!Array.isArray(DATA[name])) return
    var data = chord.build(name, false)
    var filtered = data.filter(function (x) { return x })
    t.equal(data.length, filtered.length, 'Chord data: ' + name)
  })
  t.end()
})

test('chord: parse', function (t) {
  t.deepEqual(chord.parse('Cmaj7'), ['maj7', 'C'])
  t.deepEqual(chord.parse('C7'), ['7', 'C'])
  t.deepEqual(chord.parse('maj7'), ['maj7', null])
  t.deepEqual(chord.parse('C#4 m7b5'), [ 'm7b5', 'C#4' ])
  t.deepEqual(chord.parse('C#4m7b5'), [ 'm7b5', 'C#4' ])
  // TODO: fix this
  t.deepEqual(chord.parse('C7b5'), ['b5', 'C7'])
  t.end()
})

test('chord: build', function (t) {
  t.deepEqual(chord.build('7', 'C'), [ 'C', 'E', 'G', 'Bb' ])
  t.deepEqual(chord.build('maj7', 'A4'), ['A4', 'C#5', 'E5', 'G#5'])
  t.deepEqual(chord.build('1P 3M 5P', 'A4'), ['A4', 'C#5', 'E5'])
  t.deepEqual(chord.build('maj7', false), [ '1P', '3M', '5P', '7M' ])
  t.deepEqual(chord.build('P1 M3 P5 M7', false), [ '1P', '3M', '5P', '7M' ])
  t.deepEqual(chord.build('maj7', 'C'), chord.build('maj7')('C'))
  t.end()
})

test('creates an chord from names', function (t) {
  t.deepEqual(chord.get('Cmaj7'), [ 'C', 'E', 'G', 'B' ])
  t.deepEqual(chord.get('C7'), [ 'C', 'E', 'G', 'Bb' ])
  t.deepEqual(chord.get('C64'), ['G', 'C', 'E'])
  t.end()
})
test('has names', function (t) {
  test(chord.names().length > 0)
  test(chord.names(true).length > chord.names().length)
  t.end()
})