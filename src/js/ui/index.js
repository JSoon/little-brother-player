import controllerBar from '~/js/controllers/index'
import debugPanel from './debug'
import contextMenu from './contextMenu'

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
  contextMenu(params)

  controllerBar(params)

  return UIEle
}