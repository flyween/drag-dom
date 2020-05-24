class Drag {
    constructor(el) {
      this.$el = el
      this.attachEve()
      this.initialed = false
      this.canMove = false
      this.initSpace = {
        initialX: 0,
        initialY: 0,
        newX: 0,
        newY: 0,
        spaceX: 0,
        spaceY: 0
      }
      this.mousePos = {
        x: 0,
        y: 0
      }
    }
    attachEve() {
      this.$el.addEventListener('mousedown', e => {
        this.canMove = true
        this.initMove(e)
      })
      this.$el.addEventListener('touchstart', e => {
        this.canMove = true
        this.initMove(e)
      })
      document.body.addEventListener('mouseup', () => {
        this.canMove = false
        this.initialed = true
      })
      this.$el.addEventListener('touchend', () => {
        this.canMove = false
        this.initialed = true
      })
      document.body.addEventListener('mousemove', e => {
        if (this.canMove) {
          this.move(e)
        }
      })
      document.body.addEventListener(
        'touchmove',
        e => {
          if (this.canMove) {
            this.move(e)
          }
        },
        {
          passive: false
        }
      )
    }
    initMove(e) {
      var offsetX =
        'touches' in e
          ? e.touches[0].clientX - e.target.getBoundingClientRect().x
          : e.offsetX
      var offsetY =
        'touches' in e
          ? e.touches[0].clientY - e.target.getBoundingClientRect().y
          : e.offsetY
      if (this.initialed) {
        this.initSpace.newX = offsetX
        this.initSpace.newY = offsetY
        this.initSpace.spaceX = this.initSpace.newX - this.initSpace.initialX
        this.initSpace.spaceY = this.initSpace.newY - this.initSpace.initialY
      } else {
        this.mousePos.x = 'touches' in e ? e.touches[0].clientX : e.clientX
        this.mousePos.y = 'touches' in e ? e.touches[0].clientY : e.clientY
        this.initSpace.initialX = offsetX
        this.initSpace.initialY = offsetY
      }
    }
    move(e) {
      var L = 'touches' in e ? e.touches[0].clientX : e.clientX
      var T = 'touches' in e ? e.touches[0].clientY : e.clientY
  
      this.$el.style.transform = `translate(${L -
        this.mousePos.x -
        this.initSpace.spaceX}px, ${T -
        this.mousePos.y -
        this.initSpace.spaceY}px)`
  
      e.preventDefault()
    }
  }
  
  export default Drag
  