/**
 * @description Player events
 * Documents: 
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
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

  })

  api.on('ended', () => {

  })

  api.on('play', () => {

  })

  api.on('playing', () => {

  })

  api.on('error', () => {

  })

  api.on('loadeddata', () => {


  })

  // https://html.spec.whatwg.org/multipage/media.html#event-media-loadedmetadata
  api.on('loadedmetadata', () => {
    Utils.debug.log(`duration: ${DOM.video.duration}s`)
    Utils.debug.log(`intrinsic dimensions: ${DOM.video.videoWidth} x ${DOM.video.videoHeight}`)

  })

  api.on('loadstart', () => {
    Utils.debug.log(`media: ${DOM.video.currentSrc}`)

  })

  api.on('progress', () => {
    // if (DOM.video.buffered.length) {
    //   Utils.debug.log(`buffered length: ${DOM.video.buffered.length}`)
    //   Utils.debug.log(`buffered start: ${DOM.video.buffered.start(0)}`)
    //   Utils.debug.log(`buffered end: ${DOM.video.buffered.end(0)}`)
      
    // }


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
    // Utils.debug.log(`current: ${DOM.video.currentTime}`)
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