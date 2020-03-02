/**
 * @description Browser tab visibility change handler
 * 
 * @param {object}  params
 */

export default (params) => {

  const {
    settings,
    api,
    dom
  } = params

  const handleVisibilityChange = () => {

    if (!api.getCurrentSrc()) {
      return
    }

    if (document.hidden) {
      // Switch to another tab
      api.pause()
    } else {
      // Switch back to current tab
      api.play()
    }

  }

  document.addEventListener('visibilitychange', handleVisibilityChange, false)

}