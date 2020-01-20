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
  dom.loading = ele

  eleWrapper.classList.add(Enums.className.loadingWrapper)
  ele.classList.add(Enums.className.loading)
  ele.innerHTML = Enums.i18n[settings.i18n].loading

  ele.addEventListener('transitionend', e => {
    eleWrapper.style.display = 'none'
  })

  const start = () => {
    ele.classList.remove('hide')
    // Singleton for loading
    if (wrapper.contains(eleWrapper)) {
      eleWrapper.style.display = 'block'
      return
    }
    wrapper.appendChild(eleWrapper)
  }

  const end = () => {
    ele.classList.add('hide')
  }

  return {
    start,
    end
  }
}

export default loading