/**
 * @description controllername
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
  
  ctrlEle.classList.add(Enums.className.controllername)

  return ctrlEle
}