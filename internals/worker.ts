import fs from 'fs'
import Expect from 'expect'
import * as TestRunner from 'jest-circus'
import { TestResult } from '../types'

const mock = require('jest-mock')
const expect = Expect
const { describe, it, run} = TestRunner


export const runTest = async (testFile: string): Promise<TestResult> => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult: TestResult = {
        success: false,
        testResults: [],
        errorMessage: null
    }

    let testName = ''
    
    try{
        eval(code)
        const { testResults } = await run()
        testResult.testResults = testResults
        testResult.success = testResults.every(result => !result.errors.length)
    }catch(error){
        testResult.errorMessage = (testName + ':' +  (error as any).message)
    }

    return testResult
}

// Just to materialize Imports being used
const materializeImport = () => {
    void expect
    void mock
    void describe
    void it
    void run
} 