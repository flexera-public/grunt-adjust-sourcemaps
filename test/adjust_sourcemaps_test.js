'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.adjust_sourcemaps = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  json_manipulation: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/json_manipulation/test1.js.map');
    var expected = grunt.file.read('test/expected/json_manipulation.js.map');
    test.equal(actual, expected);

    test.done();
  },
  sourcemap_manipulation: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/sourcemap_manipulation/test2.js.map');
    var expected = grunt.file.read('test/expected/sourcemap_manipulation.js.map');
    test.equal(actual, expected);

    test.done();
  },
};
