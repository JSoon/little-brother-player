/**
 * @description Require all files in a directory, then export as a whole object
 */

const context = require.context('.', false, /\.js$/)
const obj = {}


context.keys().forEach(key => {
  const apiName = key.match(/\/(.*)\.js$/)
  const module = context(key)

  if (apiName) {
    // Exclude self
    if (apiName[1] !== 'index') {
      obj[apiName[1]] = module.default ? module.default : module
    }
  }
})

console.log('Utils', obj)

export default obj