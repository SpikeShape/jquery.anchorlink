# jQuery Anchorlink

A JavaScript library to handle JavaScript scrolling when clicking on internal anchors incl. URL updates. It also moves the focus to the link destination to assure keyboard navigation.

## Ho to use
```javascript
$('a[href^="#"][href!="#"]').anchorlink({
  timer : 500,
  scrollOnLoad : true,
  offsetTop : 0,
  focusClass : 'js-focus',
  beforeScroll: function() {},
  afterScroll : function() {}
});
```

## Options
- `timer` - scroll time in ms
- `scrollOnLoad` - scroll to hash in URL
- `offsetTop` - offset between scroll destination and top of the screen. `< 0` before destination; `> 0` after destination
- `focusClass` - class that is added to thee scroll destination; usable to remove unwanted browser focus styles
- `beforeScroll` - function the call before the scroll calculation and animation is started
- `afterScroll` - function the call after the scroll animation is done
