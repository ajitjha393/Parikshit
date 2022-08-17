import fs from 'fs'

type Nullable<T> = T | null

type TestResult = {
    success: boolean,
    errorMessage: Nullable<string> 
}

export const runTest = async (testFile: string): Promise<TestResult> => {
    const code = await fs.promises.readFile(testFile, 'utf-8')
    const testResult = {
        success: true,
        errorMessage: null
    }

    try{
        eval(code);
        testResult.success = true
    }catch(error){
        testResult.errorMessage = null
    }

    return testResult
}