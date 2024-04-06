/*eslint-disable */
/**
 * app.core.js v###version###
 */



/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
import $ from './jquery.js';
window.jQuery = $;
window.$ = $;
var Tab = function ($$$1) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'tab';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
        previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $$$1.Event(Event.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $$$1.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $$$1(previous).trigger(hideEvent);
      }

      $$$1(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $$$1(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $$$1.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: previous
        });
        $$$1(previous).trigger(hiddenEvent);
        $$$1(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $$$1.removeData(this._element, DATA_KEY);
      this._element = null;
    }; // Private


    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements;

      if (container.nodeName === 'UL') {
        activeElements = $$$1(container).find(Selector.ACTIVE_UL);
      } else {
        activeElements = $$$1(container).children(Selector.ACTIVE);
      }

      var active = activeElements[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $$$1(active).hasClass(ClassName.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
        var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $$$1(element).addClass(ClassName.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);
      $$$1(element).addClass(ClassName.SHOW);

      if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
        var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

        if (dropdownElement) {
          $$$1(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }; // Static


    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $$$1(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($$$1(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $$$1.fn[NAME] = Tab._jQueryInterface;
  $$$1.fn[NAME].Constructor = Tab;

  $$$1.fn[NAME].noConflict = function () {
    $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}($);




  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
      (function ($) {
        'use strict';
        function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        var Collapse = function ($) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'collapse';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.collapse';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 600;
        var Default = {
          toggle: true,
          parent: ''
        };
        var DefaultType = {
          toggle: 'boolean',
          parent: '(string|element)'
        };
        var Event = {
          SHOW: "show" + EVENT_KEY,
          SHOWN: "shown" + EVENT_KEY,
          HIDE: "hide" + EVENT_KEY,
          HIDDEN: "hidden" + EVENT_KEY,
          CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
          SHOW: 'show',
          COLLAPSE: 'collapse',
          COLLAPSING: 'collapsing',
          COLLAPSED: 'collapsed'
        };
        var Dimension = {
          WIDTH: 'width',
          HEIGHT: 'height'
        };
        var Selector = {
          ACTIVES: '.show, .collapsing',
          DATA_TOGGLE: '[data-toggle="collapse"]'
          /**
           * ------------------------------------------------------------------------
           * Class Definition
           * ------------------------------------------------------------------------
           */

        };

        var Collapse =
        /*#__PURE__*/
        function () {
          function Collapse(element, config) {
            this._isTransitioning = false;
            this._element = element;
            this._config = this._getConfig(config);
            this._triggerArray = $.makeArray($("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
            var tabToggles = $(Selector.DATA_TOGGLE);

            for (var i = 0; i < tabToggles.length; i++) {
              var elem = tabToggles[i];
              var selector = Util.getSelectorFromElement(elem);

              if (selector !== null && $(selector).filter(element).length > 0) {
                this._selector = selector;

                this._triggerArray.push(elem);
              }
            }

            this._parent = this._config.parent ? this._getParent() : null;

            if (!this._config.parent) {
              this._addAriaAndCollapsedClass(this._element, this._triggerArray);
            }

            if (this._config.toggle) {
              this.toggle();
            }
          } // Getters


          var _proto = Collapse.prototype;

          // Public
          _proto.toggle = function toggle() {
            if ($(this._element).hasClass(ClassName.SHOW)) {
              this.hide();
            } else {
              this.show();
            }
          };

          _proto.show = function show() {
            var _this = this;

            if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
              return;
            }

            var actives;
            var activesData;

            if (this._parent) {
              actives = $.makeArray($(this._parent).find(Selector.ACTIVES).filter("[data-parent=\"" + this._config.parent + "\"]"));

              if (actives.length === 0) {
                actives = null;
              }
            }

            if (actives) {
              activesData = $(actives).not(this._selector).data(DATA_KEY);

              if (activesData && activesData._isTransitioning) {
                return;
              }
            }

            var startEvent = $.Event(Event.SHOW);
            $(this._element).trigger(startEvent);

            if (startEvent.isDefaultPrevented()) {
              return;
            }

            if (actives) {
              Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

              if (!activesData) {
                $(actives).data(DATA_KEY, null);
              }
            }

            var dimension = this._getDimension();

            $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
            this._element.style[dimension] = 0;

            if (this._triggerArray.length > 0) {
              $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
            }

            this.setTransitioning(true);

            var complete = function complete() {
              $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
              _this._element.style[dimension] = '';

              _this.setTransitioning(false);

              $(_this._element).trigger(Event.SHOWN);
            };

            if (!Util.supportsTransitionEnd()) {
              complete();
              return;
            }

            var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            var scrollSize = "scroll" + capitalizedDimension;
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
            this._element.style[dimension] = this._element[scrollSize] + "px";
          };

          _proto.hide = function hide() {
            var _this2 = this;

            if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
              return;
            }

            var startEvent = $.Event(Event.HIDE);
            $(this._element).trigger(startEvent);

            if (startEvent.isDefaultPrevented()) {
              return;
            }

            var dimension = this._getDimension();

            this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
            Util.reflow(this._element);
            $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

            if (this._triggerArray.length > 0) {
              for (var i = 0; i < this._triggerArray.length; i++) {
                var trigger = this._triggerArray[i];
                var selector = Util.getSelectorFromElement(trigger);

                if (selector !== null) {
                  var $elem = $(selector);

                  if (!$elem.hasClass(ClassName.SHOW)) {
                    $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
                  }
                }
              }
            }

            this.setTransitioning(true);

            var complete = function complete() {
              _this2.setTransitioning(false);

              $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
            };

            this._element.style[dimension] = '';

            if (!Util.supportsTransitionEnd()) {
              complete();
              return;
            }

            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
          };

          _proto.setTransitioning = function setTransitioning(isTransitioning) {
            this._isTransitioning = isTransitioning;
          };

          _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            this._config = null;
            this._parent = null;
            this._element = null;
            this._triggerArray = null;
            this._isTransitioning = null;
          }; // Private


          _proto._getConfig = function _getConfig(config) {
            config = _extends({}, Default, config);
            config.toggle = Boolean(config.toggle); // Coerce string values

            Util.typeCheckConfig(NAME, config, DefaultType);
            return config;
          };

          _proto._getDimension = function _getDimension() {
            var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
            return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
          };

          _proto._getParent = function _getParent() {
            var _this3 = this;

            var parent = null;

            if (Util.isElement(this._config.parent)) {
              parent = this._config.parent; // It's a jQuery object

              if (typeof this._config.parent.jquery !== 'undefined') {
                parent = this._config.parent[0];
              }
            } else {
              parent = $(this._config.parent)[0];
            }

            var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
            $(parent).find(selector).each(function (i, element) {
              _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
            });
            return parent;
          };

          _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
            if (element) {
              var isOpen = $(element).hasClass(ClassName.SHOW);

              if (triggerArray.length > 0) {
                $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
              }
            }
          }; // Static


          Collapse._getTargetFromElement = function _getTargetFromElement(element) {
            var selector = Util.getSelectorFromElement(element);
            return selector ? $(selector)[0] : null;
          };

          Collapse._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
              var $this = $(this);
              var data = $this.data(DATA_KEY);

              var _config = _extends({}, Default, $this.data(), typeof config === 'object' && config);

              if (!data && _config.toggle && /show|hide/.test(config)) {
                _config.toggle = false;
              }

              if (!data) {
                data = new Collapse(this, _config);
                $this.data(DATA_KEY, data);
              }

              if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                  throw new TypeError("No method named \"" + config + "\"");
                }

                data[config]();
              }
            });
          };

          _createClass(Collapse, null, [{
            key: "VERSION",
            get: function get() {
              return VERSION;
            }
          }, {
            key: "Default",
            get: function get() {
              return Default;
            }
          }]);

          return Collapse;
        }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
          // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
          if (event.currentTarget.tagName === 'A') {
            event.preventDefault();
          }

          var $trigger = $(this);
          var selector = Util.getSelectorFromElement(this);
          $(selector).each(function () {
            var $target = $(this);
            var data = $target.data(DATA_KEY);
            var config = data ? 'toggle' : $trigger.data();

            Collapse._jQueryInterface.call($target, config);
          });
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Collapse._jQueryInterface;
        $.fn[NAME].Constructor = Collapse;

        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Collapse._jQueryInterface;
        };

        return Collapse;
        }($);

      })($);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0): common functions
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */
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

      function _extends() {
        _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends.apply(this, arguments);
      }

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }
      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0): util.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Util = function ($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Private TransitionEnd Helpers
         * ------------------------------------------------------------------------
         */
        var transition = false;
        var MAX_UID = 1000000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

        function toType(obj) {
          return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        function getSpecialTransitionEndEvent() {
          return {
            bindType: transition.end,
            delegateType: transition.end,
            handle: function handle(event) {
              if ($$$1(event.target).is(this)) {
                return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
              }

              return undefined; // eslint-disable-line no-undefined
            }
          };
        }

        function transitionEndTest() {
          if (typeof window !== 'undefined' && window.QUnit) {
            return false;
          }

          return {
            end: 'transitionend'
          };
        }

        function transitionEndEmulator(duration) {
          var _this = this;

          var called = false;
          $$$1(this).one(Util.TRANSITION_END, function () {
            called = true;
          });
          setTimeout(function () {
            if (!called) {
              Util.triggerTransitionEnd(_this);
            }
          }, duration);
          return this;
        }

        function setTransitionEndSupport() {
          transition = transitionEndTest();
          $$$1.fn.emulateTransitionEnd = transitionEndEmulator;

          if (Util.supportsTransitionEnd()) {
            $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
          }
        }

        function escapeId(selector) {
          // We escape IDs in case of special selectors (selector = '#myId:something')
          // $.escapeSelector does not exist in jQuery < 3
          selector = typeof $$$1.escapeSelector === 'function' ? $$$1.escapeSelector(selector).substr(1) : selector.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1');
          return selector;
        }
        /**
         * --------------------------------------------------------------------------
         * Public Util Api
         * --------------------------------------------------------------------------
         */


        var Util = {
          TRANSITION_END: 'bsTransitionEnd',
          getUID: function getUID(prefix) {
            do {
              // eslint-disable-next-line no-bitwise
              prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
            } while (document.getElementById(prefix));

            return prefix;
          },
          getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute('data-target');

            if (!selector || selector === '#') {
              selector = element.getAttribute('href') || '';
            } // If it's an ID


            if (selector.charAt(0) === '#') {
              selector = escapeId(selector);
            }

            try {
              var $selector = $$$1(document).find(selector);
              return $selector.length > 0 ? selector : null;
            } catch (err) {
              return null;
            }
          },
          reflow: function reflow(element) {
            return element.offsetHeight;
          },
          triggerTransitionEnd: function triggerTransitionEnd(element) {
            $$$1(element).trigger(transition.end);
          },
          supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(transition);
          },
          isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
          },
          typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
              if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                var expectedTypes = configTypes[property];
                var value = config[property];
                var valueType = value && Util.isElement(value) ? 'element' : toType(value);

                if (!new RegExp(expectedTypes).test(valueType)) {
                  throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                }
              }
            }
          }
        };
        setTransitionEndSupport();
        return Util;
      }($);
      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0): modal.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Modal = function ($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'modal';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.modal';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var TRANSITION_DURATION = 300;
        var BACKDROP_TRANSITION_DURATION = 150;
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

        var Default = {
          backdrop: true,
          keyboard: true,
          focus: true,
          show: true
        };
        var DefaultType = {
          backdrop: '(boolean|string)',
          keyboard: 'boolean',
          focus: 'boolean',
          show: 'boolean'
        };
        var Event = {
          HIDE: "hide" + EVENT_KEY,
          HIDDEN: "hidden" + EVENT_KEY,
          SHOW: "show" + EVENT_KEY,
          SHOWN: "shown" + EVENT_KEY,
          FOCUSIN: "focusin" + EVENT_KEY,
          RESIZE: "resize" + EVENT_KEY,
          CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
          KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
          MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
          MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
          CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
          SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
          BACKDROP: 'modal-backdrop',
          OPEN: 'modal-open',
          FADE: 'fade',
          SHOW: 'show'
        };
        var Selector = {
          DIALOG: '.modal-dialog',
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
          STICKY_CONTENT: '.sticky-top',
          NAVBAR_TOGGLER: '.navbar-toggler'
          /**
           * ------------------------------------------------------------------------
           * Class Definition
           * ------------------------------------------------------------------------
           */

        };

        var Modal =
        /*#__PURE__*/
        function () {
          function Modal(element, config) {
            this._config = this._getConfig(config);
            this._element = element;
            this._dialog = $$$1(element).find(Selector.DIALOG)[0];
            this._backdrop = null;
            this._isShown = false;
            this._isBodyOverflowing = false;
            this._ignoreBackdropClick = false;
            this._originalBodyPadding = 0;
            this._scrollbarWidth = 0;
          } // Getters


          var _proto = Modal.prototype;

          // Public
          _proto.toggle = function toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
          };

          _proto.show = function show(relatedTarget) {
            var _this = this;

            if (this._isTransitioning || this._isShown) {
              return;
            }

            if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) {
              this._isTransitioning = true;
            }

            var showEvent = $$$1.Event(Event.SHOW, {
              relatedTarget: relatedTarget
            });
            $$$1(this._element).trigger(showEvent);

            if (this._isShown || showEvent.isDefaultPrevented()) {
              return;
            }

            this._isShown = true;

            this._checkScrollbar();

            this._setScrollbar();

            this._adjustDialog();

            $$$1(document.body).addClass(ClassName.OPEN);

            this._setEscapeEvent();

            this._setResizeEvent();

            $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
              return _this.hide(event);
            });
            $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
              $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
                if ($$$1(event.target).is(_this._element)) {
                  _this._ignoreBackdropClick = true;
                }
              });
            });

            this._showBackdrop(function () {
              return _this._showElement(relatedTarget);
            });
          };

          _proto.hide = function hide(event) {
            var _this2 = this;

            if (event) {
              event.preventDefault();
            }

            if (this._isTransitioning || !this._isShown) {
              return;
            }

            var hideEvent = $$$1.Event(Event.HIDE);
            $$$1(this._element).trigger(hideEvent);

            if (!this._isShown || hideEvent.isDefaultPrevented()) {
              return;
            }

            this._isShown = false;
            var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

            if (transition) {
              this._isTransitioning = true;
            }

            this._setEscapeEvent();

            this._setResizeEvent();

            $$$1(document).off(Event.FOCUSIN);
            $$$1(this._element).removeClass(ClassName.SHOW);
            $$$1(this._element).off(Event.CLICK_DISMISS);
            $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

            if (transition) {
              $$$1(this._element).one(Util.TRANSITION_END, function (event) {
                return _this2._hideModal(event);
              }).emulateTransitionEnd(TRANSITION_DURATION);
            } else {
              this._hideModal();
            }
          };

          _proto.dispose = function dispose() {
            $$$1.removeData(this._element, DATA_KEY);
            $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
            this._config = null;
            this._element = null;
            this._dialog = null;
            this._backdrop = null;
            this._isShown = null;
            this._isBodyOverflowing = null;
            this._ignoreBackdropClick = null;
            this._scrollbarWidth = null;
          };

          _proto.handleUpdate = function handleUpdate() {
            this._adjustDialog();
          }; // Private


          _proto._getConfig = function _getConfig(config) {
            config = _extends({}, Default, config);
            Util.typeCheckConfig(NAME, config, DefaultType);
            return config;
          };

          _proto._showElement = function _showElement(relatedTarget) {
            var _this3 = this;

            var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
              // Don't move modal's DOM position
              document.body.appendChild(this._element);
            }

            this._element.style.display = 'block';

            this._element.removeAttribute('aria-hidden');

            this._element.scrollTop = 0;

            if (transition) {
              Util.reflow(this._element);
            }

            $$$1(this._element).addClass(ClassName.SHOW);

            if (this._config.focus) {
              this._enforceFocus();
            }

            var shownEvent = $$$1.Event(Event.SHOWN, {
              relatedTarget: relatedTarget
            });

            var transitionComplete = function transitionComplete() {
              if (_this3._config.focus) {
                _this3._element.focus();
              }

              _this3._isTransitioning = false;
              $$$1(_this3._element).trigger(shownEvent);
            };

            if (transition) {
              $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
            } else {
              transitionComplete();
            }
          };

          _proto._enforceFocus = function _enforceFocus() {
            var _this4 = this;

            $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
            .on(Event.FOCUSIN, function (event) {
              if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
                _this4._element.focus();
              }
            });
          };

          _proto._setEscapeEvent = function _setEscapeEvent() {
            var _this5 = this;

            if (this._isShown && this._config.keyboard) {
              $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
                if (event.which === ESCAPE_KEYCODE) {
                  event.preventDefault();

                  _this5.hide();
                }
              });
            } else if (!this._isShown) {
              $$$1(this._element).off(Event.KEYDOWN_DISMISS);
            }
          };

          _proto._setResizeEvent = function _setResizeEvent() {
            var _this6 = this;

            if (this._isShown) {
              $$$1(window).on(Event.RESIZE, function (event) {
                return _this6.handleUpdate(event);
              });
            } else {
              $$$1(window).off(Event.RESIZE);
            }
          };

          _proto._hideModal = function _hideModal() {
            var _this7 = this;

            this._element.style.display = 'none';

            this._element.setAttribute('aria-hidden', true);

            this._isTransitioning = false;

            this._showBackdrop(function () {
              $$$1(document.body).removeClass(ClassName.OPEN);

              _this7._resetAdjustments();

              _this7._resetScrollbar();

              $$$1(_this7._element).trigger(Event.HIDDEN);
            });
          };

          _proto._removeBackdrop = function _removeBackdrop() {
            if (this._backdrop) {
              $$$1(this._backdrop).remove();
              this._backdrop = null;
            }
          };

          _proto._showBackdrop = function _showBackdrop(callback) {
            var _this8 = this;

            var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

            if (this._isShown && this._config.backdrop) {
              var doAnimate = Util.supportsTransitionEnd() && animate;
              this._backdrop = document.createElement('div');
              this._backdrop.className = ClassName.BACKDROP;

              if (animate) {
                $$$1(this._backdrop).addClass(animate);
              }

              $$$1(this._backdrop).appendTo(document.body);
              $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
                if (_this8._ignoreBackdropClick) {
                  _this8._ignoreBackdropClick = false;
                  return;
                }

                if (event.target !== event.currentTarget) {
                  return;
                }

                if (_this8._config.backdrop === 'static') {
                  _this8._element.focus();
                } else {
                  _this8.hide();
                }
              });

              if (doAnimate) {
                Util.reflow(this._backdrop);
              }

              $$$1(this._backdrop).addClass(ClassName.SHOW);

              if (!callback) {
                return;
              }

              if (!doAnimate) {
                callback();
                return;
              }

              $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
            } else if (!this._isShown && this._backdrop) {
              $$$1(this._backdrop).removeClass(ClassName.SHOW);

              var callbackRemove = function callbackRemove() {
                _this8._removeBackdrop();

                if (callback) {
                  callback();
                }
              };

              if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) {
                $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
              } else {
                callbackRemove();
              }
            } else if (callback) {
              callback();
            }
          }; // ----------------------------------------------------------------------
          // the following methods are used to handle overflowing modals
          // todo (fat): these should probably be refactored out of modal.js
          // ----------------------------------------------------------------------


          _proto._adjustDialog = function _adjustDialog() {
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

            if (!this._isBodyOverflowing && isModalOverflowing) {
              this._element.style.paddingLeft = this._scrollbarWidth + "px";
            }

            if (this._isBodyOverflowing && !isModalOverflowing) {
              this._element.style.paddingRight = this._scrollbarWidth + "px";
            }
          };

          _proto._resetAdjustments = function _resetAdjustments() {
            this._element.style.paddingLeft = '';
            this._element.style.paddingRight = '';
          };

          _proto._checkScrollbar = function _checkScrollbar() {
            var rect = document.body.getBoundingClientRect();
            this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
            this._scrollbarWidth = this._getScrollbarWidth();
          };

          _proto._setScrollbar = function _setScrollbar() {
            var _this9 = this;

            if (this._isBodyOverflowing) {
              // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
              //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
              // Adjust fixed content padding
              $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
                var actualPadding = $$$1(element)[0].style.paddingRight;
                var calculatedPadding = $$$1(element).css('padding-right');
                $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
              }); // Adjust sticky content margin

              $$$1(Selector.STICKY_CONTENT).each(function (index, element) {
                var actualMargin = $$$1(element)[0].style.marginRight;
                var calculatedMargin = $$$1(element).css('margin-right');
                $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
              }); // Adjust navbar-toggler margin

              $$$1(Selector.NAVBAR_TOGGLER).each(function (index, element) {
                var actualMargin = $$$1(element)[0].style.marginRight;
                var calculatedMargin = $$$1(element).css('margin-right');
                $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
              }); // Adjust body padding

              var actualPadding = document.body.style.paddingRight;
              var calculatedPadding = $$$1('body').css('padding-right');
              $$$1('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
            }
          };

          _proto._resetScrollbar = function _resetScrollbar() {
            // Restore fixed content padding
            $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
              var padding = $$$1(element).data('padding-right');

              if (typeof padding !== 'undefined') {
                $$$1(element).css('padding-right', padding).removeData('padding-right');
              }
            }); // Restore sticky content and navbar-toggler margin

            $$$1(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function (index, element) {
              var margin = $$$1(element).data('margin-right');

              if (typeof margin !== 'undefined') {
                $$$1(element).css('margin-right', margin).removeData('margin-right');
              }
            }); // Restore body padding

            var padding = $$$1('body').data('padding-right');

            if (typeof padding !== 'undefined') {
              $$$1('body').css('padding-right', padding).removeData('padding-right');
            }
          };

          _proto._getScrollbarWidth = function _getScrollbarWidth() {
            // thx d.walsh
            var scrollDiv = document.createElement('div');
            scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
            document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            return scrollbarWidth;
          }; // Static


          Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
            return this.each(function () {
              var data = $$$1(this).data(DATA_KEY);

              var _config = _extends({}, Modal.Default, $$$1(this).data(), typeof config === 'object' && config);

              if (!data) {
                data = new Modal(this, _config);
                $$$1(this).data(DATA_KEY, data);
              }

              if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                  throw new TypeError("No method named \"" + config + "\"");
                }

                data[config](relatedTarget);
              } else if (_config.show) {
                data.show(relatedTarget);
              }
            });
          };

          _createClass(Modal, null, [{
            key: "VERSION",
            get: function get() {
              return VERSION;
            }
          }, {
            key: "Default",
            get: function get() {
              return Default;
            }
          }]);
          return Modal;
        }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
          var _this10 = this;

          var target;
          var selector = Util.getSelectorFromElement(this);

          if (selector) {
            target = $$$1(selector)[0];
          }

          var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _extends({}, $$$1(target).data(), $$$1(this).data());

          if (this.tagName === 'A' || this.tagName === 'AREA') {
            event.preventDefault();
          }

          var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
            if (showEvent.isDefaultPrevented()) {
              // Only register focus restorer if modal will actually get shown
              return;
            }

            $target.one(Event.HIDDEN, function () {
              if ($$$1(_this10).is(':visible')) {
                _this10.focus();
              }
            });
          });

          Modal._jQueryInterface.call($$$1(target), config, this);
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Modal._jQueryInterface;
        $$$1.fn[NAME].Constructor = Modal;

        $$$1.fn[NAME].noConflict = function () {
          $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
          return Modal._jQueryInterface;
        };

        return Modal;
      }($);













      /*
       *  jQuery DOM Change - v0.0.1
       *  Simple jQuery plugin to add support for DOM change events.
       *  http://jqueryboilerplate.com
       *
       *  Made by Colby Rogness
       *  Under GNU GPL 2.0 License
       */
      (function () {
        var __bind = function (fn, me) {
          return function () {
            return fn.apply(me, arguments);
          };
        };

        (function ($, window) {

          if (window.MutationObserver == undefined && window.WebKitMutationObserver == undefined) {
            return false;
          }

          var DOMChangeEventHandler, defaults, eventName;
          eventName = 'domchange';
          defaults = {
            events: {
              attributes: true,
              children: true,
              characterData: true
            },
            descendents: true,
            recordPriorValues: {
              attributes: false,
              characterData: false
            },
            attributeFilter: null
          };
          DOMChangeEventHandler = (function () {
            function DOMChangeEventHandler(element, options) {
              this.element = element;
              this.callback = __bind(this.callback, this);
              this._eventName = eventName;
              this._defaults = defaults;
              this._options = options;
              this.options = $.extend({}, defaults, options);
              this.hook();
            }

            DOMChangeEventHandler.prototype.hook = function () {
              var MutationObserver;
              if (this.observer != null) {
                return;
              }
              MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
              this.observer = new MutationObserver(this.callback);
              return this.observer.observe(this.element, {
                childList: this.options.events.children,
                attributes: this.options.events.attributes,
                characterData: this.options.events.characterData,
                subtree: this.options.descendents,
                attributeOldValue: this.options.recordPriorValues.attributes,
                characterDataOldValue: this.options.recordPriorValues.characterDataOldValue
              });
            };

            DOMChangeEventHandler.prototype.unhook = function () {
              if (this.observer == null) {
                return;
              }
              this.observer.disconnect();
              return this.observer = null;
            };

            DOMChangeEventHandler.prototype.callback = function (changes) {
              return $(this.element).trigger('domchange', changes);
            };

            return DOMChangeEventHandler;

          })();
          return jQuery.event.special[eventName] = {
            add: function (params) {
              var element, handler, id, options;
              options = params.data;
              id = 'domchange_' + params.guid;
              element = this;
              handler = new DOMChangeEventHandler(element, options);
              return $.data(element, id, handler);
            },
            remove: function (params) {
              var element, handler, id;
              id = 'domchange_' + params.guid;
              element = this;
              handler = $.data(element, id);
              return handler.unhook();
            }
          };
        })(jQuery, window);

      }).call(this);


      /**
       * video-full-bleed-helper
       */
      (function ($) {
        'use strict';

        $(function () {

          var promisesOk = typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1;

          $('.video-controls').off().on('click', function () {
            var $this = $(this);
            var video = $this.prev()[0];
            if (video.paused === true) {

              if (promisesOk) {
                video.play().then(function () {
                  $this.find('svg').fadeOut();
                });
              } else {
                video.play();
                $this.find('svg').fadeOut();
              }

            } else {
              video.pause();
              $this.find('svg').fadeIn();
            }
          });

          // on browser resize, ensure that videos fills theirs containers
          $(window).on('resize', function () {
            setTimeout(function () {
              checkVideoFill();
            }, 500);
          });

          // force the resize event
          $(window).trigger('resize');

        });


        /**
         * Ensure that the video fill its own container element
         */
        function checkVideoFill() {
          $(document).find('video.fillIt').each(function () {
            // console.log([$(this).outerHeight(), $(this).parent().outerHeight()]);

            if ($(this).outerHeight() < $(this).parent().outerHeight()) {
              $(this).removeClass('fillItW').addClass('fillItH');
            } else if ($(this).outerWidth() < $(this).parent().outerWidth()) {
              $(this).removeClass('fillItH').addClass('fillItW');
            }
          });
        }

      }($));


      /**
       * show-hide-trigger
       * http://viralpatel.net/blogs/jquery-trigger-custom-event-show-hide-element/
       */
      (function ($) {
        'use strict';
        $.each(['show', 'hide'], function (i, ev) {
          var el = $.fn[ev];
          $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
          };
        });
      })($);


      /**
       * hover-touch-helper
       */
      (function ($) {
        'use strict';

        $('.taphover').on("touchstart", function (e) {

          var link = $(this);
          if (link.hasClass('hover')) {
            return true;
          } else {
            link.addClass("hover");
            $('.taphover').not(this).removeClass("hover");
            e.preventDefault();
            return false;
          }
        });

      })($);


      /**
       * buttons-ripple-helper
       */
      (function ($) {
        $('.ripple-effect').click(function (e) {
          var rippler = $(this);

          // create .ink element if it doesn't exist
          if (rippler.find('.ink').length === 0) {
            rippler.append('<span class="ink"></span>');
          }

          var ink = rippler.find('.ink');

          // prevent quick double clicks
          ink.removeClass('animate');

          // set .ink diametr
          if (!ink.height() && !ink.width()) {
            var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
            ink.css({ height: d, width: d });
          }

          // get click coordinates
          var x = e.pageX - rippler.offset().left - ink.width() / 2;
          var y = e.pageY - rippler.offset().top - ink.height() / 2;

          // set .ink position and add class .animate
          ink.css({
            top: y + 'px',
            left: x + 'px'
          }).addClass('animate');
        });
      })($);


      /**
       * [jQuery-appear]{@link https://github.com/emn178/jquery-appear}
       *
       * @version 0.2.6
       * @author Yi-Cyuan Chen [emn178@gmail.com]
       * @copyright Yi-Cyuan Chen 2014-2016
       * @license MIT
       */
      (function ($, window, document) {
        var KEY = 'jquery-appear';
        var APPEAR_EVENT = 'appear';
        var APPEARING_EVENT = 'appearing';
        var DISAPPEAR_EVENT = 'disappear';
        var EVENTS = [APPEAR_EVENT, APPEARING_EVENT, DISAPPEAR_EVENT];
        var SELECTOR = ':' + KEY;
        var SCROLLER_KEY = KEY + '-scroller';
        var DISPLAY_KEY = KEY + '-display';
        var WATCH_KEY = KEY + '-watch';
        var WATCH_SELECTOR = ':' + WATCH_KEY;
        var MUTATION = window.MutationObserver !== undefined;
        var animationend = 'animationend webkitAnimationEnd oAnimationEnd';
        var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd';
        var screenHeight, screenWidth, init = false, observations = $(), watchObservations = $();

        $.expr[':'][KEY] = function (element) {
          return $(element).data(KEY) !== undefined;
        };

        $.expr[':'][WATCH_KEY] = function (element) {
          return $(element).data(WATCH_KEY) !== undefined;
        };

        function throttle(func) {
          var delay = 10;
          var lastTime = 0;
          var timer;
          return function () {
            var self = this, args = arguments;
            var exec = function () {
              lastTime = new Date();
              func.apply(self, args);
            };
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
            var diff = new Date() - lastTime;
            if (diff > delay) {
              exec();
            } else {
              timer = setTimeout(exec, delay - diff);
            }
          };
        }

        function test() {
          var element = $(this);
          var v = element.is(':visible') && visible(this);
          if (v) {
            element.trigger(APPEARING_EVENT);
            if (v != element.data(KEY)) {
              element.trigger(APPEAR_EVENT);
            }
          } else if (v != element.data(KEY)) {
            element.trigger(DISAPPEAR_EVENT);
          }

          element.data(KEY, v);
        }

        function visible(element) {
          var rect = element.getBoundingClientRect();
          return (rect.top >= 0 && rect.top <= screenHeight || rect.bottom >= 0 && rect.bottom <= screenHeight) &&
            (rect.left >= 0 && rect.left <= screenWidth || rect.right >= 0 && rect.right <= screenWidth);
        }

        function resize() {
          screenHeight = window.innerHeight || document.documentElement.clientHeight;
          screenWidth = window.innerWidth || document.documentElement.clientWidth;
          detect();
        }

        var detect = throttle(function () {
          observations = observations.filter(SELECTOR);
          observations.each(test);
        });

        function elementDetect() {
          $(this).find(SELECTOR).each(test);
        }

        function watch() {
          var element = $(this);
          if (!(watchScroller(element) | watchDisplay(element))) {
            return;
          }
          if (element.data(WATCH_KEY)) {
            return;
          }
          element.data(WATCH_KEY, 1);
          watchObservations = watchObservations.add(element);
        }

        function unwatch() {
          var element = $(this);
          if (!element.data(WATCH_KEY)) {
            return;
          }
          if (element.find(SELECTOR).length === 0) {
            element.removeData(SCROLLER_KEY).removeData(DISPLAY_KEY).removeData(WATCH_KEY);
            element.unbind('scroll', elementDetect)._unbindShow(elementDetect);
          }
        }

        function watchScroller(element) {
          if (element.data(SCROLLER_KEY)) {
            return false;
          }
          var overflow = element.css('overflow');
          if (overflow != 'scroll' && overflow != 'auto') {
            return false;
          }
          element.data(SCROLLER_KEY, 1);
          element.bind('scroll', elementDetect);
          return true;
        }

        function watchDisplay(element) {
          if (MUTATION || element.data(DISPLAY_KEY)) {
            return;
          }
          var display = element.css('display');
          if (display != 'none') {
            return;
          }
          element.data(DISPLAY_KEY, 1);
          element._bindShow(elementDetect);
          return true;
        }

        function bind(handleObj) {
          var element = $(this);
          if (element.is(SELECTOR)) {
            return;
          }

          if (!init) {
            init = true;
            resize();
            $(document).ready(function () {
              $(window).on('resize', resize).on('scroll', detect);
              $(document.body).on(animationend + ' ' + transitionend, detect);
            });

            if (MUTATION) {
              var observer = new MutationObserver(detect);
              observer.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
              });
            }
          }

          element.data(KEY, false);
          element.parents().each(watch);
          // wait for handler ready
          setTimeout(function () {
            test.call(element[0]);
          }, 1);
          observations = observations.add(this);
        }

        function unbind(handleObj) {
          var element = $(this);
          setTimeout(function () {
            var events = $._data(element[0], 'events') || {};
            var result = false;
            for (var i = 0; i < EVENTS.length; ++i) {
              if (events[EVENTS[i]]) {
                result = true;
                break;
              }
            }
            if (result) {
              element.removeData(KEY);
              watchObservations = watchObservations.filter(WATCH_SELECTOR);
              watchObservations.each(unwatch);
            }
          }, 1);
        }

        function refresh(selector) {
          var elements = selector === undefined ? observations : $(selector);
          elements.each(function () {
            var element = $(this);
            if (!element.is(SELECTOR)) {
              return;
            }
            element.parents().each(watch);
          });
        }

        function createEvents() {
          for (var i = 0; i < EVENTS.length; ++i) {
            $.event.special[EVENTS[i]] = {
              add: bind,
              remove: unbind
            };
          }
        }

        function setEventPrefix(prefix) {
          for (var i = 0; i < EVENTS.length; ++i) {
            delete $.event.special[EVENTS[i]];
          }
          APPEAR_EVENT = prefix + 'appear';
          APPEARING_EVENT = prefix + 'appearing';
          DISAPPEAR_EVENT = prefix + 'disappear';
          EVENTS = [APPEAR_EVENT, APPEARING_EVENT, DISAPPEAR_EVENT];
          createEvents();
        }

        $.appear = {
          check: detect,
          refresh: refresh,
          setEventPrefix: setEventPrefix
        };

        createEvents();

        // SHOW EVENT
        (function () {
          var EVENT = 'jquery-appear-show';
          var SELECTOR_KEY = KEY + '-' + EVENT;
          var SELECTOR = ':' + SELECTOR_KEY;
          var interval = 50, timer, observations = $();

          $.expr[':'][SELECTOR_KEY] = function (element) {
            return $(element).data(SELECTOR_KEY) !== undefined;
          };

          function test() {
            var element = $(this);
            var status = element.css('display') != 'none';
            if (element.data(SELECTOR_KEY) != status) {
              element.data(SELECTOR_KEY, status);
              if (status) {
                element.trigger(EVENT);
              }
            }
          }

          function detect() {
            observations = observations.filter(SELECTOR);
            observations.each(test);
            if (observations.length === 0) {
              timer = clearInterval(timer);
            }
          }

          $.fn._bindShow = function (handler) {
            this.bind(EVENT, handler);
            this.data(SELECTOR_KEY, this.css('display') != 'none');
            observations = observations.add(this);
            if (interval && !timer) {
              timer = setInterval(detect, interval);
            }
          };

          $.fn._unbindShow = function (handler) {
            this.unbind(EVENT, handler);
            this.removeData(SELECTOR_KEY);
          };

          $.appear.setInterval = function (v) {
            if (v == interval || !$.isNumeric(v) || v < 0) {
              return;
            }
            interval = v;
            timer = clearInterval(timer);
            if (interval > 0) {
              timer = setInterval(detect, interval);
            }
          };
        })();
      })(jQuery, window, document);

      /*!
       * InlineSVG
       *
       * This is a jQuery plugin that takes an image selector as an argument having a
       * SVG as source. Then it inlines the SVG so that the SVG stroke and path can
       * be manipulated using plain CSS.
       *
       * @license MIT
       * @version 2.0.0
       * @see {@link https://github.com/createlogic/InlineSVG|GitHub}
       *
       * The MIT License (MIT)
       *
       * Copyright (c) 2010-2015 Bilal Niaz Awan
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy of
       * this software and associated documentation files (the "Software"), to deal in
       * the Software without restriction, including without limitation the rights to
       * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
       * the Software, and to permit persons to whom the Software is furnished to do so,
       * subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in all
       * copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
       * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
       * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
       * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
       * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
       */

      (function ($) {

          'use strict';

          /**
           * @name jQuery
           * @constructor
           */

          /**
           * @callback jQuery.inlineSVG~eachAfter
           * @this DOM
           */

          /**
           * @callback jQuery.inlineSVG~allAfter
           * @this null
           */

          /**
           * @callback jQuery.inlineSVG~beforeReplace
           * @param {jQuery} $img - Source <img> element
           * @param {jQuery} $svg - <svg> element to replace
           * @param {jQuery.inlineSVG~beforeReplaceNext} next - Callback to next element
           * @this null
           */

          /**
           * @callback jQuery.inlineSVG~beforeReplaceNext
           * @param {Boolean} [replace=true] - Replace element otherwise just go to next
           */

          /**
           * @typedef {Object} jQuery.inlineSVG~options
           * @property {?jQuery.inlineSVG~eachAfter} [eachAfter] - Callback for each replaced <img> element
           * @property {?jQuery.inlineSVG~allAfter} [allAfter] - Callback after all <img> elements is replaced
           * @property {?jQuery.inlineSVG~beforeReplaceCallback} [beforeReplace] - Callback for each item before replaced
           * @property {?String} [replacedClass='replaced-svg'] - Class name to add to new <svg> DOM-element
           * @property {Boolean} [keepSize=true] - Set "width" and "height" attributes from source <img> to new <svg>
           * @property {Boolean} [keepStyle=true] - Set "style" attribute from source <img> to new <svg>
           */

          /**
           * @name inlineSVG
           * @memberof jQuery
           * @param {jQuery.inlineSVG~options} [options]
           * @this jQuery
           * @returns {jQuery} Source jQuery instance
           * @public
           * @static
           */
          $.fn.inlineSVG = function (options) {

              options = $.extend({
                  eachAfter: null,
                  allAfter: null,
                  beforeReplace: null,
                  replacedClass: 'replaced-svg',
                  keepSize: true,
                  keepStyle: true
              }, (options || {}));

              var $list = this;
              var counter = 0;

              return $list.each(function () {

                  var $img = $(this);
                  var imgID = $img.attr('id');
                  var imgClass = $img.attr('class');
                  var imgURL = $img.attr('src');

                  $.get(imgURL, function (data) {

                      // Get the SVG tag, ignore the rest
                      var $svg = $(data).find('svg');
                      var classes = [];

                      // Add replaced image's ID to the new SVG
                      if (imgID) {
                          $svg.attr('id', imgID);
                      }

                      // Add replaced image's classes to the new SVG
                      if (imgClass) {
                          classes.push(imgClass);
                      }
                      if (options.replacedClass) {
                          classes.push(options.replacedClass);
                      }
                      $svg.attr('class', classes.join(' '));

                      // Remove any invalid XML tags as per http://validator.w3.org
                      $svg.removeAttr('xmlns:a');

                      if (options.keepSize) {
                          var w = $img.attr('width');
                          var h = $img.attr('height');

                          if (w) {
                              $svg.attr('width', w);
                          }
                          if (h) {
                              $svg.attr('height', h);
                          }
                      }
                      if (options.keepStyle) {
                          var style = $img.attr('style');

                          if (style) {
                              $svg.attr('style', style);
                          }
                      }

                      function cb(replace) {

                          replace = ($.type(replace) === 'boolean') ? replace : true;

                          if (replace) {
                              // Replace image with new SVG
                              $img.replaceWith($svg);

                              // Callback for each element
                              options.eachAfter && options.eachAfter.call($svg.get(0));
                          } else {
                              $svg.remove();
                          }

                          // Check for all is completed
                          if (++counter === $list.length) {
                              options.allAfter && options.allAfter.call(null);
                          }
                      }

                      if (options.beforeReplace) {
                          options.beforeReplace.call(null, $img, $svg, cb);
                      } else {
                          cb();
                      }

                  }, 'xml');

              });
          };





          $(document).ready(function(){
            var $svgItems = $('img[src$=".svg"]');
            $svgItems.inlineSVG();




          });

      })(jQuery);


      $(document).ready(function(){


        var truncate = function (elem, limit) {

          // Make sure an element and number of items to truncate is provided
          if (!elem || !limit) return;

          // Get the inner content of the element
          var content = elem.textContent.replace(/\r?\n|\r|\s+/g , ' ').trim();
          var firstcontent, lastcontent;
          // Convert the content into an array of words
          content = content.split(' ');
          if (content.length > limit) {
            for (var i = 0; i < limit; i++) {
              if (typeof(firstcontent) == 'undefined') {
                firstcontent = content[i];
              } else {
                firstcontent = firstcontent + ' ' + content[i];
              }
            }
            for (var b = limit; b < content.length; b++) {
              if (typeof(lastcontent) == 'undefined') {
                lastcontent = content[b];
              } else {
                lastcontent = lastcontent + ' ' + content[b];
              }
            }
            //$('.popover-dots').removeClass('hidden');
          } else {
            //$('.popover-dots').addClass('hidden');
          }
          return [firstcontent, lastcontent];
        };

        var text = document.querySelectorAll('.popover-content p');
        var truncatedText;
        var dotsSingle = document.querySelectorAll('.popover-dots');
        //var popOverDots = $('.popover-dots');


        for(var k = 0; k<text.length; k++){
          truncatedText = truncate(text[k], 50);
          if(typeof(truncatedText[k]) != 'undefined') {
            text[k].innerText = (truncatedText[0]);
            dotsSingle[k].dataset.content = truncatedText[1];
            $(dotsSingle[k]).removeClass('hidden')
          }
        }










        //$('[data-toggle="popover"]').popover();



      });




