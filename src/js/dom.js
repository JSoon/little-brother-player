import UI from '~/js/ui/index'
import nativeAttrs from './native-attrs'
import methods from '~/js/methods'
import events from '~/js/events'
import MobileDetect from 'mobile-detect'
const md = new MobileDetect(window.navigator.userAgent)

/**
 * @description Player DOM
 * @param {object}  params
 * @param {object}  params.settings   initial settings
 */
export default (params) => {

  const {
    settings
  } = params

  // dom that includes all player relevant doms
  const dom = {}
  params.dom = dom

  // api
  const api = {}
  params.api = api

  const lb = document.getElementById(settings.id)

  // wrapper
  const playerWrapper = document.createElement('div')
  playerWrapper.classList.add(Enums.className.playerWrapper)
  params.playerWrapper = playerWrapper
  dom.wrapper = playerWrapper

  // video
  const videoEle = document.createElement('video')
  videoEle.classList.add(Enums.className.video)
  const videoWrapper = document.createElement('div')
  videoWrapper.classList.add(Enums.className.videoWrapper)
  videoWrapper.appendChild(videoEle)
  params.videoEle = videoEle
  dom.videoWrapper = videoWrapper
  dom.video = videoEle
  
  playerWrapper.appendChild(videoWrapper)

  lb.append(playerWrapper)

  // Set video native attributes
  Object.keys(settings).forEach(key => {
    if (
      settings[key] &&
      nativeAttrs.indexOf(key) !== -1
    ) {
      videoEle[key] = settings[key]
    }
  })
  // Set default properties
  videoEle.defaultMuted = settings.muted || videoEle.defaultMuted
  videoEle.defaultPlaybackRate = settings.playbackRate || videoEle.defaultPlaybackRate

  // For mobile display custom controlls
  if (md.mobile()) {
    videoEle.setAttribute('x5-video-player-type', 'h5-page')
    // videoEle.setAttribute('x5-playsinline', '')
    // videoEle.setAttribute('x5-video-player-fullscreen', 'true')
    // videoEle.setAttribute('x5-video-player-orientation', 'landscape|portrait')
    
    
    videoEle.setAttribute('x-webkit-airplay', 'allow')
    videoEle.setAttribute('webkit-playsinline', '')
    videoEle.setAttribute('playsinline', '')
  }

  // Register global dom
  Global.dom = dom

  // Define methods
  methods(params)

  // Define events
  events(params)

  // UI components
  UI(params)

  return params
}