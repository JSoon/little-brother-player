import debugPanel from '~/js/ui/debug'
import controllerBar from '~/js/controllers/controllers'

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
  UIEle.classList.add(ENUMS.className.ui)
  if (settings.debug) {
    UIEle.appendChild(debugPanel(params))
  }
  UIEle.appendChild(controllerBar(params))
  dom.ui = UIEle

  return UIEle
}