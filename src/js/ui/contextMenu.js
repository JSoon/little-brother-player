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
  const version = document.createElement('div')
  version.innerHTML = `${pkg.name} v${pkg.version} ${pkg.license} License`
  const copyright = document.createElement('div')
  copyright.innerHTML = `Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} ${pkg.author.email}`

  contextMenu.appendChild(version)
  contextMenu.appendChild(copyright)

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