import './loading.scss'

/**
 * @description Loading
 * 
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.dom
 */

const loading = params => {

  const {
    settings,
    api,
    dom
  } = params

  const wrapper = dom.wrapper
  const eleWrapper = document.createElement('div')
  const ele = document.createElement('div')
  eleWrapper.appendChild(ele)

  eleWrapper.classList.add(Enums.className.loadingWrapper)
  ele.classList.add(Enums.className.loading)
  ele.innerHTML = Enums.i18n[settings.i18n].loading

  const start = () => {
    if (wrapper.contains(eleWrapper)) {
      eleWrapper.style.display = 'block'
      return
    }
    wrapper.appendChild(eleWrapper)
  }

  const end = () => {
    eleWrapper.style.display = 'none'
  }

  return {
    start,
    end
  }
}

export default loading