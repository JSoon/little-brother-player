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
  dom.ui.appendChild(debugPanel)

  debugPanel.classList.add(Enums.className.debugPanel)

  api.on('timeupdate', () => {

    let bufferedInfo = ''
    if (api.getBuffered().length) {
      for (let i = 0; i < api.getBuffered().length; i++) {
        bufferedInfo += `<p>buffered ${i}: ${api.getBuffered().start(i)} ~ ${api.getBuffered().end(i)}s</p>`
      }
    }

    let hlsInfo = ''
    if (settings.live && api.hls) {
      hlsInfo = `
        <p>----------------- HLS info bellow -----------------</p>
        <p>number of bitrate: ${api.hls.getLevels().length}</p>
        <p>current quality: ${api.hls.getCurrentLevel() !== -1 ? api.hls.getCurrentLevelInfo().height + 'p' : 'Auto' }</p>
        <p>current bandwidth: ${Math.round(api.hls.getBandwidthEstimate()/8/1024)}KB/s</p>
        <p>---------------------------------------------------</p>
      `
    }

    let info = `
      <p>uri: ${api.getCurrentSrc()}</p>
      <p>type: ${api.getSrcType()}</p>
      <p>currentTime: ${api.getCurrentTime()}s</p>
      <p>duration: ${api.getDuration()}s</p>
      <p>volume: ${api.getVolume()}</p>
      <p>playbackRate: ${api.getPlaybackRate()}</p>
      <p>intrinsic dimensions: ${api.getVideoWidth()} x ${api.getVideoHeight()}</p>
      <p>buffered length: ${api.getBuffered().length}</p>
      ${bufferedInfo}
      ${hlsInfo}
    `
    dom.debug.innerHTML = info

  })

  return debugPanel
}