import playBtn from '~/js/controllers/play'

/**
 * @description Controller bar
 * @param {object}  params
 */
export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const controllerBar = document.createElement('div')
  controllerBar.classList.add(ENUMS.className.ctrlBar)
  controllerBar.appendChild(playBtn(params))
  dom.ctrl = controllerBar


  return controllerBar
}