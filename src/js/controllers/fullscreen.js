import fscreen from 'fscreen'

const toggleFullscreen = (ele, e) => {
  if (fscreen.fullscreenElement !== null) {
    fscreen.exitFullscreen()
  } else {
    fscreen.requestFullscreen(ele)
  }
}

const fullscreenchangeHandler = e => {
  if (fscreen.fullscreenElement !== null) {
    Utils.debug.log('Entered fullscreen mode');
  } else {
    Utils.debug.log('Exited fullscreen mode');
  }
}

/**
 * @description Fullscreen
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  if (!fscreen.fullscreenEnabled) {
    throw 'Fullscreen is not support!'
  }

  const ctrlEle = document.createElement('div')
  dom.fullscreen = ctrlEle
  dom.ctrls.right.appendChild(ctrlEle)

  ctrlEle.innerHTML = Enums.i18n[settings.i18n].fullscreen
  ctrlEle.classList.add(Enums.className.fullscreen)

  fscreen.addEventListener('fullscreenchange', fullscreenchangeHandler, false)

  ctrlEle.addEventListener('click', e => {
    toggleFullscreen(dom.wrapper, e)
  })

  return ctrlEle
}