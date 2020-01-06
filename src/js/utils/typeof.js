/**
 * @description Detect type of data precisely
 */
export default (data) => {
  let type = Object.prototype.toString.call(data)
  return type.replace(/\[object (.*)\]/, '$1').toLocaleLowerCase()
}
