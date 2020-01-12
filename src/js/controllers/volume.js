const {
  relativeCoords
} = Utils

const animateClass = 'show'
let animateRemovable = true

const updateVolume = (coords, api) => {
  let {
    width,
    height,
    x,
    y
  } = coords

  // Update from cursor position
  if (x < 0) {
    x = 0
  } else if (x > width) {
    x = width
  }

  // volumeProgress.style.width = `${x / width * 100}%`
  api.setVolume(`${x / width}`)
}

const updateVolumeBar = (volume, volumeProgress, volumeCtrler) => {
  volumeProgress.style.width = `${volume * volumeCtrler.clientWidth}px`
}

/**
 * @description Volume
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const ctrlEleWrapper = document.createElement('div')
  dom.volume = ctrlEleWrapper
  dom.ctrls.left.appendChild(ctrlEleWrapper)
  ctrlEleWrapper.classList.add(Enums.className.volumeWrapper)

  const volumeIcon = document.createElement('div')
  volumeIcon.classList.add(Enums.className.volumeIcon)
  volumeIcon.innerHTML = Enums.i18n[settings.i18n].volume
  ctrlEleWrapper.appendChild(volumeIcon)

  const ctrlEle = document.createElement('div')
  ctrlEle.classList.add(Enums.className.volume)
  ctrlEleWrapper.appendChild(ctrlEle)

  const volumeBar = document.createElement('div')
  volumeBar.classList.add(Enums.className.volumeBar)
  ctrlEle.appendChild(volumeBar)

  const volumeCtrler = document.createElement('div')
  volumeCtrler.classList.add(Enums.className.volumeCtrler)
  volumeBar.appendChild(volumeCtrler)

  const volumeProgress = document.createElement('div')
  volumeProgress.classList.add(Enums.className.volumeProgress)
  volumeBar.appendChild(volumeProgress)
  // Initialize volume
  volumeProgress.style.width = `${api.getVolume() * 100}%`

  // Volume control
  const mousemoveHandler = e => {
    e.preventDefault() // Disable text selection and other default actions

    const coords = relativeCoords(volumeCtrler, e)
    updateVolume(coords, api)
  }

  dom.ctrls.left.addEventListener('mouseenter', e => {
    ctrlEle.classList.add(animateClass)
  })

  dom.ctrls.left.addEventListener('mouseleave', e => {
    animateRemovable && ctrlEle.classList.remove(animateClass)
  })

  volumeCtrler.addEventListener('mousedown', e => {
    const coords = relativeCoords(volumeCtrler, e)
    updateVolume(coords, api)
    document.body.addEventListener('mousemove', mousemoveHandler)
    animateRemovable = false
  })

  document.body.addEventListener('mouseup', e => {
    document.body.removeEventListener('mousemove', mousemoveHandler)

    if (!dom.ctrls.left.contains(e.target)) {
      ctrlEle.classList.remove(animateClass)
    }
    animateRemovable = true
  })

  volumeIcon.addEventListener('click', e => {
    api.toggleMute()
  })

  api.on('volumechange', e => {
    if (api.isMuted()) {
      volumeIcon.innerHTML = 'Muted'
    } else {
      // Only change volume text one time after resuming from muted
      if (volumeIcon.innerHTML !== Enums.i18n[settings.i18n].volume) {
        volumeIcon.innerHTML = Enums.i18n[settings.i18n].volume
      }
    }

    updateVolumeBar(api.getVolume(), volumeProgress, volumeCtrler)
  })

  return ctrlEle
}