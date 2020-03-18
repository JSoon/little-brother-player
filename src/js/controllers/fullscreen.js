import fscreen from 'fscreen'

/**
 * @description Fullscreen mode
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
    api.toggleFullscreen(e)
  })

  const tooltip = Coms.tooltip({
    selector: ctrlEle,
    title: Enums.i18n[settings.i18n].fullscreenEnterTitle,
    container: dom.wrapper
  })

  api.on('enterfullscreen', _ => {
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].fullscreenExitTitle)
    api.comment.updateArea()   
  })

  api.on('exitfullscreen', _ => {
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].fullscreenEnterTitle)
    api.comment.updateArea()   
  })

  return ctrlEle
}