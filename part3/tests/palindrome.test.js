// 'npm run test', in the package.json configure the script with "test": "jest --verbose"

const { palindrome } = require('../utils/for_testing')

test('palindrome of javicu', () => {
  const result = palindrome('javicu')

  expect(result).toBe('ucivaj')
})

test('palindrome os undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})
