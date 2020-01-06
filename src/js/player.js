import '~/js/version'
import dom from '~/js/dom'
import methods from '~/js/methods'
import events from '~/js/events'

/**
 * @description Initialize player
 * 
 * @param {object}          settings
 * @param {boolean}         settings.debug      debug mode    
 * @param {string}          settings.id         player element id
 * @param {string}          settings.type       media type, i.e. mp4, ogg, m3u8
 * @param {array|string}    settings.media      media source
 * @param {string}          settings.i18n       i18n code
 * 
 * Native attributes below
 * @param {boolean}         settings.autoplay   
 * @param {string}          settings.poster     a URL for an image to be shown while the video is downloading
 * @param {string}          settings.preload    none, metadata, auto
 * @param {boolean}         settings.muted      if true, media will be able to played despite the limit of autoplay policy
 */
const littleBrother = (settings) => {

  const defaults = {
    debug: false,
    autoplay: false,
    i18n: 'en'
  }

  // Merge defaults
  settings = Object.assign(defaults, settings)

  if (!settings.id || TYPEOF.default(settings.id) !== 'string') {
    throw 'No player id or type is not string!'
  }

  if (!settings.media.length) {
    throw 'No media sources!'
  }

  let api = {}

  // Generate player DOM
  const DOM = dom({
    settings,
    api
  })

  // Define methods
  api = methods({
    settings,
    api,
    DOM
  })

  // Load media
  api.load(settings)

  if (settings.autoplay) {
    api.play()
  }

  // Define events
  events({
    settings,
    api,
    DOM
  })


  return api

}

// Deal with namespace conflict
if (!window.littleBrother) {
  window.littleBrother = littleBrother
} else {
  debug.log(` 小老弟你怎么回事？大老哥H5播放器冲鸭 ─=≡Σ(((つ•̀ω•́)つ') `)
  window.bigBrother = littleBrother
}

export default littleBrother