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
