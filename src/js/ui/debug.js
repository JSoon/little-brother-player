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

  const debugPanel = document.createElement('div')
  dom.debug = debugPanel

  debugPanel.classList.add(Enums.className.debugPanel)

  api.on('timeupdate', () => {

    let bufferedInfo = ''
    if (api.getBuffered().length) {
      for (let i = 0; i < api.getBuffered().length; i++) {
        bufferedInfo += `<p>buffered ${i}: ${api.getBuffered().start(i)} ~ ${api.getBuffered().end(i)}s</p>`
      }
    }

    let info = `
      <p>uri: ${api.getCurrentSrc()}</p>
      <p>currentTime: ${api.getCurrentTime()}s</p>
      <p>duration: ${api.getDuration()}s</p>
      <p>volume: ${api.getVolume()}</p>
      <p>intrinsic dimensions: ${api.getVideoWidth()} x ${api.getVideoHeight()}</p>
      <p>buffered length: ${api.getBuffered().length}</p>
      ${bufferedInfo}
    `
    dom.debug.innerHTML = info

  })

  return debugPanel
}