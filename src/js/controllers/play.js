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

  ctrlEle.onclick = (e) => {
    if (!api.isPlaying()) {
      api.play()
    } else {
      api.pause()
    }
  }

  api.on('pause', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].play

  })

  api.on('ended', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].play

  })

  api.on('play', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].pause

  })

  api.on('playing', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].pause

  })

  return ctrlEle
}