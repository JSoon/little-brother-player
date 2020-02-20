const enterpip = new CustomEvent('enterpip')
const exitpip = new CustomEvent('exitpip')
const enterfullscreen = new CustomEvent('enterfullscreen')
const exitfullscreen = new CustomEvent('exitfullscreen')
const enterfullpage = new CustomEvent('enterfullpage')
const exitfullpage = new CustomEvent('exitfullpage')

export {
  enterpip,
  exitpip,
  enterfullscreen,
  exitfullscreen,
  enterfullpage,
  exitfullpage
}