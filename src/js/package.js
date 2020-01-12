const pkg = require('@/package.json')
const version = `${pkg.name} v${pkg.version} by ${pkg.author.name} ${pkg.author.email} 小老弟H5播放器冲鸭 ─=≡Σ(((つ•̀ω•́)つ`

Utils.debug.version(` ${version} `)

export default pkg