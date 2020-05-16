const tap = require('tap')

const gitFs = require('./gitFs')
const commitHash = 'c880d9c6ff751b57ddde30293fb3113f4489ec46'

tap.test('gitFs should failed to resolve a folder', async(t) => {
    try {
        await gitFs('__fixtures__/', 'HEAD')
    }
    catch (error){
        t.equal(
            error.constructor.name,
            'Error'
        )
        t.equal(
            error.message,
            `Error: ${gitFs.folderNotSupported('__fixtures__/', 'HEAD')}`
        )
        t.end()
    }
})

tap.test('gitFs should failed to resolve a folder', async(t) => {
    try {
        await gitFs('__fixtures__', 'HEAD')
    }
    catch (error){
        t.equal(
            error.constructor.name,
            'Error'
        )
        t.equal(
            error.message,
            `Error: ${gitFs.currentObjectTypeIsNotSupported('tree', '__fixtures__')}`
        )
        t.end()
    }
})

const basePath = '__fixtures__/status';
tap.test('gitFs should failed to resolve a non existing file', async (t) => {
    try {
        await gitFs(`${basePath}.js`, commitHash)
    }
    catch (error){
        t.equal(
            error.constructor.name,
            'Error'
        )
        t.equal(
            error.message,
            `Error: ${gitFs.noPathAtCurrentVersion(`${basePath}.js`, commitHash)}`
        )
        t.end()
    }
})
