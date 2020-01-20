import Hls from 'hls.js'

/**
 * @description Error handler
 * 
 * https://github.com/video-dev/hls.js/blob/master/docs/API.md#errors
 */

export default (params, hls) => {

  const {
    settings,
    api,
    dom
  } = params

  let recoverTime = 0
  let maxRecoverTime = 5

  hls.on(Hls.Events.ERROR, function (event, data) {
    var errorType = data.type
    var errorDetails = data.details
    var errorFatal = data.fatal

    Utils.debug.error(`HLS Error: ${errorDetails}`)
    dom.loading && dom.loading.classList.add('hide')

    Coms.toast(params, {
      title: errorDetails
    })

    if (errorFatal) {
      if (recoverTime > maxRecoverTime) {
        Utils.debug.error(`HLS Error: fatal media error cannot be recovered, execute destroying`)
        hls.destroy()
        return
      }

      switch (errorType) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          // try to recover network error
          Utils.debug.error(`HLS Error: fatal network error encountered, try to recover`)
          hls.startLoad()
          break
        case Hls.ErrorTypes.MEDIA_ERROR:
          // try to recover media error
          Utils.debug.error(`HLS Error: fatal media error encountered, try to recover`)
          hls.recoverMediaError()
          break
        default:
          // cannot recover
          Utils.debug.error(`HLS Error: fatal media error cannot be recovered, execute destroying`)
          hls.destroy()
          recoverTime = maxRecoverTime
          break
      }
      recoverTime += 1
    }
  })

}