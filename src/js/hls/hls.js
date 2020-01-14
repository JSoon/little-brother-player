import Hls from 'hls.js'
import config from './config'
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
  const url = settings.media
  const hls = new Hls(config)

  //#region Config live stream UI
  
  //#endregion

  //#region Play live stream
  // bind them together
  hls.attachMedia(video)
  // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    console.log("video and hls.js are now bound together !")
    hls.loadSource(url)
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log("manifest loaded, found " + data.levels.length + " quality level")
      api.play()
    })
  })
  //#endregion

  errorHandler(params, hls)

  return hls

}

export default HLS