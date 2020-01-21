import pkg from '~/js/package'

/**
 * @description Right click menu
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const contextMenu = document.createElement('div')
  dom.contextMenu = contextMenu
  dom.ui.appendChild(contextMenu)

  contextMenu.classList.add(Enums.className.contextMenu)

  // Version
  const version = document.createElement('div')
  version.innerHTML = `${pkg.name} v${pkg.version} ${pkg.license} License`
  contextMenu.appendChild(version)
  version.addEventListener('click', e => {
    Utils.copyToClipboard(version.innerHTML)
    Coms.toast(params, {
      title: 'Copied!'
    })
    contextMenu.classList.remove('show')
  })

  // Copyright
  const copyright = document.createElement('div')
  copyright.innerHTML = `Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} ${pkg.author.email}`
  contextMenu.appendChild(copyright)
  copyright.addEventListener('click', e => {
    Utils.copyToClipboard(copyright.innerHTML)
    Coms.toast(params, {
      title: 'Copied!'
    })
    contextMenu.classList.remove('show')
  })

  // Copy video URL
  const copyURL = document.createElement('div')
  copyURL.innerHTML = `Copy video URL`
  contextMenu.appendChild(copyURL)
  copyURL.addEventListener('click', e => {
    Utils.copyToClipboard(window.location.href)
    Coms.toast(params, {
      title: 'Copied!'
    })
    contextMenu.classList.remove('show')
  })

  // Copy video URL at current time
  const copyURLWithTime = document.createElement('div')
  copyURLWithTime.innerHTML = `Copy video URL at current time`
  contextMenu.appendChild(copyURLWithTime)
  copyURLWithTime.addEventListener('click', e => {
    const time = api.getCurrentTime()
    // Add current time param into href
    const {
      protocol,
      host,
      pathname
    } = window.location
    const timeUrl = `${protocol}//${host}${pathname}?${Enums.paramName.initialTime}=${time}`
    Utils.copyToClipboard(timeUrl)
    Coms.toast(params, {
      title: 'Copied!'
    })
    contextMenu.classList.remove('show')
  })

  // Context menu control
  dom.ui.addEventListener('contextmenu', e => {
    e.preventDefault()

    contextMenu.classList.add('show')

    const coords = Utils.relativeCoords(dom.ui, e)
    let left = coords.x
    let top = coords.y

    // console.log('left', left);
    // console.log('top', top);
    // console.log('contextMenu.clientWidth', contextMenu.clientWidth);
    // console.log('contextMenu.clientHeight', contextMenu.clientHeight);

    if (document.documentElement.clientWidth - left < contextMenu.clientWidth) {
      left = document.documentElement.clientWidth - contextMenu.clientWidth
    }
    if (document.documentElement.clientHeight - top < contextMenu.clientHeight) {
      top = document.documentElement.clientHeight - contextMenu.clientHeight
    }

    contextMenu.style.left = `${left}px`
    contextMenu.style.top = `${top}px`
  })

  document.body.addEventListener('click', e => {
    if (!contextMenu.contains(e.target)) {
      contextMenu.classList.remove('show')
    }
  })

  return contextMenu
}