//  'npm install jest --save-dev' or 'npm install jest -D' for use 'JEST' tool for testing
//  set the configuration of JEST to 'node' in the 'package.json'

const palindrome = (string) => {
  if (typeof string === 'undefined') return //  return undefined

  return string
    .split('') //  converts into an array
    .reverse() //  turn it around
    .join('') //  put the array back together again
}

const average = array => {
  if (array.length === 0) return 0

  let sum = 0
  array.forEach(num => { sum += num })
  return sum / array.length
}

module.exports = {
  palindrome,
  average
}
