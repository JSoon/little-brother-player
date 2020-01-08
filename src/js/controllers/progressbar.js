/**
 * @description Progressbar
 * @param {object}  params
 */

const bufferSet = []
let seekTime = null

const newBuffer = (ctrlEle) => {
  const bufferBar = document.createElement('div')
  bufferBar.classList.add(Enums.className.progressbarBuffer)
  ctrlEle.appendChild(bufferBar)
  bufferSet.push(bufferBar)
  return bufferBar
}

const updateBuffer = (ctrlEle, buffered, duration) => {
  if (!buffered.length) {
    return
  }

  // Remove all buffer bars
  bufferSet.forEach(buffer => {
    buffer.remove()
  })

  // Update all buffer bars
  for (let i = 0; i < buffered.length; i++) {
    const buffer = newBuffer(ctrlEle)
    const bufferedTime = buffered.end(i) - buffered.start(i)
    buffer.style.left = `${buffered.start(i) / duration * 100}%`
    buffer.style.width = `${bufferedTime / duration * 100}%`
  }
}

// Get relative coordinates of cursor within an element
const relativeCoords = (ele, mouseEvent) => {
  const bounds = ele.getBoundingClientRect()
  const x = mouseEvent.clientX - bounds.left
  const y = mouseEvent.clientY - bounds.top
  return {
    width: bounds.width,
    height: bounds.height,
    x: x,
    y: y
  }
}

const coordsToTime = (coords, duration) => {
  let time = coords.x / coords.width * duration
  if (time < 0) {
    time = 0
  } else if (time > duration) {
    time = duration
  }
  return time
}

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params
  const video = dom.video

  const ctrlEle = document.createElement('div')
  dom.progressbar = ctrlEle

  ctrlEle.classList.add(Enums.className.progressbar)
  newBuffer(ctrlEle) // Initial buffer

  // Show the time of the current position of cursor
  ctrlEle.addEventListener('mousemove', (event) => {
    const coords = relativeCoords(ctrlEle, event)
  })
  ctrlEle.addEventListener('mousemove', (event) => {

  })

  ctrlEle.addEventListener('click', (event) => {
    const coords = relativeCoords(ctrlEle, event)
    video.currentTime = coordsToTime(coords, video.duration)
  })

  video.addEventListener('seeked', () => {

  })

  video.addEventListener('timeupdate', () => {

  })

  // Update the buffer bar
  video.addEventListener('progress', () => {
    updateBuffer(ctrlEle, video.buffered, video.duration)
  })

  return ctrlEle
}