/**
 *
 * @file Provide ability to require git resources as async node dependencies
 */

const path = require('path')

 /**
 *
 * @typedef HashExtractionResult filename
 * @type {object}
 * @property {null|string} result - original string given to the hash extraction method if extraction succeed, null if it failed
 * @property {undefined|string} repositoryPath - repository path without js extension or undefined if extraction failed
 * @property {undefined|string} repositoryVersion - repository version of the path to retrieve or undefined if extraction failed
 */
/**
 *
 * @param {string} filename
 * @returns {HashExtractionResult} result of the hash extraction
 */
function extractHash (filename) {
    const filenameChunk = filename.match(/^(.+)#([^#.]+)\.git$/)
    if (filenameChunk === null) {
        return { result: null }
    }

    const [
        result,
        repositoryPath,
        repositoryVersion
    ] = filenameChunk

    return {
        result,
        repositoryPath,
        repositoryVersion
    }
}
/**
 *
 * @param {string} repositoryPath - path of the git dependency
 * @param {string} repositoryVersion - version of the git dependency
 * @param {string} filename - original path required
 * @return {string} - Promise wrapper of the git dependency to be compiled
 */
const wrapper = (repositoryPath, repositoryVersion, filename, gitFsModulePrefix) =>
`module.exports = new Promise((resolve, reject) => {
    const gitFsRead = require('${gitFsModulePrefix}/gitFs')
    gitFsRead('${repositoryPath}.js', '${repositoryVersion}').then(
        (content) => {
            const Module = require('module')
            function loadResolvedGitDependency(module, filename) {
                module._compile(content, '${filename}-resolved')
            }
            Module._extensions['.git-resolved'] = loadResolvedGitDependency;
            return resolve(require('${filename}-resolved'))
        },
        error => {
            throw new Error(error)
        }
    )
})
`

/**
 * @description Extract path and version from git dependency and
 * @param {string} module
 * @param {string} filename
 * @returns {undefined}
 */
function loadGitHash (module, filename) {
    const {
        result,
        repositoryPath,
        repositoryVersion
    } = extractHash(filename)

    const gitFsModulePrefix = (__dirname === module.parent.path)
        ? `${process.cwd()}/src`
        : 'git-require/src'

    // below make the assumtion your versionned file contains common js code
    // else chaos will ensue
    if (result === null) {
        throw new Error('no content found')
    }
    module._compile(
        wrapper(
            (__dirname === module.parent.path)
                ? path.resolve(__dirname, repositoryPath)
                : repositoryPath,
            repositoryVersion,
            filename,
            gitFsModulePrefix
        ),
        filename
    )
};
const exposeGitFileType = () => {
    const Module = require('module')
    moduleResolveFilename = Module._resolveFilename
    Module._resolveFilename = (request, parent, isMain, options) => {
        if (request.endsWith('.git') || request.endsWith('.git-resolved')) {
            return request
        }
        return moduleResolveFilename(request, parent, isMain, options)
    }
    Module._extensions['.git'] = loadGitHash;
}

module.exports = exposeGitFileType

exposeGitFileType()
