/**
 * @description Player events
 * Documents: 
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 * https://html.spec.whatwg.org/multipage/media.html#mediaevents
 * 
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.dom
 */

const events = (params) => {

  const {
    settings,
    api,
    dom
  } = params

  const video = dom.video

  api.on('abort', () => {

  })

  api.on('canplay', () => {

  })

  api.on('canplaythrough', () => {

  })

  api.on('durationchange', () => {

  })

  api.on('emptied', () => {

  })

  api.on('pause', () => {
    dom.wrapper.classList.add(Enums.className.playingPaused)
  })

  api.on('ended', () => {

  })

  api.on('play', () => {
    dom.wrapper.classList.remove(Enums.className.playingPaused)

    if (settings.live) {
      dom.wrapper.classList.add(Enums.className.playingStream)
    } else {
      dom.wrapper.classList.add(Enums.className.playingVideo)
    }
  })

  api.on('playing', () => {
    dom.wrapper.classList.remove(Enums.className.playingPaused)

  })

  api.on('error', () => {
    dom.wrapper.classList.add(Enums.className.playingError)

  })

  api.on('loadeddata', () => {


  })

  // https://html.spec.whatwg.org/multipage/media.html#event-media-loadedmetadata
  api.on('loadedmetadata', () => {
    Utils.debug.log(`duration: ${api.getDuration()}s`)
    Utils.debug.log(`intrinsic dimensions: ${api.getVideoWidth()} x ${api.getVideoHeight()}`)

  })

  api.on('loadstart', () => {
    Utils.debug.log(`media: ${api.getCurrentSrc()}`)

  })

  api.on('progress', () => {

  })

  api.on('ratechange', () => {

  })

  api.on('seeked', () => {

  })

  api.on('seeking', () => {

  })

  api.on('stalled', () => {

  })

  api.on('suspend', () => {

  })

  api.on('timeupdate', () => {

  })

  api.on('volumechange', () => {
    Utils.debug.log(`volume: ${api.getVolume()}`)
  })

  api.on('waiting', () => {

  })

  api.on('encrypted', () => {

  })

  api.on('waitingforkey', () => {

  })

  api.on('enterfullscreen', () => {

  })

  api.on('exitfullscreen', () => {

  })

  api.on('enterpip', () => {

  })

  api.on('exitpip', () => {

  })


  return params

}

export default events