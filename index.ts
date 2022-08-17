import HasteMap from 'jest-haste-map'
import { cpus } from 'os'
import fs from 'fs'

const root = __dirname

const hasteMap = HasteMap.create({
    rootDir: root,
    roots: [root],
    maxWorkers: cpus.length,
    platforms: [],
    extensions: ['js'],
    name: 'parikshit-test-framework',
    retainAllFiles: false
});


(async() => {
    const { hasteFS } = await hasteMap.build()
    const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"], root)

    for await(const testFile of testFiles) {
        const code = await fs.promises.readFile(testFile, 'utf-8')
        console.log(code)
    }
})()

