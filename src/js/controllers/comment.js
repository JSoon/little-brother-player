/**
 * @description Live comment
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const ctrlEle = document.createElement('div')
  dom.controllername = ctrlEle
  dom.ctrls.left.appendChild(ctrlEle)
  ctrlEle.classList.add(Enums.className.controllername)

  return ctrlEle
}