const path = require('path')

const rootPath = path.resolve(__dirname, '../') // 根目录
const srcPath = path.resolve(rootPath, 'src') // src
const distPath = path.resolve(rootPath, 'dist') // dist
const publicPath = '/' // 公网基础路径

module.exports = {
  rootPath,
  srcPath,
  distPath,
  publicPath
}