// ruediger@webit.de

(function( $ ) {

  $.fn.anchorlink = function(options) {
    var self = this,
        $body_html = $('html, body'),
        scroll_stop_event = 'scroll.anchorlink mousedown.anchorlink wheel.anchorlink DOMMouseScroll.anchorlink mousewheel.anchorlink touchmove.anchorlink',
        history_support = /*history.replaceState ? true : */false,
        settings = $.extend({
        // These are the defaults.
        timer : 500,
        scrollOnLoad : true,
        offsetTop : 0,
        focusClass : 'js-focus',
        setUrlHash : true,
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
      self.on('click.anchorlink', function(event) {
        event.preventDefault();
        scrollTo($(this));
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
    function scrollTo($clicked_anchor, change_url_hash) {
      var
      target = $clicked_anchor.attr('href'),
      $target = $(target);

      change_url_hash = (typeof change_url_hash === 'undefined') ? true : change_url_hash;

      if ($target.length) {
        if (!$target.get(0).hasAttribute('tabindex')) {
          $target
            .attr('tabindex', '-1')
            .addClass(settings.focusClass);
        }

        if (settings.setUrlHash && change_url_hash && history_support) {
          history.replaceState(null, document.title, target);
        }

        settings.beforeScroll.call($clicked_anchor);

        $body_html.on(scroll_stop_event, function(){
          $body_html.stop(); // prevent jittering scroll when scrolling manually during animation
        });

        $body_html.stop(false, false).animate({
          scrollTop: ($target.offset().top + settings.offsetTop)
        }, settings.timer)
          .promise().then(function() {
            settings.afterScroll.call($clicked_anchor);
            $body_html.off(scroll_stop_event);
          });

        $target.focus().on('blur.anchorlink', _removeJSAttributes($target));
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
