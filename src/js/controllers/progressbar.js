import tooltip from '~/js/components/tooltip/tooltip'

const {
  relativeCoords
} = Utils

const bufferSet = []

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
    const bufferedStart = Math.round(buffered.start(i))
    const bufferedEnd = Math.round(buffered.end(i))
    const bufferedTime = bufferedEnd - bufferedStart
    buffer.style.left = `${bufferedStart / duration * 100}%`
    buffer.style.width = `${bufferedTime / duration * 100}%`
  }
}

const updateProgress = (progress, currentTime, duration) => {
  progress.style.width = `${currentTime / duration * 100}%`
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

/**
 * @description Progressbar
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const video = dom.video

  const ctrlEle = document.createElement('div')
  ctrlEle.classList.add(Enums.className.progressbar)
  dom.progressbar = ctrlEle
  dom.ctrlbar.appendChild(ctrlEle)

  const ctrlBarEle = document.createElement('div')
  ctrlBarEle.classList.add(Enums.className.progressbarCtrler)
  ctrlEle.appendChild(ctrlBarEle)
  // Initialize buffer
  updateBuffer(ctrlEle, api.getBuffered(), api.getDuration())

  const progress = document.createElement('div')
  progress.classList.add(Enums.className.progressbarProgress)
  ctrlEle.appendChild(progress)

  // Show the time of the current position of cursor
  ctrlBarEle.addEventListener('mousemove', (event) => {

  })

  ctrlBarEle.addEventListener('click', (event) => {
    // console.log(event.currentTarget) // Point to the element to which event is bound, i.e. ctrlBarEle here
    // console.log(event.target); // Point to the element on which we click, and the click event will bubble up to the currentTarget eventually

    const coords = relativeCoords(ctrlBarEle, event)
    api.setCurrentTime(coordsToTime(coords, api.getDuration()))
  })

  api.on('seeked', () => {
    updateProgress(progress, api.getCurrentTime(), api.getDuration())
    api.play()
  })

  api.on('timeupdate', () => {
    updateProgress(progress, api.getCurrentTime(), api.getDuration())
  })

  // Update the buffer bar
  api.on('progress', () => {
    updateBuffer(ctrlEle, api.getBuffered(), api.getDuration())
  })

  api.on('loadedmetadata', e => {

    // Make sure duration is not NaN
    tooltip({
      selector: ctrlBarEle,
      title: '呵呵',
      attached: true,
      container: dom.wrapper,
      // Only for progressbar
      progressbar: {
        ctrlBarEle,
        video,
        relativeCoords,
        coordsToTime
      }
    })

  })

  return ctrlEle
}