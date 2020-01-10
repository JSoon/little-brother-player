/**
 * @description Playtime, i.e. currentTime : duration
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const ctrlEle = document.createElement('div')
  dom.playtime = ctrlEle
  dom.ctrls.left.appendChild(ctrlEle)

  ctrlEle.innerHTML = ''
  ctrlEle.classList.add(Enums.className.playtime)

  // Playtime control
  api.on('timeupdate', e => {
    ctrlEle.innerHTML = `${Utils.secToHHMMSS(api.getCurrentTime())} / ${Utils.secToHHMMSS(api.getDuration())}`
  })

  return ctrlEle
}