/**
 * @description Fullpage mode
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
  dom.fullpage = ctrlEle
  dom.ctrls.right.appendChild(ctrlEle)

  ctrlEle.innerHTML = Enums.i18n[settings.i18n].fullpage
  ctrlEle.classList.add(Enums.className.fullpage)

  const tooltip = Coms.tooltip({
    selector: ctrlEle,
    title: Enums.i18n[settings.i18n].fullpageEnterTitle,
    container: dom.wrapper
  })

  const toggleFullpage = api.toggleFullpage.bind(ctrlEle)
  ctrlEle.addEventListener('click', toggleFullpage)

  api.on('enterfullpage', _ => {
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].fullpageExitTitle)
  })

  api.on('exitfullpage', _ => {
    tooltip.updateTooltipTitle(Enums.i18n[settings.i18n].fullpageEnterTitle)
  })

  return ctrlEle
}