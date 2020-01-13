import './tooltip.scss'

const updateTooltipPosition = (params) => {
  let {
    containerEle,
    targetEle,
    tipEle,
    title,
    e,
    attached,
    progressbar
  } = params

  if (!tipEle) {
    return
  }

  if (!progressbar) {
    tipEle.innerHTML = title || targetEle.title || 'Tooltip'
  }
  // Only for updating progressbar cursor time
  else {
    const coords = progressbar.relativeCoords(progressbar.ctrlBarEle, e)
    tipEle.innerHTML = Utils.secToHHMMSS(progressbar.coordsToTime(coords, progressbar.video.duration))
  }

  const containerBounds = containerEle.getBoundingClientRect()
  const targetBounds = targetEle.getBoundingClientRect()
  let tipEleTop = targetBounds.top - tipEle.clientHeight
  let tipEleLeft = targetBounds.left + (targetEle.clientWidth - tipEle.clientWidth) / 2

  if (attached) {
    tipEleTop = e.clientY - tipEle.clientHeight - (e.clientY - targetBounds.top)
    tipEleLeft = e.clientX - tipEle.clientWidth / 2
  }

  if (tipEleTop >= tipEle.clientHeight) {
    tipEle.style.top = tipEleTop + 'px'
  } else {
    tipEle.style.top = 0 + 'px'
  }

  if (tipEleLeft + tipEle.clientWidth <= containerBounds.right) {
    if (tipEleLeft >= containerBounds.left) {
      tipEle.style.left = tipEleLeft + 'px'
    }
  } else {
    tipEle.style.left = containerBounds.right - tipEle.clientWidth + 'px'
  }

  // Adjust styles
  tipEle.style.top = parseInt(tipEle.style.top) - 5 + 'px'

  tipEle.classList.add('show')
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
  let {
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

  const mouseoverHandler = e => {

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

    updateTooltipPosition(Object.assign(params, {
      containerEle,
      targetEle,
      tipEle,
      title,
      e
    }))

  }

  const mousemoveHandler = e => {

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
        containerEle,
        targetEle,
        tipEle,
        title,
        e
      }))
    }

  }
  const mouseoutHandler = e => {

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

    // document.body.removeEventListener('mouseover', mouseoverHandler)
    // document.body.removeEventListener('mousemove', mousemoveHandler)
    // document.body.removeEventListener('mouseout', mouseoutHandler)

  }

  // Show tooltip
  document.body.addEventListener('mouseover', mouseoverHandler)

  // Move tooltip
  document.body.addEventListener('mousemove', mousemoveHandler)

  // Destroy tooltip
  document.body.addEventListener('mouseout', mouseoutHandler)


  // Update tooltip title
  const updateTooltipTitle = (newTitle) => {
    title = newTitle
    updateTooltipPosition(Object.assign(params, {
      containerEle,
      targetEle,
      tipEle,
      title
    }))
  }

  return {
    updateTooltipTitle
  }

}

export default tooltip