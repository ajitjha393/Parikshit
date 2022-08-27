# Parikshit

Parikshit is a simple and scalable JavaScript testing framework written in Typescript. 

It is inspired by the [Jest](https://jestjs.io/) framework and is built on top the Facebook's `Haste module system` 


## Features Supported
- [x] File system search 
- [x] Run multiple tests parallely
- [x] Assertion framework (`expect`, `toBe`, `toThrow`, etc.)
- [x] Mocking functionality
- [x] Run specific test file passed from the CLI
- [x] Basic Test Runner suite (`describe`, `it`)
- [x] Isolated Test environment (using `vm`)
- [x] A module system support for the test files


## Haste Module System 

```ts
class HasteMap extends EventEmitter {}

type HasteMap = { 
    clocks: WatchmanClocks,
    files: {[filepath: string]: FileMetaData},
    map: {[id: string]: ModuleMapItem},
    mocks: {[id: string]: string},
 }

``` 

Parikshit uses the HasteMap implementation, which is inspired by [Node-Haste](https://github.com/facebook/node-haste) and was built with for high-performance in large code repositories with hundreds of thousands of files. This implementation is scalable and provides predictable performance.

It makes use of worker processes for parallelizing the file access operations and metadata extraction.


## Examples: 

1.  **Run a single test file `describe.test.js`**

```ts
const banana = require('./banana.js')
const apple = require('./apple.js')

it('tastes good', () => {
  expect(banana).toBe('good')
})

it('tastes good too', () => {
  expect(apple).toBe('good')
})

describe('Describe test', () => {
  it('this should work', () => {
    expect(1).toBe(1)
  })
})

describe('Second Describe test', () => {
  it(`Test for checking async code`, async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    expect(1).toBe(2)
  })
})


```

- `Output`


![image](https://user-images.githubusercontent.com/42679346/187028464-750b0542-632f-47a3-abe1-37a41914a2ec.png)


2. **Run entire test suite in the current project**

![image](https://user-images.githubusercontent.com/42679346/187028549-97ca0a90-8e51-4689-8739-63fa1ae7a876.png)




