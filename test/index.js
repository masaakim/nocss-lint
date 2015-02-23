var fs = require('fs')
var nocssLint = require('../')
var postcss = require('postcss')
var test = require('tape')

function fixture (name) {
   return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

function expect (name) {
   return fs.readFileSync('test/fixtures/' + name + '.out.css', 'utf-8').trim()
}

test('test-1', function (t) {
    var res = function () {
        return postcss().use(nocssLint()).process(fixture('test-1')).css.trim()
    }
    t.throws(res, /NoCSS: cannot overwrite any rule sets/)
    t.end()
})

test('test-2', function (t) {
    var res = function () {
        return postcss().use(nocssLint()).process(fixture('test-2')).css.trim()
    }
    t.throws(res, /NoCSS: can use only class selectors and cannot nest selectors/)
    t.end()
})

test('test-3', function (t) {
    var res = function () {
        return postcss().use(nocssLint()).process(fixture('test-3')).css.trim()
    }
    t.throws(res, /NoCSS: can use only class selectors and cannot nest selectors/)
    t.end()
})

test('test-4', function (t) {
    var res = function () {
        return postcss().use(nocssLint()).process(fixture('test-4')).css.trim()
    }
    t.throws(res, /NoCSS: using `!important`/)
    t.end()
})

test('test-5', function (t) {
    var actual = postcss().use(nocssLint()).process(fixture('test-5')).css.trim()
    var expected = expect('test-5')
    t.same(actual, expected)
    t.end()
})
