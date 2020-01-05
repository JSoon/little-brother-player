/**
 * @description Player methods
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.DOM
 */

const methods = (params) => {

  const {
    api,
    DOM
  } = params

  api.canPlayType = canPlayType

  function canPlayType(MIME) {
    // probably, maybe
    if (DOM.video.canPlayType(MIME)) {
      return true
    }
    // empty string
    return false
  }

  api.seek = seek

  function seek(sec) {
    DOM.video.currentTime = sec
  }

  /**
   * @description Begin playback of the media
   * @returns {object}  A promise
   * 
   * Note: Older browsers may not return a value from play()
   */
  api.play = play

  function play() {
    return DOM.video.play()
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
    DOM.video.innerHTML = ''

    if (TYPEOF.default(params.media) === 'string') {
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
      srcEle.type = ENUMS.MIME[medium.type]

      if (!canPlayType(srcEle.type)) {
        throw 'Invalid media type!'
      }

      DOM.video.appendChild(srcEle)
    })
    DOM.video.appendChild(document.createTextNode(`Sorry, your browser doesn't support embedded DOM.videos.`))
  }

  api.pause = pause

  function pause() {
    DOM.video.pause()
  }

  api.getCurrentTime = getCurrentTime

  function getCurrentTime() {
    return DOM.video.currentTime
  }

  api.isPlaying = isPlaying

  function isPlaying() {
    return !DOM.video.paused && !DOM.video.ended
  }

  api.isPaused = isPaused

  function isPaused() {
    return DOM.video.paused
  }

  api.isEnded = isEnded

  function isEnded() {
    return DOM.video.ended
  }

  api.isMuted = isMuted

  function isMuted() {
    return DOM.video.ended
  }

  api.on = on

  function on(eventName, func) {

    DOM.video.addEventListener(eventName, () => {
      DEBUG.log(`Event triggered: ${eventName}`)
      func()
    })

    if (eventName === 'encrypted') {
      DEBUG.log(`Event triggered: ${eventName}`)
      DOM.video.onencrypted = func
    }

    if (eventName === 'waitingforkey') {
      DEBUG.log(`Event triggered: ${eventName}`)
      DOM.video.onwaitingforkey = func
    }

  }


  return api

}


export default methods