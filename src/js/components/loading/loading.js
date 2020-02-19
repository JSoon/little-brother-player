import './loading.scss'

/**
 * @description Loading
 */

const loading = (() => {

  const eleWrapper = document.createElement('div')
  const ele = document.createElement('div')
  eleWrapper.appendChild(ele)

  ele.addEventListener('transitionend', e => {
    eleWrapper.style.display = 'none'
  })

  const start = () => {
    const {
      dom,
      settings
    } = Global

    const wrapper = dom.wrapper
    dom.loading = ele

    eleWrapper.classList.add(Enums.className.loadingWrapper)
    ele.classList.add(Enums.className.loading)
    ele.innerHTML = Enums.i18n[settings.i18n].loading

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
})()

export default loading