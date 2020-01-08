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
    Utils.debug.log(`duration: ${dom.video.duration}s`)
    Utils.debug.log(`intrinsic dimensions: ${dom.video.videoWidth} x ${dom.video.videoHeight}`)

  })

  api.on('loadstart', () => {
    Utils.debug.log(`media: ${dom.video.currentSrc}`)

  })

  api.on('progress', () => {
    // if (dom.video.buffered.length) {
    //   Utils.debug.log(`buffered length: ${dom.video.buffered.length}`)
    //   Utils.debug.log(`buffered start: ${dom.video.buffered.start(0)}`)
    //   Utils.debug.log(`buffered end: ${dom.video.buffered.end(0)}`)
      
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
    // Utils.debug.log(`current: ${dom.video.currentTime}`)
  })

  api.on('volumechange', () => {

  })

  api.on('waiting', () => {

  })

  api.on('encrypted', () => {

  })

  api.on('waitingforkey', () => {

  })

  return params

}

export default events