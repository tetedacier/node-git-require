/**
 * A method which concat each item of a given array with an optional separator
 * @param {Array} array - the array containing the item to be concatenated as string
 * @param {string} [separator=''] - the provided separator or an empty string
 * @returns {string} the concatenation of all the items of the given array

 */
function arrayStringify (array, separator = '') {
    let returnedString = '';
    for (let item of array) {
        returnedString += String(item) + String(separator)
    }
    return returnedString
}

module.exports = arrayStringify
