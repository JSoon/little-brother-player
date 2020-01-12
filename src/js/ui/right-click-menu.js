/**
 * @description Right click menu
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const rightClickMenu = document.createElement('div')
  dom.rightClickMenu = rightClickMenu
  dom.ui.appendChild(rightClickMenu)

  rightClickMenu.classList.add(Enums.className.rightClickMenu)

  return rightClickMenu
}