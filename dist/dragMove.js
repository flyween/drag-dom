(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.dragMove = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Drag = /*#__PURE__*/function () {
    function Drag(el) {
      _classCallCheck(this, Drag);

      this.$el = el;
      this.attachEve();
      this.initialed = false;
      this.canMove = false;
      this.initSpace = {
        initialX: 0,
        initialY: 0,
        newX: 0,
        newY: 0,
        spaceX: 0,
        spaceY: 0
      };
      this.mousePos = {
        x: 0,
        y: 0
      };
    }

    _createClass(Drag, [{
      key: "attachEve",
      value: function attachEve() {
        var _this = this;

        this.$el.addEventListener('mousedown', function (e) {
          _this.canMove = true;

          _this.initMove(e);
        });
        this.$el.addEventListener('touchstart', function (e) {
          _this.canMove = true;

          _this.initMove(e);
        });
        document.body.addEventListener('mouseup', function () {
          _this.canMove = false;
          _this.initialed = true;
        });
        this.$el.addEventListener('touchend', function () {
          _this.canMove = false;
          _this.initialed = true;
        });
        document.body.addEventListener('mousemove', function (e) {
          if (_this.canMove) {
            _this.move(e);
          }
        });
        document.body.addEventListener('touchmove', function (e) {
          if (_this.canMove) {
            _this.move(e);
          }
        }, {
          passive: false
        });
      }
    }, {
      key: "initMove",
      value: function initMove(e) {
        var offsetX = 'touches' in e ? e.touches[0].clientX - e.target.getBoundingClientRect().x : e.offsetX;
        var offsetY = 'touches' in e ? e.touches[0].clientY - e.target.getBoundingClientRect().y : e.offsetY;

        if (this.initialed) {
          this.initSpace.newX = offsetX;
          this.initSpace.newY = offsetY;
          this.initSpace.spaceX = this.initSpace.newX - this.initSpace.initialX;
          this.initSpace.spaceY = this.initSpace.newY - this.initSpace.initialY;
        } else {
          this.mousePos.x = 'touches' in e ? e.touches[0].clientX : e.clientX;
          this.mousePos.y = 'touches' in e ? e.touches[0].clientY : e.clientY;
          this.initSpace.initialX = offsetX;
          this.initSpace.initialY = offsetY;
        }
      }
    }, {
      key: "move",
      value: function move(e) {
        var L = 'touches' in e ? e.touches[0].clientX : e.clientX;
        var T = 'touches' in e ? e.touches[0].clientY : e.clientY;
        this.$el.style.transform = "translate(".concat(L - this.mousePos.x - this.initSpace.spaceX, "px, ").concat(T - this.mousePos.y - this.initSpace.spaceY, "px)");
        e.preventDefault();
      }
    }]);

    return Drag;
  }();

  return Drag;

})));
