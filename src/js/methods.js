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

  api.canPlayType = canPlayType

  function canPlayType(MIME) {
    // probably, maybe
    if (dom.video.canPlayType(MIME)) {
      return true
    }
    // empty string
    return false
  }

  api.seek = seek

  function seek(sec) {
    dom.video.currentTime = sec
  }

  /**
   * @description Begin playback of the media
   * @returns {object}  A promise
   * 
   * Note: Older browsers may not return a value from play()
   */
  api.play = play

  function play() {
    return dom.video.play()
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
    dom.video.innerHTML = ''

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

      dom.video.appendChild(srcEle)
    })
    dom.video.appendChild(document.createTextNode(`Sorry, your browser doesn't support embedded dom.videos.`))
  }

  api.pause = pause

  function pause() {
    dom.video.pause()
  }

  api.getDuration = getDuration

  function getDuration() {
    return dom.video.duration
  }

  api.getCurrentTime = getCurrentTime

  function getCurrentTime() {
    return dom.video.currentTime
  }

  api.isPlaying = isPlaying

  function isPlaying() {
    return !dom.video.paused && !dom.video.ended
  }

  api.isPaused = isPaused

  function isPaused() {
    return dom.video.paused
  }

  api.isEnded = isEnded

  function isEnded() {
    return dom.video.ended
  }

  api.isMuted = isMuted

  function isMuted() {
    return dom.video.ended
  }

  api.on = on

  function on(eventName, func) {

    dom.video.addEventListener(eventName, () => {
      Utils.debug.log(`Event triggered: ${eventName}`)

      func()
    })

    if (eventName === 'encrypted') {
      Utils.debug.log(`Event triggered: ${eventName}`)
      dom.video.onencrypted = func
    }

    if (eventName === 'waitingforkey') {
      Utils.debug.log(`Event triggered: ${eventName}`)
      dom.video.onwaitingforkey = func
    }

  }

  return api

}


export default methods