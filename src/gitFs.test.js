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
            gitFs.folderNotSupported('__fixtures__/', 'HEAD')
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
            gitFs.currentObjectTypeIsNotSupported('tree', '__fixtures__')
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
            gitFs.noPathAtCurrentVersion(`${basePath}.js`, commitHash)
        )
        t.end()
    }
})

tap.test('gitFs should failed to resolve if given commitHash does not exists', async (t) => {
    const invalidObjectName = '1234567'
    try {
        await gitFs(`__fixtures__/`, invalidObjectName)
    }
    catch (error){
        t.equal(
            error.constructor.name,
            'Error'
        )
        t.equal(
            error.message,
            gitFs.gitLsTreeNotValidObjecNameError(invalidObjectName)
        )
        t.end()
    }
})
