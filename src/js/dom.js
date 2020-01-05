import UI from '~/js/ui/ui'

/**
 * @description Player DOM
 * @param {object}  params
 * @param {object}  params.settings   initial settings
 * @param {object}  params.api        
 */
export default (params) => {

  const {
    settings,
    api
  } = params

  // dom that includes all player relevant doms
  let dom = {}
  params.dom = dom

  const lb = document.getElementById(settings.id)

  // wrapper
  const videoEleWrapper = document.createElement('div')
  videoEleWrapper.classList.add(ENUMS.className.playerWrapper)
  params.videoEleWrapper = videoEleWrapper
  dom.wrapper = videoEleWrapper

  // video
  const videoEle = document.createElement('video')
  videoEle.classList.add(ENUMS.className.player)
  params.videoEle = videoEle
  dom.video = videoEle

  // UI
  const UIEle = UI(params)

  videoEleWrapper.appendChild(videoEle)
  videoEleWrapper.appendChild(UIEle)

  lb.append(videoEleWrapper)

  return dom
}