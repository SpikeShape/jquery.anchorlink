# jQuery Anchorlink

A JavaScript library to handle JavaScript scrolling when clicking on internal anchors incl. URL updates. It also moves the focus to the link destination to assure keyboard navigation.

## Ho to use
```javascript
$('a[href^="#"][href=!"#"]').anchorlink({
  timer : 500,
  scroll_to_hash_on_load : true,
  offset_top : 0,
  destination_class : 'js-focus',
  before_scroll: function() {},
  after_scroll : function() {}
});
```

## Options
- `timer` - scroll time in ms
- `scroll_to_hash_on_load` - scroll to hash in URL
- `offset_top` - offset between scroll destination and top of the screen. `< 0` before destination; `> 0` after destination
- `destination_class` - class that is added to thee scroll destination; usable to remove unwanted browser focus styles
- `before_scroll` - function the call before the scroll calculation and animation is started
- `after_scroll` - function the call after the scroll animation is done
