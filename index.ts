import HasteMap from 'jest-haste-map'
import { Worker } from 'jest-worker'
import { cpus } from 'os'
import { join } from 'path'


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

    const worker = new Worker(join(root,'internals','worker.js'), {
        enableWorkerThreads: true
    })

    for await(const testFile of testFiles) {
        console.log(await (worker as any).runTest(testFile))
    }

    worker.end()
})()

