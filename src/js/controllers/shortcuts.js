/**
 * @description Keyboard shortcuts
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  document.addEventListener('keydown', e => {
    if (e.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    // Cancel the default action to avoid it being handled twice
    // e.preventDefault()

    Utils.debug.log(`${e.code} triggered`)

    switch (e.code) {
      case 'Space':
        // Toggle play
        api.togglePlay()
        e.preventDefault()
        break

      case 'KeyF':
        // Toggle fullscreen
        api.toggleFullscreen(dom.wrapper, e)
        break

      case 'KeyM':
        // Toggle mute
        api.toggleMute()
        break

      case 'KeyP':
        // Toggle PiP
        api.togglePiP()
        break

      case 'ArrowLeft':
        // Fast forward
        !settings.live && api.fastForwardBackward(-settings.fastStep || -5)
        break

      case 'ArrowRight':
        // Fast backward
        !settings.live && api.fastForwardBackward(settings.fastStep || 5)
        break

      default:
        break
    }
  })

}