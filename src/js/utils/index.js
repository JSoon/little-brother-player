/**
 * @description Require all files in a directory, then export as a whole object
 */

const context = require.context('.', false, /[^index]\.js$/)
const obj = {}


context.keys().forEach(function (key) {
  const apiName = key.match(/\/(.*)\.js$/)
  const module = context(key)
  if (apiName) {
    obj[apiName[1]] = module.default ? module.default : module
  }
})

export default obj