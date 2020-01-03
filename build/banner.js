const pkg = require('../package.json')

const banner = [
  `@description  ${pkg.name} - ${pkg.description}`,
  `@version      ${pkg.version}`,
  `@release      ${new Date()}`,
  `@author       ${pkg.author.name}`,
  `@email        ${pkg.author.email}`
].join('\n')

module.exports = banner