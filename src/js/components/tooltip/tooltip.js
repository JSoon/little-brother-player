import './tooltip.scss'

// Convert seconds to HH:MM:SS format
const normalizeSec = (seconds) => {
  if (Utils.typeof(seconds) !== 'number') {
    throw 'Argument must be a number!'
  }

  return new Date(Math.floor(seconds * 1000)).toISOString().substr(11, 8)
}

const updateTooltipPosition = (params) => {
  const {
    targetEle,
    tipEle,
    title,
    e,
    progressbar
  } = params

  if (!progressbar) {
    tipEle.innerHTML = title || targetEle.title || 'Tooltip'
  }
  // Only for updating progressbar cursor time
  else {
    const coords = progressbar.relativeCoords(progressbar.ctrlEle, e)
    tipEle.innerHTML = normalizeSec(progressbar.coordsToTime(coords, progressbar.video.duration))
  }

  const targetBounds = targetEle.getBoundingClientRect()
  const tipEleBounds = tipEle.getBoundingClientRect()
  const tipEleTop = e.clientY - tipEle.clientHeight - (e.clientY - targetBounds.top)
  const tipEleLeft = e.clientX - tipEle.clientWidth / 2

  if (tipEleTop >= tipEle.clientHeight) {
    tipEle.style.top = tipEleTop + 'px'
  } else {
    tipEle.style.top = 0 + 'px'
  }

  if (tipEleLeft >= targetBounds.left) {
    if (tipEleLeft <= targetBounds.right - tipEle.clientWidth) {
      tipEle.style.left = tipEleLeft + 'px'
    } else {
      tipEle.style.left = targetBounds.right - tipEle.clientWidth + 'px'
    }
  } else {
    tipEle.style.left = targetBounds.left + 'px'
  }

  // Adjust styles
  tipEle.style.top = parseInt(tipEle.style.top) - 5 + 'px'

}

/**
 * @description Tooltip
 * 
 * @param {object}          params 
 * @param {object|string}   selector          HTMLElement or id/class selector
 * @param {string}          title             Tip text
 * @param {object}          progressbar       Used to update cursor time of progressbar only
 * @param {boolean}         attached          If being able to move with cursor
 * @param {object}          container         Relative boundary element of tooltip, default to document.body
 */
const tooltip = (params) => {
  const {
    selector,
    title,
    progressbar,
    attached,
    container
  } = params

  if (!selector) {
    return
  }

  const containerEle = container || document.body
  let targetEle = null
  // HTMLElement
  if (Utils.typeof(selector) === 'htmldivelement' || selector.indexOf('#') !== -1) {
    targetEle = Utils.typeof(selector) === 'htmldivelement' ? selector : document.querySelector(selector)
  }
  // HTMLElement class name string
  else {
    // 
  }

  var tipEle = null

  // Show tooltip
  document.body.addEventListener('mouseenter', (e) => {
    if (targetEle) {
      if (!targetEle.contains(e.target)) {
        return
      }
    } else {
      if (!e.target.closet(selector)) {
        return
      }
      targetEle = e.target.closet(selector)
    }

    tipEle = document.createElement('div')
    tipEle.classList.add(Enums.className.tooltip)

    containerEle.appendChild(tipEle)

    if (!attached) {
      updateTooltipPosition(Object.assign(params, {
        targetEle,
        tipEle,
        e
      }))
    }

  }, true)

  // Destroy tooltip
  document.body.addEventListener('mouseleave', (e) => {
    if (targetEle) {
      if (!targetEle.contains(e.target)) {
        return
      }
    } else {
      if (!e.target.closet(selector)) {
        return
      }
    }

    tipEle && tipEle.remove()
  }, true)

  // Move tooltip
  document.body.addEventListener('mousemove', (e) => {
    if (targetEle) {
      if (!targetEle.contains(e.target)) {
        return
      }
    } else {
      if (!e.target.closet(selector)) {
        return
      }
      targetEle = e.target.closet(selector)
    }

    if (attached) {
      updateTooltipPosition(Object.assign(params, {
        targetEle,
        tipEle,
        e
      }))
    }

  }, true)

}

export default tooltip