/**
 * @description Copy text to clipboard via execCommand
 * 
 * Note: This feature is obsolete. Although it may still work in some browsers,
 * its use is discouraged since it could be removed at any time by Clipboard_API
 */

export default (copyText) => {

  const copyInput = document.createElement('input')
  document.body.appendChild(copyInput)
  copyInput.setAttribute('type', 'text')
  copyInput.setAttribute('value', copyText)
  copyInput.select()
  document.execCommand('copy')
  copyInput.remove()

}