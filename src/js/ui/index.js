import controllerBar from '~/js/controllers/index'
import debugPanel from './debug'
import rightClickMenu from './right-click-menu'

/**
 * @description Player UI
 * @param {object}  params
 */
export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const UIEle = document.createElement('div')
  UIEle.classList.add(Enums.className.ui)
  dom.ui = UIEle

  debugPanel(params)
  rightClickMenu(params)

  controllerBar(params)

  return UIEle
}