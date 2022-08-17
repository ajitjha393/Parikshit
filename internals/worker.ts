import fs from 'fs'

export const runTest = async (testFile: string) => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    return testFile + '\n ' + code
}