// ruediger@webit.de

(function( $ ) {

  $.fn.anchorlink = function(options) {
    var self = this,
        $body_html = $('html, body'),
        scroll_stop_event = 'scroll.anchorlink mousedown.anchorlink wheel.anchorlink DOMMouseScroll.anchorlink mousewheel.anchorlink touchmove.anchorlink',
        settings = $.extend({
        // These are the defaults.
        timer : 500,
        scrollOnLoad : true,
        offsetTop : 0,
        focusClass : 'js-focus',
        beforeScroll: function() {},
        afterScroll : function() {}
      }, options );

    /**
     * Initiates the module.
     * @function init
     * @public
     */
    function init() {
      bindEvents();
    }

    /**
     * Binds all events to jQuery DOM objects.
     * @function bindEvents
     * @private
     */
    function bindEvents() {
      $(window).on('scroll-to', function(event, destination) {
        scrollTo(destination, false);
      });

      self.on('click.anchorlink', function(event) {
        event.preventDefault();
        var destination = $(this).attr('href');
        scrollTo(destination, false);
      });

      if (settings.scrollOnLoad && window.location.hash) {
        window.scrollTo(0, 0); // execute it straight away
        setTimeout(function() {
          window.scrollTo(0, 0); // run it a bit later also for browser compatibility
        }, 1);

        scrollTo(window.location.hash, false);
      }
    }

    /**
     * Scrolls to the specified element.
     * @function scrollTo
     * @private
     */
    function scrollTo(target, change_url_hash) {
      var
      $target = $(target),
      offset_top =  typeof settings.offsetTop === 'function' ? settings.offsetTop.call(self) :
                    typeof settings.offsetTop === 'number' ? settings.offsetTop : 0;

      offset_top = typeof offset_top === 'number' ? offset_top : 0;

      change_url_hash = (typeof change_url_hash === 'undefined') ? true : change_url_hash;

      if ($target.length) {
        if (!$target.get(0).hasAttribute('tabindex')) {
          $target
            .attr('tabindex', '-1')
            .addClass(settings.focusClass);
        }

        if (change_url_hash) {
          window.location.hash = target;
        }

        settings.beforeScroll.call();

        $body_html.on(scroll_stop_event, function(){
          $body_html.stop(); // prevent jittering scroll when scrolling manually during animation
        });

        $body_html.stop(false, false).animate({
          scrollTop: ($target.offset().top + offset_top)
        }, settings.timer)
          .promise().then(function() {
            settings.afterScroll.call();
            $body_html.off(scroll_stop_event);
            $target.focus().on('blur.anchorlink', _removeJSAttributes($target));
          });
      }
    }

    /**
     * Remove tabindex and class for js focus
     * @function _removeJSAttributes
     * @private
     */
    function _removeJSAttributes($target) {
      $target.removeAttr('tabindex').removeClass(settings.focusClass).off('blur.anchorlink');
    }

    if (this.length) {
      init();
    }

    return self;

  };

}( jQuery ));
