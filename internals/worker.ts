import fs from 'fs'
import _expect from 'expect'
const mock = require('jest-mock')


type Nullable<T> = T | null

type TestResult = {
    success: boolean,
    errorMessage: Nullable<string> 
}

type Runner = {
    name: string,
    fn: () => void
}

type RunnerTuple = [Runner['name'], Runner['fn']]

const expect = _expect

const materializeImport = () => {
    void expect
    void mock
} 

export const runTest = async (testFile: string): Promise<TestResult> => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult: TestResult = {
        success: false,
        errorMessage: null
    }

    let testName = ''
    
    try{
        const describeFns: RunnerTuple[] = []
        let currentDescribeFn: RunnerTuple[] = []

        const describe = (name: Runner['name'], fn: Runner['fn']) => {
            describeFns.push([name, fn])
        }
        const it = (name: Runner['name'], fn: Runner['fn']) => {
            currentDescribeFn.push([name, fn])
        }

        eval(code)

        for(const [name, fn] of describeFns) {
            currentDescribeFn = []
            testName = name
            fn()

            for(const [itName, itFn] of currentDescribeFn){
                testName += ' ' + itName  
                itFn()
            }
        }

        testResult.success = true
    }catch(error){
        testResult.errorMessage = (testName + ':' +  (error as any).message)
    }

    return testResult
}