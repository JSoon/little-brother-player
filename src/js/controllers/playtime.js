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
  ctrlEle.classList.add(Enums.className.playtime)

  const current = document.createElement('span')
  const separator = document.createElement('span')
  const duration = document.createElement('span')

  ctrlEle.appendChild(current)
  ctrlEle.appendChild(separator)
  ctrlEle.appendChild(duration)

  // Playtime control
  api.on('loadedmetadata', e => {
    current.innerHTML = '00:00'
    separator.innerHTML = ' / '
    duration.innerHTML = `${Utils.secToHHMMSS(api.getDuration())}`
  })

  api.on('timeupdate', e => {
    current.innerHTML = `${Utils.secToHHMMSS(api.getCurrentTime())}`
  })

  return ctrlEle
}