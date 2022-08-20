﻿import fs from 'fs'
import _expect from 'expect'
const mock = require('jest-mock')


type Nullable<T> = T | null

type TestResult = {
    success: boolean,
    errorMessage: Nullable<string> 
}

const expect = _expect

const materializeImport = () => {
    void expect
    void mock
} 

export const runTest = async (testFile: string): Promise<TestResult> => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: false,
        errorMessage: null
    }

    try{
        eval(code)
        testResult.success = true
    }catch(error){
        testResult.errorMessage = (error as any).message
    }

    return testResult
}