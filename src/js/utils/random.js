/**
 * @description Random integers from [a, b]
 */

const randomInt = (min, max) => {
  if (!max) {
    max = min
    min = 0
  }

  max += 1
  return Math.floor(Math.random() * (max - min)) + min
}

export {
  randomInt
}