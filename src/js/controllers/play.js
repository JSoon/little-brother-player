/**
 * @description Play&pause button
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const playBtn = document.createElement('div')
  playBtn.classList.add(ENUMS.className.play)
  playBtn.innerHTML = ENUMS.i18n[settings.i18n].play
  dom.play = playBtn

  playBtn.onclick = (e) => {
    if (!api.isPlaying()) {
      api.play()
    } else {
      api.pause()
    }
  }

  return playBtn
}