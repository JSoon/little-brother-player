/**
 * @description Get url parameter by name
 * 
 * You can use URLSearchParams which is simple and has decent (but not complete) browser support.
 * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility
 */

export default (name, url) => {

  if (!url) url = window.location.href
  // Escape [ to \[, ] to \] for using in RegExp constructor avoiding messing up with Regexp Class
  name = name.replace(/[\[\]]/g, '\\$&')

  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))

}