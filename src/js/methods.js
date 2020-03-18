import fscreen from 'fscreen'
import {
  enterpip,
  exitpip,
  enterfullscreen,
  exitfullscreen,
  enterfullpage,
  exitfullpage
} from './custom-events'
import hlsAPI from '~/js/hls/methods'

/**
 * @description Player methods
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.dom
 */

const methods = (params) => {

  let {
    settings
  } = params
  const {
    api,
    dom
  } = params

  const video = dom.video
  let hls = null
  
  let volumeBeforeMuted = settings.volume || 1

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
   * @param {object}  loadSettings  Same as settings
   */
  api.load = load

  async function load(loadSettings = {}) {
    // Update settings
    settings = Object.assign(settings, loadSettings)
    settings.live = loadSettings.live || false

    destroy()

    //#region Deal with HTTP live stream
    if (settings.live) {
      const [err, HLS] = await Utils.promise(import('~/js/hls/hls'))

      if (err) {
        throw 'HLS launch fails!'
      }

      hls = HLS.default(params)

      // Register hls.js methods
      params.hls = hls
      hlsAPI(params)
      return
    }
    //#endregion

    //#region Deal with image
    if (Utils.typeof(settings.media) === 'string') {
      const extName = Utils.fileExt(settings.media)
      // Get image extension
      if (extName && Enums.MIME.image[extName]) {
        // If this is an image uri, then render and return
        dom.videoWrapper.style.backgroundImage = `url(${settings.media})`
        // Hide UI controllers
        dom.wrapper.classList.add(Enums.className.playingImage)
        return
      }
    }
    //#endregion

    //#region Deal with video
    let allCantPlay = true // If all sources are unavalaible, throw error

    if (Utils.typeof(settings.media) === 'string') {
      const mediaSrc = settings.media
      // You have to pass settings.type if settings.media is a url
      if (!settings.type) {
        throw 'No media type!'
      }
      settings.media = [{
        src: mediaSrc,
        type: settings.type
      }]
    }

    settings.media.forEach(medium => {
      const srcEle = document.createElement('source')
      srcEle.src = medium.src
      srcEle.type = Enums.MIME.video[medium.type]

      if (canPlayType(srcEle.type)) {
        allCantPlay = false
      }

      video.appendChild(srcEle)
    })
    video.appendChild(document.createTextNode(`Sorry, your browser doesn't support embedded videos.`))
    if (allCantPlay) {
      throw 'Invalid media type!'
    }
    settings.initialTime && setCurrentTime(settings.initialTime)
    video.load()
    //#endregion
  }

  api.pause = pause

  function pause() {
    video.pause()
  }

  api.stop = stop

  function stop() {
    pause()
    setCurrentTime(0)
  }

  api.fastForwardBackward = fastForwardBackward

  function fastForwardBackward(sec) {

    const seekTime = video.currentTime + sec
    const timeRangesObject = video.seekable
    // const timeRanges = []
    let canFast = false
    // Go through the object and output an array
    for (let count = 0; count < timeRangesObject.length; count++) {
      // timeRanges.push([timeRangesObject.start(count), timeRangesObject.end(count)])
      if (seekTime <= timeRangesObject.end(count) && seekTime >= timeRangesObject.start(count)) {
        canFast = true
      }
    }
    // console.log(timeRanges)

    if (canFast) {
      video.currentTime += sec
      Coms.toast({
        title: `${sec > 0 ? '+' + sec : sec}s`
      })
    }
  }

  api.destroy = destroy

  function destroy() {
    dom.wrapper.classList.remove(Enums.className.playingImage)
    dom.wrapper.classList.remove(Enums.className.playingVideo)
    dom.wrapper.classList.remove(Enums.className.playingStream)
    video.innerHTML = ''

    stop()
    video.load()
    hls && hls.destroy()
    // // If has last src, then load current sources in case the last one is still playing
    // if (getCurrentSrc()) {
    // }
  }

  api.togglePlay = togglePlay

  function togglePlay() {
    if (!isPlaying()) {
      play()
    } else {
      pause()
    }
  }

  api.toggleFullscreen = toggleFullscreen

  /**
   * @description Fullscreen
   * 
   * @param {HTMLElement} ele The html element that needs to enter fullscreen state
   * @param {object}      e   Event object 
   */
  function toggleFullscreen(e) {
    if (!fscreen.fullscreenEnabled) {
      throw 'Fullscreen is not support!'
    }

    if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen()
    } else {
      fscreen.requestFullscreen(dom.wrapper)
    }
  }

  fscreen.addEventListener('fullscreenchange', fullscreenchangeHandler, false)

  function fullscreenchangeHandler(e) {
    if (fscreen.fullscreenElement !== null) {
      Utils.debug.log('Event triggered: Entered fullscreen mode');
      video.dispatchEvent(enterfullscreen)
    } else {
      Utils.debug.log('Event triggered: Exited fullscreen mode');
      video.dispatchEvent(exitfullscreen)
    }
  }

  api.toggleFullpage = toggleFullpage

  /**
   * @description Fullpage
   * 
   * @param {object} e Event object
   */
  function toggleFullpage(e) {
    const fullpage = this.hasAttribute('fullpage')
    if (!fullpage) {
      this.setAttribute('fullpage', '')
      video.dispatchEvent(enterfullpage)
      return
    }
    this.removeAttribute('fullpage')
    video.dispatchEvent(exitfullpage)
  }

  api.toggleMute = toggleMute

  function toggleMute() {
    if (!isMuted()) {
      setVolume(0)
      Coms.toast({
        title: 'Muted'
      })
    } else {
      if (volumeBeforeMuted !== 0) {
        setVolume(volumeBeforeMuted)
      } else {
        setVolume(1)
      }
      Coms.toast({
        title: 'Unmuted'
      })
    }
  }

  api.togglePiP = togglePiP

  async function togglePiP() {
    if (
      // Chrome
      !document.pictureInPictureEnabled &&
      // Safari
      !(video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === 'function')
      // Firefox
    ) {
      return
    }

    //#region Chrome
    if (document.pictureInPictureEnabled) {

      const pip = video === document.pictureInPictureElement
      let err

      if (!pip) {
        // 进入PiP
        [err] = await Utils.promise(video.requestPictureInPicture())
        if (!err) {
          video.dispatchEvent(enterpip)
        }
      } else {
        // 退出PiP
        [err] = await Utils.promise(document.exitPictureInPicture())
        if (!err) {
          video.dispatchEvent(exitpip)
        }
      }
    }
    //#endregion

    //#region Safari
    if (video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === 'function') {
      video.webkitSetPresentationMode(video.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture')
      if (video.webkitPresentationMode === 'picture-in-picture') {
        video.dispatchEvent(enterpip)
      } else if (video.webkitPresentationMode === 'inline') {
        video.dispatchEvent(exitpip)
      }
    }
    //#endregion
  }

  api.on = on

  function on(eventName, func) {

    if (eventName === 'encrypted') {
      Utils.debug.log(`Event triggered: ${eventName}`)

      video.onencrypted = func
      return
    }

    if (eventName === 'waitingforkey') {
      Utils.debug.log(`Event triggered: ${eventName}`)

      video.onwaitingforkey = func
      return
    }

    video.addEventListener(eventName, e => {
      Utils.debug.log(`Event triggered: ${eventName}`)

      func(e)
    })

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

  api.getPlaybackRate = getPlaybackRate

  function getPlaybackRate() {
    return video.playbackRate
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

  api.getSrcType = getSrcType

  function getSrcType() {
    const src = getCurrentSrc()
    return Utils.fileExt(src)
  }

  //#endregion

  //#region Setters

  // Overwritten the same method on the MDN, which is an experimental technology
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/fastSeek#Specifications
  api.fastSeek = setCurrentTime
  api.setCurrentTime = setCurrentTime

  function setCurrentTime(val) {
    video.currentTime = val
  }

  api.setVolume = setVolume

  function setVolume(val) {
    volumeBeforeMuted = video.volume
    video.volume = val
  }

  api.setPlaybackRate = setPlaybackRate

  function setPlaybackRate(val) {
    video.playbackRate = val
  }

  //#endregion


  return api

}


export default methods