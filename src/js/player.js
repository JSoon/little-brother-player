import '~/js/package'
import DOM from '~/js/dom'

/**
 * @description Initialize player
 * 
 * @param {object}          settings
 * @param {boolean}         settings.debug          Debug mode    
 * @param {string}          settings.id             Player element id
 * @param {string}          settings.type           Media type, i.e. mp4, ogg, m3u8
 * @param {array|string}    settings.media          Media source
 * @param {string}          settings.i18n           i18n code
 * @param {boolean}         settings.live           Live stream
 * 
 * Native attributes below
 * @param {boolean}         settings.autoplay   
 * @param {string}          settings.poster         A URL for an image to be shown while the video is downloading
 * @param {string}          settings.preload        None, metadata, auto
 * @param {boolean}         settings.muted          If true, media will be able to played despite the limit of autoplay policy
 * @param {number}          settings.volume         A double indicating the audio volume, from 0.0 (silent) to 1.0 (loudest)
 * @param {number}          settings.playbackRate   A double setting the rate at which the media is being played back, 1.0 is "normal speed"
 * @param {number}          settings.fastStep       Fast forward & fast backward step in seconds
 * @param {number}          settings.initialTime    Initial playback time
 */
const littleBrother = settings => {

  const defaults = {
    debug: false,
    autoplay: false,
    i18n: 'en',
    live: false,
    initialTime: Utils.getUrlParamByName(Enums.paramName.initialTime)
  }

  // Merge defaults
  settings = Object.assign(defaults, settings)

  if (!settings.id || Utils.typeof(settings.id) !== 'string') {
    throw 'No player id or type is not string!'
  }

  if (!settings.media.length) {
    throw 'No media sources!'
  }

  // Register global settings
  Global.settings = settings

  /**
   * @description Generate player DOM, Define methods & Define methods
   */
  const {
    dom,
    api
  } = DOM({
    settings
  })

  // Define static params
  littleBrother.dom = dom

  // Load media
  api.load(settings)

  return api

}

// Deal with namespace conflict
if (!window.littleBrother) {
  window.littleBrother = littleBrother
} else {
  Utils.debug.log(` 小老弟你怎么回事？大老哥H5播放器冲鸭 ─=≡Σ(((つ•̀ω•́)つ') `)
  window.bigBrother = littleBrother
}

export default littleBrother