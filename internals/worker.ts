import fs from 'fs'
import mock from 'jest-mock'
import expect from 'expect'
import { describe, it, run, resetState}  from 'jest-circus'
import vm from 'vm'
import NodeEnvironment from 'jest-environment-node'
import { join, dirname } from 'path'
import { TestResult } from '../types'


export const runTest = async (testFile: string): Promise<TestResult> => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult: TestResult = {
        success: false,
        testResults: [],
        errorMessage: null
    }

    
    try{
        const customRequire = (fileName: string): any => {
            const code = fs.readFileSync(join(dirname(testFile), fileName), 'utf8')
            
            const module = { exports: {} }
            const moduleFactory =  vm.runInContext(
                `(function(module) { ${code} })` 
                , environment.getVmContext()!
                )
            
            moduleFactory(module)
            return module.exports    
        }
 
        const _context = { describe, it, mock, expect, require: customRequire }
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
        testResult.errorMessage = (error as any).message
    }

    return testResult
}
