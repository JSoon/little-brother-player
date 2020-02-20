import Hls from 'hls.js'
import config from './config'
import eventsHandler from './events'
import errorHandler from './errorHandler'

/**
 * @description HTTP live stream support
 * 
 * https://github.com/video-dev/hls.js#compatibility
 * https://github.com/video-dev/hls.js/blob/master/docs/API.md#getting-started
 * 
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.dom
 */

const HLS = (params) => {

  if (!Hls.isSupported()) {
    throw 'Hls is not supported!'
  }
  Utils.debug.log('Hls is supported!');

  const {
    settings,
    api,
    dom
  } = params

  const video = dom.video
  const hls = new Hls(config)

  // Bind hls to video element
  hls.attachMedia(video)

  eventsHandler(params, hls)

  errorHandler(params, hls)

  return hls

}

export default HLS