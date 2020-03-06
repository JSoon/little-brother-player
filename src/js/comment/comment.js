/**
 * @description Live comment API
 */
class Comment {
  constructor(params) {
    const {
      settings,
      dom,
      api
    } = params

    const _this = this
    this.settings = settings
    this.dom = dom
    this.api = api
    this.posArr = []
    this.threshold = 500 // The max number of reused comment items
    this.currentItemIdx = 0 // Current index of reused comment items
    this.interval = 200 // Interval between last comment item
    this.clientChanged = true // If the size of area client has changed
    this.currentSize = {
      clientWidth: 0,
      clientHeight: 0,
      lineHeight: 0,
      lineNumber: 0
    }

    window.addEventListener('resize', e => {
      _this.clientChanged = true
    })
  }

  add(params) {
    const area = this.dom.commentArea
    const items = area.children // Pre-build comment items

    if (!area || !this.api.getCurrentSrc()) {
      return
    }

    const {
      html,
      style = {
        color: '#fff',
        fontSize: '12px'
      },
      speed = 5000,
    } = params

    // Cache area size
    if (this.clientChanged) {
      this.currentSize = {
        clientWidth: area.clientWidth,
        clientHeight: area.clientHeight
      }

      this.clientChanged = false
    }

    // Calculate the number of line of comments as per the current height of commentArea dynamically
    const areaWidth = this.currentSize.clientWidth
    const areaHeight = this.currentSize.clientHeight
    const lineHeight = parseInt(style.fontSize) * 1
    const lineNumber = Math.floor(areaHeight / lineHeight)
    // console.log('lineNumber', lineNumber);

    // When the length of posArr equals to 0, it shows that the comments have already covered all the lines of the area,
    // then we could just start over again.
    if (this.posArr.length === 0) {
      for (let i = 0; i < lineNumber; i += 1) {
        this.posArr.push(i) // Set the line index into posArr
      }
    }

    // Get the line and delete it from posArr
    const randomPos = Utils.random.randomInt(this.posArr.length - 1)
    const lineIdx = this.posArr[randomPos]
    const top = lineIdx * lineHeight // Comment item top position
    // console.log('this.posArr.length', this.posArr.length);
    // console.log('lineIdx', lineIdx);

    // Set duration according to lineNumber


    // Initial comment item
    if (this.currentItemIdx > this.threshold - 1) { // currentItemIdx starts from 0
      this.currentItemIdx = 0
    }
    const item = items[this.currentItemIdx]
    this.currentItemIdx += 1
    item.innerHTML = html
    // Apply styles on item
    Object.entries(style).forEach(([key, value]) => {
      item.style[key] = value
    })
    // After step of JS, recalculate the width of item
    const transWidth = areaWidth * 2
    item.style.top = `${top}px`
    item.style.transform = `translate3d(-${transWidth}px, 0, 0)`
    item.style.transitionDuration = `${speed}ms`
    item.style.transitionDelay = `${(lineNumber - this.posArr.length) * this.interval}ms`
    item.style.transitionProperty = `transform`
    item.style.transitionTimingFunction = `linear`

    // Delete the used lineIdx
    this.posArr.splice(randomPos, 1)
  }
}

export default Comment