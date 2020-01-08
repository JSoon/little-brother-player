/**
 * @description Debug panel
 * @param {object}  params
 * @param {object}  params.settings   initial settings
 * @param {object}  params.api  
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  if (!settings.debug) {
    return
  }

  const video = dom.video

  const debugPanel = document.createElement('div')
  dom.debug = debugPanel

  debugPanel.classList.add(Enums.className.debugPanel)

  video.addEventListener('timeupdate', () => {

    let bufferedInfo = ''
    if (video.buffered.length) {
      for (let i = 0; i < video.buffered.length; i++) {
        bufferedInfo += `<p>buffered ${i}: ${video.buffered.start(i)} ~ ${video.buffered.end(i)}s</p>`
      }
    }

    let info = `
      <p>uri: ${video.currentSrc}</p>
      <p>currentTime: ${video.currentTime}s</p>
      <p>duration: ${video.duration}s</p>
      <p>intrinsic dimensions: ${video.videoWidth} x ${video.videoHeight}</p>
      <p>buffered length: ${video.buffered.length}</p>
      ${bufferedInfo}
    `
    dom.debug.innerHTML = info

  })

  return debugPanel
}