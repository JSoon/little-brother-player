/**
 * @description Get relative coordinates of cursor within an element
 */

export default (ele, mouseEvent) => {
  const bounds = ele.getBoundingClientRect()
  const x = mouseEvent.clientX - bounds.left
  const y = mouseEvent.clientY - bounds.top
  return Object.assign(bounds, {
    x: x,
    y: y
  })
}