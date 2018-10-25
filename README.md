# jQuery Anchorlink

A JavaScript library to handle JavaScript scrolling when clicking on internal anchors incl. URL updates. It also moves the focus to the link destination to assure keyboard navigation.

## How to use
```javascript
$('a[href^="#"][href!="#"]').anchorlink({
  scrollStopEvent: 'scroll.anchorlink mousedown.anchorlink wheel.anchorlink DOMMouseScroll.anchorlink mousewheel.anchorlink',
  timer : 500,
  scrollOnLoad : true,
  offsetTop : 0,
  focusClass : 'js-focus',
  beforeScroll: function() {},
  afterScroll : function() {}
});
```

## Options
| Name                | Default        | Description                       |
|---------------------|----------------|-------------------------------------------------------------------------------------------------|
| scrollStopEvent     | scroll.anchorlink mousedown.anchorlink wheel.anchorlink DOMMouseScroll.anchorlink mousewheel.anchorlink            | events to listen to while scrolling to abort the scroll animation               |
| timer               | 500            | scroll time in ms               |
| scrollOnLoad        | true           | scroll to hash in URL when loading the page |
| offsetTop           | 0              | offset between scroll destination and top of the screen in px. `< 0` before destination; `> 0` after destination; can either be a number or a function returning a number |
| focusClass          | 'js-focus'     | class that is added to thee scroll destination; usable to remove unwanted browser focus styles   |
| beforeScroll        | function() {}  | function to be executed before the scroll calculation and animation is started   |
| afterScroll         | function() {}  | function to be executed after the scroll animation is done   |
