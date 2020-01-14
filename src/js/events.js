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
  const comLoading = Coms.loading(params)

  api.on('abort', () => {

  })

  api.on('canplay', () => {
    comLoading.end()
  })

  api.on('canplaythrough', () => {

  })

  api.on('durationchange', () => {

  })

  api.on('emptied', () => {
    comLoading.end()
  })

  api.on('pause', () => {
    dom.wrapper.classList.add(Enums.className.playingPaused)
  })

  api.on('ended', () => {

  })

  // Fired when the paused property is changed from true to false, as a result of the HTMLMediaElement.play() method,
  // or the autoplay attribute
  api.on('play', () => {
    dom.wrapper.classList.remove(Enums.className.playingPaused)

    if (settings.live) {
      dom.wrapper.classList.add(Enums.className.playingStream)
    } else {
      dom.wrapper.classList.add(Enums.className.playingVideo)
    }
  })

  // Fired when playback is ready to start after having been paused or delayed due to lack of data
  api.on('playing', () => {
    dom.wrapper.classList.remove(Enums.className.playingPaused)
    comLoading.end()
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
    comLoading.start()

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
    comLoading.start()
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