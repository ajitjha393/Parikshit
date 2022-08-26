import fs from 'fs'
import mock from 'jest-mock'
import expect from 'expect'
import { describe, it, run, resetState}  from 'jest-circus'
import vm from 'vm'
import NodeEnvironment from 'jest-environment-node'
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
        const _context = { describe, it, mock, expect }
        const environment = new NodeEnvironment({
            // @ts-ignore
            projectConfig: { 
                testEnvironmentOptions: _context
            }
        }, _context)

        resetState()
        vm.runInContext(code, environment.getVmContext()!)

        const { testResults } = await run()
        testResult.testResults = testResults
        testResult.success = testResults.every(result => !result.errors.length)
    }catch(error){
        testResult.errorMessage = (testName + ':' +  (error as any).message)
    }

    return testResult
}
