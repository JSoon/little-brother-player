/**
 * @description uiname
 * 
 * @param {object}  params
 */

export default (params) => {
  const {
    settings,
    api,
    dom
  } = params

  const uiname = document.createElement('div')
  dom.uiname = uiname
  dom.ui.appendChild(uiname)
  
  uiname.innerHTML = Enums.i18n[settings.i18n].uiname
  uiname.classList.add(Enums.className.uiname)

  return uiname
}