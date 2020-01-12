/**
 * @description Picture in Picture
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const video = dom.video

  if (
    // Chrome
    !document.pictureInPictureEnabled &&
    // Safari
    !(video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === 'function')
    // Firefox
  ) {
    return
  }

  const ctrlEle = document.createElement('div')
  dom.pip = ctrlEle
  dom.ctrls.right.appendChild(ctrlEle)

  ctrlEle.innerHTML = Enums.i18n[settings.i18n].pip
  ctrlEle.classList.add(Enums.className.pip)

  ctrlEle.addEventListener('click', async function () {
    api.togglePiP()
  })

  return ctrlEle
}