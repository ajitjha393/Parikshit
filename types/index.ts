import { run } from 'jest-circus'

type GetPromiseResolvedType<T> = T extends Promise<infer K> ? K : never

type Nullable<T> = T | null

export type TestResult = {
    success: boolean,
    testResults: Awaited<ReturnType<typeof run>>["testResults"],
    errorMessage: Nullable<string> 
}

export type Runner = {
    name: string,
    fn: () => void
}

export type RunnerTuple = [Runner['name'], Runner['fn']]

