/**
 * @description Require all files in a directory, then export as a whole object
 */

const context = require.context('./dom', false, /\.js$/)

context.keys().forEach(key => {
  context(key)
})