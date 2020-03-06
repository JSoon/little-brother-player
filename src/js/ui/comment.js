/**
 * @description Live comment area
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const commentArea = document.createElement('div')
  commentArea.classList.add(Enums.className.commentArea)
  dom.commentArea = commentArea

  // Prebuild serval number of items for reducing javascript & recalculating style time
  const cacheNumber = 500
  for (let i = 0; i < cacheNumber; i += 1) {
    const commentItem = document.createElement('div')
    commentItem.classList.add(Enums.className.commentItem)
    // Reset transition after the end of animation
    commentItem.addEventListener('transitionend', e => {
      commentItem.style.transition = `none` // Reset transition duration
      commentItem.style.transform = `none` // Reset transform style
    })
    commentArea.appendChild(commentItem)
  }

  dom.ui.appendChild(commentArea)

  return commentArea
}