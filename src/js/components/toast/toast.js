import './toast.scss'

/**
 * @description Toast
 * 
 * @param {object}  opts
 * @param {object}  opts.title    Text
 * @param {object}  opts.duration Duration time, default to 1500ms
 */

const toast = opts => {

  const {
    dom
  } = Global
  const {
    title,
    duration
  } = opts

  const wrapper = dom.wrapper
  const ele = document.createElement('div')
  ele.classList.add(Enums.className.toast)
  ele.innerHTML = title

  wrapper.appendChild(ele)

  ele.addEventListener('transitionend', e => {
    ele.remove()
  })

  setTimeout(_ => {
    ele.classList.add('hide')
  }, duration || 1500)

}

export default toast