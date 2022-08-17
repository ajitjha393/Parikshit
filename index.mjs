import glob from 'glob'

const testFiles = glob.sync('**/*.test.js')

console.log(testFiles) // ['tests/01.test.js', 'tests/02.test.js', …]WWW
