import playBtn from './play'
import progressbar from './progressbar'

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
  dom.ctrl = controllerBar
  
  controllerBar.classList.add(Enums.className.ctrlBar)

  controllerBar.appendChild(playBtn(params))
  controllerBar.appendChild(progressbar(params))

  return controllerBar
}