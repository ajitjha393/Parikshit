import chalk from 'chalk'
import HasteMap from 'jest-haste-map'
import { Worker } from 'jest-worker'
import { cpus } from 'os'
import { join, relative } from 'path'
import { TestResult } from './types'


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
        const { success, errorMessage, testResults } = await (worker as any).runTest(testFile) 
        const status = success ? chalk.green.inverse(' PASS ') : chalk.red.inverse(' FAIL ')
        console.log(status + ' ' + chalk.dim(relative(root, testFile)))

        if(!success) {
            hasTestsFailed = true
            if(testResults) {
                (testResults as TestResult["testResults"])
                .filter(result => result.errors.length)
                .forEach(result => console.log(
                    result.testPath.slice(1).join(' >> ') + '\n' + result.errors[0]
                ))
            }else if(errorMessage) {
                console.log(' ' + errorMessage)
            }
        }
    }   

    worker.end()

    if(hasTestsFailed){
        console.log(chalk.red.bold('The test run failed, please fix your failing tests'))
        process.exitCode = 1
    }
})()

