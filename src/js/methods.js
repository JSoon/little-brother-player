/**
 * @description Player methods
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.dom
 */

const methods = (params) => {

  const {
    settings,
    api,
    dom
  } = params

  const video = dom.video

  api.seek = seek

  function seek(sec) {
    video.currentTime = sec
  }

  /**
   * @description Begin playback of the media
   * @returns {object}  A promise
   * 
   * Note: Older browsers may not return a value from play()
   */
  api.play = play

  function play() {
    return video.play()
  }

  /**
   * @description Load media but not to begin playing.
   * Generally only useful when you've made dynamic changes to the set of sources available for the media element,
   * either by changing the element's src attribute or by adding or removing <source> elements nested within the media element itself.
   * load() will reset the element and rescan the available sources, thereby causing the changes to take effect.
   * 
   * @param {object}  params  Same as settings
   */
  api.load = load

  function load(params) {
    video.innerHTML = ''

    if (Utils.typeof(params.media) === 'string') {
      const mediaSrc = params.media
      // You have to pass params.type if params.media is a url
      if (!params.type) {
        throw 'No media type!'
      }
      params.media = [{
        src: mediaSrc,
        type: params.type
      }]
    }

    media.forEach(medium => {
      const srcEle = document.createElement('source')
      srcEle.src = medium.src
      srcEle.type = Enums.MIME[medium.type]

      if (!canPlayType(srcEle.type)) {
        throw 'Invalid media type!'
      }

      video.appendChild(srcEle)
    })
    video.appendChild(document.createTextNode(`Sorry, your browser doesn't support embedded videos.`))
  }

  api.pause = pause

  function pause() {
    video.pause()
  }

  api.on = on

  function on(eventName, func) {

    video.addEventListener(eventName, e => {
      Utils.debug.log(`Event triggered: ${eventName}`)

      func(e)
    })

    if (eventName === 'encrypted') {
      Utils.debug.log(`Event triggered: ${eventName}`)
      video.onencrypted = func
    }

    if (eventName === 'waitingforkey') {
      Utils.debug.log(`Event triggered: ${eventName}`)
      video.onwaitingforkey = func
    }

  }

  //#region Getters

  api.canPlayType = canPlayType

  function canPlayType(MIME) {
    // probably, maybe
    if (video.canPlayType(MIME)) {
      return true
    }
    // empty string
    return false
  }

  api.getDuration = getDuration

  function getDuration() {
    return Math.round(video.duration)
  }

  api.getCurrentTime = getCurrentTime

  function getCurrentTime() {
    return Math.round(video.currentTime)
  }

  api.getVolume = getVolume

  function getVolume() {
    return video.volume
  }

  api.getBuffered = getBuffered

  function getBuffered() {
    return video.buffered
  }

  api.getVideoWidth = getVideoWidth

  function getVideoWidth() {
    return video.videoWidth
  }

  api.getVideoHeight = getVideoHeight

  function getVideoHeight() {
    return video.videoHeight
  }

  api.getCurrentSrc = getCurrentSrc

  function getCurrentSrc() {
    return video.currentSrc
  }

  api.isPlaying = isPlaying

  function isPlaying() {
    return !video.paused && !video.ended
  }

  api.isPaused = isPaused

  function isPaused() {
    return video.paused
  }

  api.isEnded = isEnded

  function isEnded() {
    return video.ended
  }

  api.isMuted = isMuted

  function isMuted() {
    return video.volume === 0 ? true : false
  }

  //#endregion

  //#region Setters

  api.setCurrentTime = setCurrentTime

  function setCurrentTime(val) {
    video.currentTime = val
  }

  api.setVolume = setVolume

  function setVolume(val) {
    video.volume = parseFloat(val)
  }

  //#endregion

  return api

}


export default methods