import fscreen from 'fscreen'

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

  ctrlEle.addEventListener('click', e => {
    api.toggleFullscreen(dom.wrapper, e)
  })

  return ctrlEle
}