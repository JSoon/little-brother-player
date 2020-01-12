import '~/js/package'
import dom from '~/js/dom'

/**
 * @description Initialize player
 * 
 * @param {object}          settings
 * @param {boolean}         settings.debug      Debug mode    
 * @param {string}          settings.id         Player element id
 * @param {string}          settings.type       Media type, i.e. mp4, ogg, m3u8
 * @param {array|string}    settings.media      Media source
 * @param {string}          settings.i18n       i18n code
 * 
 * Native attributes below
 * @param {boolean}         settings.autoplay   
 * @param {string}          settings.poster     A URL for an image to be shown while the video is downloading
 * @param {string}          settings.preload    None, metadata, auto
 * @param {boolean}         settings.muted      If true, media will be able to played despite the limit of autoplay policy
 * @param {number}          settings.volume     A double indicating the audio volume, from 0.0 (silent) to 1.0 (loudest)
 */
const littleBrother = (settings) => {

  const defaults = {
    debug: false,
    autoplay: false,
    i18n: 'en'
  }

  // Merge defaults
  settings = Object.assign(defaults, settings)

  if (!settings.id || Utils.typeof(settings.id) !== 'string') {
    throw 'No player id or type is not string!'
  }

  if (!settings.media.length) {
    throw 'No media sources!'
  }

  /**
   * @description Generate player DOM, Define methods & Define methods
   */
  const {
    api
  } = dom({
    settings
  })

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