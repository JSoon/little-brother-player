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
    commentArea.appendChild(commentItem)
  }

  // Reset transition after the end of animation of comment item
  commentArea.addEventListener('transitionend', e => {
    console.log(e.target.getAttribute('class') === Enums.className.commentItem);
    if (e.target.getAttribute('class') !== Enums.className.commentItem) {
      return
    }
    e.target.style.transition = `none` // Reset transition duration
    e.target.style.transform = `none` // Reset transform style
  })

  dom.ui.appendChild(commentArea)

  return commentArea
}