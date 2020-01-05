/**
 * @description Player events
 * Documents: 
 * https://html.spec.whatwg.org/multipage/media.html#mediaevents
 * 
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.DOM
 */

const events = (params) => {

  const {
    settings,
    api,
    DOM
  } = params

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
    DOM.play.innerHTML = ENUMS.i18n[settings.i18n].play

  })

  api.on('ended', () => {
    DOM.play.innerHTML = ENUMS.i18n[settings.i18n].play

  })

  api.on('play', () => {
    DOM.play.innerHTML = ENUMS.i18n[settings.i18n].pause

  })

  api.on('playing', () => {
    DOM.play.innerHTML = ENUMS.i18n[settings.i18n].pause

  })

  api.on('error', () => {

  })

  api.on('loadeddata', () => {


  })

  // https://html.spec.whatwg.org/multipage/media.html#event-media-loadedmetadata
  api.on('loadedmetadata', () => {
    DEBUG.log(`duration: ${DOM.video.duration}s`)
    DEBUG.log(`intrinsic dimensions: ${DOM.video.videoWidth} x ${DOM.video.videoHeight}`)

  })

  api.on('loadstart', () => {
    DEBUG.log(`media: ${DOM.video.currentSrc}`)

  })

  api.on('progress', () => {
    if (DOM.video.buffered.length) {
      DEBUG.log(`buffered length: ${DOM.video.buffered.length}`)
      DEBUG.log(`buffered start: ${DOM.video.buffered.start(0)}`)
      DEBUG.log(`buffered end: ${DOM.video.buffered.end(0)}`)
    }


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
    DEBUG.log(`current: ${DOM.video.currentTime}`)
  })

  api.on('volumechange', () => {

  })

  api.on('waiting', () => {

  })

  api.on('encrypted', () => {

  })

  api.on('waitingforkey', () => {

  })

}

export default events