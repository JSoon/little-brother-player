/**
 * @description Picture in Picture
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const video = dom.video

  if (
    // Chrome
    !document.pictureInPictureEnabled &&
    // Safari
    !(video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === 'function')
    // Firefox
  ) {
    return
  }

  const ctrlEle = document.createElement('div')
  dom.pip = ctrlEle
  dom.ctrls.right.appendChild(ctrlEle)

  ctrlEle.innerHTML = Enums.i18n[settings.i18n].pip
  ctrlEle.classList.add(Enums.className.pip)

  ctrlEle.addEventListener('click', async function (e) {
    api.togglePiP()
  })

  const tooltip = Coms.tooltip({
    selector: ctrlEle,
    title: Enums.i18n[settings.i18n].pipEnterTitle,
    container: dom.wrapper
  })

  api.on('enterpip', _ => {
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].pipExitTitle)
  })

  api.on('exitpip', _ => {
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].pipEnterTitle)
  })

  return ctrlEle
}