/**
 * @file Dummy test to ensure the latest version is correct
 */

const tap = require('tap')
const expectedOutput = '[object Object]-test-true-undefined-lemon-'

tap.test('stringifyArray correctly export a broken method', (t)=> {
    const testedModule = require('./stringifyArray')
    t.equal(
        testedModule([{a:1}, 'test', true, undefined, ['lemon']], '-'),
        expectedOutput
    )
    t.end()
})
