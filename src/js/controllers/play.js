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

  const video = dom.video

  const ctrlEle = document.createElement('div')
  dom.play = ctrlEle

  ctrlEle.classList.add(Enums.className.play)
  ctrlEle.innerHTML = Enums.i18n[settings.i18n].play

  ctrlEle.onclick = (e) => {
    if (!api.isPlaying()) {
      api.play()
    } else {
      api.pause()
    }
  }

  video.addEventListener('pause', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].play

  })

  video.addEventListener('ended', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].play

  })

  video.addEventListener('play', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].pause

  })

  video.addEventListener('playing', () => {
    ctrlEle.innerHTML = Enums.i18n[settings.i18n].pause

  })

  return ctrlEle
}