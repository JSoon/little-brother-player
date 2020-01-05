/**
 * @description Player DOM
 */
import {
  className
} from './enums'

export default (id) => {

  const lb = document.getElementById(id)

  // wrapper
  const videoEleWrapper = document.createElement('div')
  videoEleWrapper.classList.add(className.playerWrapper)

  // video
  const videoEle = document.createElement('video')
  videoEle.classList.add(className.player)

  // UI
  const UIEle = document.createElement('div')
  UIEle.classList.add(className.ui)

  videoEleWrapper.appendChild(videoEle)
  videoEleWrapper.appendChild(UIEle)
    
  lb.append(videoEleWrapper)

  return {
    videoEleWrapper,
    videoEle,
    UIEle
  }
}
