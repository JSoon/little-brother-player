/**
 * @description Player events
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.DOM
 */

const events = (params) => {

  const {
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
    DOM.play.innerHTML = '播放'

  })

  api.on('ended', () => {
    DOM.play.innerHTML = '播放'

  })

  api.on('play', () => {
    DOM.play.innerHTML = '暂停'

  })

  api.on('playing', () => {
    DOM.play.innerHTML = '暂停'

  })

  api.on('error', () => {

  })

  api.on('loadeddata', () => {

  })

  api.on('loadedmetadata', () => {

  })

  api.on('loadstart', () => {

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

  })

  api.on('waiting', () => {

  })

  api.on('encrypted', () => {

  })

  api.on('waitingforkey', () => {

  })

}

export default events