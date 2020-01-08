/**
 * @description controllername
 * Note: api hasn't been initialized yet here, so if you wanna access to a method or listen to an event,
 * better access dom.video to invoke it. Or you may get an error.
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