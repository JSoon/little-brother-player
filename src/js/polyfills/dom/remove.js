/**
 * @description Element.prototype.remove
 * @compatibility IE9+
 */

// polyfill remove any elem in DOM 
if (!Element.prototype.remove) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this)
    }
  }
}