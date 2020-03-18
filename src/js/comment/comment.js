/**
 * @description Live comment API
 */
class Comment {
  constructor(params) {
    const {
      settings,
      dom,
      api,
      style = {
        color: '#fff',
        fontSize: '12px'
      },
      speed = 5000
    } = params

    this.settings = settings
    this.dom = dom
    this.api = api
    this.style = style
    this.speed = speed
    this.posArr = []
    this.threshold = 500 // The max number of reused comment items
    this.currentItemIdx = 0 // Current index of reused comment items

    // Update area styles while window resized. Normally this is caused by enter/exit fullscreen.
    // If the size of video player area is changed, e.g entering theater mode or page fullscreen,
    // we also need to invoke updateArea() manually. 
    // window.addEventListener('resize', e => {
    //   this.updateArea()
    // })

    this.init()
  }

  init() {
    this.updateArea()
  }

  // Update comment area styles
  updateArea() {
    const area = this.dom.commentArea
    this.areaWidth = area.clientWidth
    this.areaHeight = area.clientHeight
    this.lineHeight = parseInt(this.style.fontSize) * 1
    this.lineNumber = Math.floor(this.areaHeight / this.lineHeight)

    this.updateComments()
  }

  // Update comment items positions
  updateComments() {

    const area = this.dom.commentArea
    const items = area.children // Pre-build comment items

    // Calculate the number of line of comments as per the current height of commentArea dynamically
    const areaWidth = this.areaWidth
    const areaHeight = this.areaHeight
    const lineHeight = this.lineHeight
    const lineNumber = this.lineNumber
    // console.log('lineNumber', lineNumber);

    for (let idx = 0; idx < this.threshold; idx += 1) {
      let comment = items[idx]

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
      // console.log('this.posArr.length', this.posArr.length);
      // console.log('lineIdx', lineIdx);

      const top = lineIdx * lineHeight // Comment item top position
      comment.style.top = `${top}px`

      // Delete the used lineIdx
      this.posArr.splice(randomPos, 1)
    }

  }

  // Update common comment style
  updateStyle(style) {
    this.style = style
  }

  // Add comment into comment area
  add(params) {
    const area = this.dom.commentArea
    const items = area.children // Pre-build comment items

    if (!area || !this.api.getCurrentSrc()) {
      return
    }

    const {
      html,
      style = this.style,
      speed = this.speed
    } = params

    // Get current comment reference
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
    const transWidth = this.areaWidth * 2
    item.style.transform = `translate3d(-${transWidth}px, 0, 0)`
    item.style.transitionDuration = `${speed}ms`
    item.style.transitionDelay = `${Utils.random.randomInt(1, speed)}ms`
    item.style.transitionProperty = `transform`
    item.style.transitionTimingFunction = `linear`

  }
}

export default Comment