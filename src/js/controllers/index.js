import playBtn from './play'
import progressbar from './progressbar'
import fullscreen from './fullscreen'
import pip from './pip'
import volume from './volume'
import playtime from './playtime'

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
  dom.ctrlbar = controllerBar
  controllerBar.classList.add(Enums.className.ctrlBar)

  const controllers = document.createElement('div')
  const controllersLeft = document.createElement('div')
  const controllersRight = document.createElement('div')
  dom.ctrls = controllers
  dom.ctrls.left = controllersLeft
  dom.ctrls.right = controllersRight
  controllers.classList.add(Enums.className.ctrls)
  controllersLeft.classList.add(Enums.className.ctrlsLeft)
  controllersRight.classList.add(Enums.className.ctrlsRight)
  controllers.appendChild(controllersLeft)
  controllers.appendChild(controllersRight)

  controllerBar.appendChild(controllers)

  progressbar(params)
  playBtn(params)
  volume(params)
  playtime(params)
  pip(params)
  fullscreen(params)

  return controllerBar
}