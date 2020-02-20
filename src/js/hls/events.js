import Hls from 'hls.js'

/**
 * @description Runtime events handler
 * 
 * https://github.com/video-dev/hls.js/blob/master/docs/API.md#runtime-events
 */

export default (params, hls) => {

  const {
    settings,
    api,
    dom
  } = params

  const url = settings.media

  // Fired when MediaSource has been succesfully attached to media element
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    // console.log("video and hls.js are now bound together !")
    Utils.debug.log(`Hls.Events.MEDIA_ATTACHED`)

    hls.loadSource(url)
  })

  // Fired after manifest has been loaded
  hls.on(Hls.Events.MANIFEST_LOADED, (event, data) => {
    Utils.debug.log(`Hls.Events.MANIFEST_LOADED`)
    console.log(data);
  })

  // Fired after manifest has been parsed
  hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
    api.play()
  })

  // Fired when a level switch is effective
  hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
    Utils.debug.log(`Hls.Events.LEVEL_SWITCHED`, data.level)
  })

}