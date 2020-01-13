/**
 * @description Play & pause button
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const ctrlEle = document.createElement('div')
  dom.play = ctrlEle
  dom.ctrls.left.appendChild(ctrlEle)

  ctrlEle.classList.add(Enums.className.play)
  ctrlEle.innerHTML = Enums.i18n[settings.i18n].play

  ctrlEle.onclick = e => {
    api.togglePlay()
  }

  const tooltip = Coms.tooltip({
    selector: ctrlEle,
    title: api.isPlaying() ? Enums.i18n[settings.i18n].pauseTitle : Enums.i18n[settings.i18n].playTitle,
    container: dom.wrapper
  })

  api.on('play', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].pause
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].pauseTitle)
  })

  api.on('pause', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].play
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].playTitle)
  })

  return ctrlEle
}