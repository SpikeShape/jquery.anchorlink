(function( $ ) {

  $.fn.anchorlink = function(options) {
    var self = this,
        $body_html = $('html, body'),
        settings = $.extend({
        // These are the defaults.
        timer : 500,
        scroll_to_hash_on_load : true,
        offset_top : 0,
        write_history_entry : true,
        destination_class : 'js-focus',
        before_scroll: function() {},
        after_scroll : function() {}
      }, options );

    /**
     * Initiates the module.
     * @function init
     * @public
     */
    function init() {
      _bindEvents();
    }

    /**
     * Binds all events to jQuery DOM objects.
     * @function _bindEvents
     * @private
     */
    function _bindEvents() {
      self.on('click.anchorlink', function() {
        _scrollTo($(this).attr('href'));
      });

      $body_html.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
        $body_html.stop();
      });

      if (settings.scroll_to_hash_on_load && window.location.hash) {
        _scrollTo(window.location.hash, false);
      }
    }
    /**
     * Scrolls to the specified element.
     * @function _scrollTo
     * @private
     */
    function _scrollTo(target, history_entry) {
      var
      $target = $(target);

      console.log($target);

      history_entry = (typeof history_entry === 'undefined') ? true : history_entry;

      if ($target.length) {
        if (!$target.get(0).hasAttribute('tabindex')) {
          $target
            .attr('tabindex', '-1')
            .addClass(settings.destination_class)
            .on('blur.anchorlink', _removeJSAttributes($target));
        }

        if (settings.write_history_entry && history_entry && typeof history.pushState === 'function') {
          history.pushState({}, "", target);
        }

        settings.before_scroll.call();

        $body_html.stop(false, false).animate({
          scrollTop: ($target.offset().top + settings.offset_top)
        }, settings.timer, settings.after_scroll);

        $target.focus();
      }
    }

    function _removeJSAttributes($target) {
      $target.removeAttr('tabindex').removeClass(settings.destination_class).off('blur.anchorlink');
    }

    if (this.length) {
      init();
    }

    return self;

  };

}( jQuery ));
