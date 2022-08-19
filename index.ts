import chalk from 'chalk'
import HasteMap from 'jest-haste-map'
import { Worker } from 'jest-worker'
import { cpus } from 'os'
import { join, relative } from 'path'


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
    const testFiles = hasteFS.matchFilesWithGlob([
        process.argv[2] ? `**/${process.argv[2]}*`: "**/*.test.js"], root)

    const worker = new Worker(join(root,'internals','worker.js'), {
        enableWorkerThreads: true
    })

    let hasTestsFailed = false
    
    for await(const testFile of testFiles) {
        const { success, errorMessage } = await (worker as any).runTest(testFile) 
        const status = success ? chalk.green.inverse(' PASS ') : chalk.red.inverse(' FAIL ')
        console.log(status + ' ' + chalk.dim(relative(root, testFile)))

        if(!success) {
            hasTestsFailed = true
            console.log('  ' + errorMessage)
        }
    }   

    worker.end()

    if(hasTestsFailed){
        console.log(chalk.red.bold('The test run failed, please fix your failing tests'))
        process.exitCode = 1
    }
})()

