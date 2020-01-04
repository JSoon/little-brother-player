const path = require('path')

const rootPath = path.resolve(__dirname, '../') // 根目录
const srcPath = path.resolve(rootPath, 'src') // src
const publicPath = path.resolve(rootPath, 'public') // 发布目录

module.exports = {
  rootPath,
  srcPath,
  publicPath
}