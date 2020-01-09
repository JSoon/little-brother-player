import UI from '~/js/ui/index'
import nativeAttrs from './native-attrs'
import methods from '~/js/methods'
import events from '~/js/events'

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
  dom.video = videoEle
  // Set video native attributes
  Object.keys(settings).forEach(key => {
    if (
      settings[key] &&
      nativeAttrs.indexOf(key) !== -1
    ) {
      videoEle[key] = settings[key]
    }
  })

  // Define methods
  methods(params)

  // Define events
  events(params)

  // UI components
  const UIEle = UI(params)

  playerWrapper.appendChild(videoWrapper)
  playerWrapper.appendChild(UIEle)

  lb.append(playerWrapper)

  return params
}