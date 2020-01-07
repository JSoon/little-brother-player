/**
 * @description Debug panel
 * @param {object}  params
 * @param {object}  params.settings   initial settings
 * @param {object}  params.api  
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const debugPanel = document.createElement('div')
  debugPanel.classList.add(Enums.className.debugPanel)
  dom.debug = debugPanel

  return debugPanel
}