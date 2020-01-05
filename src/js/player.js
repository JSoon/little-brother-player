import '~/js/version'
import dom from '~/js/dom'
import methods from '~/js/methods'
import events from '~/js/events'

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

  if (!settings.id || TYPEOF.default(settings.id) !== 'string') {
    throw 'No player id or type is not string!'
  }

  if (!settings.media.length) {
    throw 'No media sources!'
  }

  let api = {}

  // Generating player DOM
  const DOM = dom({
    settings,
    api
  })

  // Defining methods
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

  // Defining events
  events({
    settings,
    api,
    DOM
  })


  return api

}

// Dealing with namespace conflict
if (!window.littleBrother) {
  window.littleBrother = littleBrother
} else {
  window.bigBrother = littleBrother
}

export default littleBrother