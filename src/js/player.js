import './version'
import dom from './dom'
import * as enums from './enums'
import typeOf from '~/utils/typeof'

/**
 * @description Initializing player
 * 
 * @param {object}          settings
 * @param {string}          settings.id         player element id
 * @param {string}          settings.type       media type, i.e. mp4, ogg, m3u8
 * @param {array|string}    settings.media      media source
 * @param {boolean}         settings.autoplay    
 */
const littleBrother = (settings = {
  autoplay: false
}) => {

  if (!settings.id || typeOf(settings.id) !== 'string') {
    throw 'No player id or type is not string!'
  }

  if (!settings.media.length) {
    throw 'No media sources!'
  }

  // Generating player DOM
  const {
    videoEleWrapper,
    videoEle,
    UIEle
  } = dom(settings.id)

  load(settings)

  if (settings.autoplay) {
    play()
  }

  function canPlayType(MIME) {
    // probably, maybe
    if (videoEle.canPlayType(MIME)) {
      return true
    }
    // empty string
    return false
  }

  function seek(sec) {
    videoEle.currentTime = sec
  }

  /**
   * @description Begin playback of the media
   * @returns {object}  A promise
   * 
   * Note: Older browsers may not return a value from play()
   */
  function play() {
    return videoEle.play()
  }

  /**
   * @description Load media but not to begin playing.
   * Generally only useful when you've made dynamic changes to the set of sources available for the media element,
   * either by changing the element's src attribute or by adding or removing <source> elements nested within the media element itself.
   * load() will reset the element and rescan the available sources, thereby causing the changes to take effect.
   * 
   * @param {object}  params  Same as settings
   */
  function load(params) {
    videoEle.innerHTML = ''

    if (typeOf(params.media) === 'string') {
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
      srcEle.type = enums.MIME[medium.type]

      if (!canPlayType(srcEle.type)) {
        throw 'Invalid media type!'
      }

      videoEle.appendChild(srcEle)
    })
    videoEle.appendChild(document.createTextNode(`Sorry, your browser doesn't support embedded videos.`))
  }

  return {
    play,
    load,
    seek
  }

}

// Dealing with namespace conflict
if (!window.littleBrother) {
  window.littleBrother = littleBrother
} else {
  window.bigBrother = littleBrother
}

export default littleBrother