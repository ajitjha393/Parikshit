export type Nullable<T> = T | null

export type TestResult = {
    success: boolean,
    errorMessage: Nullable<string> 
}

export type Runner = {
    name: string,
    fn: () => void
}

export type RunnerTuple = [Runner['name'], Runner['fn']]

