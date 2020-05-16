const tap = require('tap')
const expectedOutput = '[object Object]-test-true--lemon'

tap.test('gitModule should require the expected version of the fixture module', async (t) => {
    require('./gitModule')
    const testedModule = await require('../__fixtures__/stringifyArray#c880d9c6ff751b57ddde30293fb3113f4489ec46.git')

    t.equal(
        testedModule([{a:1}, 'test', true, undefined, ['lemon']], '-'),
        expectedOutput
    )

    t.end()
})
