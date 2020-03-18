/**
 * @description Live comment
 * 
 * @param {object}  params
 */

import Comment from '~/js/comment/comment'

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const ctrlEle = document.createElement('div')
  // dom.controllername = ctrlEle
  // dom.ctrls.left.appendChild(ctrlEle)
  // ctrlEle.classList.add(Enums.className.controllername)

  api.comment = new Comment(params)

  return ctrlEle
}