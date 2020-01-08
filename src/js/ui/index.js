import debugPanel from '~/js/ui/debug'
import controllerBar from '~/js/controllers/index'

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
  debugPanel(params) && UIEle.appendChild(debugPanel(params))
  UIEle.appendChild(controllerBar(params))
  dom.ui = UIEle

  return UIEle
}