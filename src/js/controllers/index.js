import playBtn from './play'
import progressbar from './progressbar'
import fullscreen from './fullscreen'
import fullpage from './fullpage'
import pip from './pip'
import volume from './volume'
import playtime from './playtime'
import shortcuts from './shortcuts'
import visibilitychange from './visibilitychange'
import comment from './comment'

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
  dom.ui.appendChild(controllerBar)

  console.log('Controllers:', dom)

  progressbar(params)
  playBtn(params)
  volume(params)
  playtime(params)
  pip(params)
  fullpage(params)
  fullscreen(params)
  shortcuts(params)
  visibilitychange(params)
  comment(params)

  return controllerBar
}