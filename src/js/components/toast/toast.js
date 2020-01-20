import './toast.scss'

/**
 * @description Toast
 * 
 * @param {object}  params
 * @param {object}  params.settings
 * @param {object}  params.api
 * @param {object}  params.dom
 */

const toast = (params, opts) => {

  const {
    settings,
    api,
    dom
  } = params

  const {
    title,
    duration
  } = opts

  const wrapper = dom.wrapper
  const eleWrapper = document.createElement('div')
  const ele = document.createElement('div')
  eleWrapper.appendChild(ele)

  eleWrapper.classList.add(Enums.className.toastWrapper)
  ele.classList.add(Enums.className.toast)
  ele.innerHTML = title

  wrapper.appendChild(eleWrapper)

  ele.addEventListener('transitionend', e => {
    eleWrapper.remove()
  })

  setTimeout(_ => {
    ele.classList.add('hide')
  }, duration || 1500)

}

export default toast