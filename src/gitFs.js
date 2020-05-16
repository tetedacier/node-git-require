/**
 * @file provide git chain used fetch content from the local index files
 */
const { spawn } = require('child_process');

/**
 * @typedef CommitDetailsParameter
 * @type {object}
 * @property {string} filename - path of the git resource to inspect
 * @property {string} version - version of the git resource to inspect
 */

 /**
 * @typedef ExecuterAndNormalizer
 * @type {object}
 * @propery {ChildProcess} command - command to observe
 * @propery {Function(commandOutput):Promise()} extraction - normalization method
 */

/**
 * @param {CommitDetailsParameter} - path and version of the git resource to retrieve
 * @returns {ExecuterAndNormalizer} - a tupple refererencing the command to be observed and its output parser
 */
const gitShowCommitDetails = ({version, fileName}) => Object.assign({
    command: spawn('git', ['ls-tree', version, fileName]),
    extraction : (commandOutput) => new Promise((resolve, reject) => {
        const lines = commandOutput.split('\n').filter(
            line => ! (new RegExp(/^(\s|\n)*$/m)).test(line)
        )
        if (lines.length === 1) {
            const [
                mode,
                type,
                contentHash,
                name
            ] = lines[0].split(/\s+/)
            if(contentHash) {
                return resolve({ contentHash })
            }
            reject(new Error(`Can't find contentHash in given output '${lines[0]}'`))

            reject({
                mode,
                type,
                contentHash,
                name
            })
        }
        if (lines.length === 0) {
            reject(new Error(`No path '${fileName}' at version '${version}' in current git repository`))
        }
        //@TODO: implement index detection on folder and recursive filesystem version extraction
        reject(new Error(`Multiple path in '${fileName}' at version '${version}' in current git repository, folder dependencies are not currently supported`))
    })
})
/**
 * @typedef HashParameter
 * @type {object}
 * @property {string} contentHash - the git index reference to be extracted
 */
/**
 *
 * @param {HashParameter} - an object containing the reference to the content to be extracted
 * @returns {ExecuterAndNormalizer} - a tupple refererencing the command to be observed and its output parser
 */
const gitCatFile = ({contentHash}) => Object.assign({
    command: spawn('git', ['cat-file', 'blob', contentHash]),
    extraction: commandOutput=>commandOutput
})

/**
 * generic method to observe command execution  and normalize its ouput
 * @param {ExecuterAndNormalizer} - Command to observed with it ouput normalizer method
 * @returns {Promise<object,string>} - Promise resolving a normalization of stdout or rejecting the stderr witch *must* be handled by the caller
 */
const chain = ({command, extraction}) => new Promise(function resolveExecution(resolve, reject) {
    let stdout = ''
    let stderr = ''

    command.stdout.on('data', (data) => {
        stdout += data.toString()
    })

    command.stderr.on('data', (data) => {
        stderr += data.toString()
    })

    command.on('close', (code) => {
        if(code === 0) {
            return resolve(extraction(stdout))
        }
        reject(stderr)
    })

    command.on('exit', (code) => {})
})
/**
 *
 * @param {string} fileName - path of the git resource to extract from the indexes
 * @param {string} version - version of the git resource to extract from the indexes
 * @throws if an unique path corresponding the given filename is not found at the given version
 * @returns {Promise<string>}
 */
const extractGitFile = (fileName, version) => chain(
    gitShowCommitDetails({fileName, version})
).then(
    resolution => chain(gitCatFile(resolution)),
    rejection => {
        throw new Error(rejection)
    }
)

module.exports = extractGitFile
