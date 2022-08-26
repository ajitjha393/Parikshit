import fs from 'fs'
import mock from 'jest-mock'
import expect from 'expect'
import { describe, it, run, resetState}  from 'jest-circus'
import vm from 'vm'
import { TestResult } from '../types'

export const runTest = async (testFile: string): Promise<TestResult> => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult: TestResult = {
        success: false,
        testResults: [],
        errorMessage: null
    }

    let testName = ''
    
    try{
        const context = { describe, it, mock, expect }
        vm.createContext(context)
        resetState()
        vm.runInContext(code, context)
        const { testResults } = await run()
        testResult.testResults = testResults
        testResult.success = testResults.every(result => !result.errors.length)
    }catch(error){
        testResult.errorMessage = (testName + ':' +  (error as any).message)
    }

    return testResult
}
