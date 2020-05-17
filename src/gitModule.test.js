const tap = require('tap')
const expectedOutput = '[object Object]-test-true--lemon'
const gitFs = require('./gitFs')
const commitHash = 'c880d9c6ff751b57ddde30293fb3113f4489ec46'
tap.test('gitModule should require the expected version of the fixture module', async (t) => {
    require('./gitModule')
    const testedModule = await require(`../__fixtures__/stringifyArray#${commitHash}.git`)

    t.equal(
        testedModule([{a:1}, 'test', true, undefined, ['lemon']], '-'),
        expectedOutput
    )

    t.end()
})

const basePath = '__fixtures__/status';
tap.test('gitModule should failed to require an incorect module', async (t) => {
    const {
        message: {
            incorrectModuleName
        }
    } = require('./gitModule')
    try {
        await require(`../${basePath}#.git`)
    }
    catch (error){
        t.equal(
            error.constructor.name,
            'Error'
        )
        t.equal(
            error.message,
            incorrectModuleName(`../${basePath}#.git`)
        )
        t.end()
    }
})
tap.test('gitModule should failed to require a non resolved file', async (t) => {
    require('./gitModule')
    try {
        await require(`../${basePath}#${commitHash}.git`)
    }
    catch (error){
        t.equal(
            error.constructor.name,
            'Error'
        )
        t.equal(
            error.message,
            gitFs.noPathAtCurrentVersion(`./${basePath}.js`, commitHash)
        )
        t.end()
    }
})
