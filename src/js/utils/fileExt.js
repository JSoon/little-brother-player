/**
 * @description Extract file extension name from a string
 */

export default (string) => {
  
  if (!string) {
    return null
  }

  const extPattern = /\.(\w+)(?:[\?#]|$)/i
  const extName = string.match(extPattern)

  return extName ? extName[1] : null

}
