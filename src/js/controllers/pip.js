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

    try {

      //#region Chrome
      if (document.pictureInPictureEnabled) {

        var pip = video === document.pictureInPictureElement

        if (!pip) {
          // 进入PiP
          await video.requestPictureInPicture()
        } else {
          // 退出PiP
          await document.exitPictureInPicture()
        }
      }
      //#endregion

      //#region Safari
      if (video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === 'function') {
        video.webkitSetPresentationMode(video.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture')
      }
      //#endregion

    } catch (error) {
      Utils.debug.error(error)
    } finally {
      // 
    }

  })

  return ctrlEle
}