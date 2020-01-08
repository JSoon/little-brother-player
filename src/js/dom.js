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
  const videoEleWrapper = document.createElement('div')
  videoEleWrapper.classList.add(Enums.className.playerWrapper)
  params.videoEleWrapper = videoEleWrapper
  dom.wrapper = videoEleWrapper

  // video
  const videoEle = document.createElement('video')
  videoEle.classList.add(Enums.className.player)
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

  videoEleWrapper.appendChild(videoEle)
  videoEleWrapper.appendChild(UIEle)

  lb.append(videoEleWrapper)

  return params
}