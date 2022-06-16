function createEl(template) {
  var el = document.createElement('div');
  el.innerHTML = template.trim();
  return el.firstChild;
}

function createSvgEl(template) {
  var el = createEl('\n    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + template.trim() + '</svg>\n  ');
  return el;
}

function createSvgChildEl(template) {
  return createSvgEl(template).firstChild;
}



var totalMaskIdx = 0;
function createMasksWithStripes(count, box) {
  var averageHeight = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

  var masks = [];
  for (var i = 0; i < count; i++) {
    masks.push([]);
  }
  var maskNames = [];
  for (var _i = totalMaskIdx; _i < totalMaskIdx + masks.length; _i++) {
    maskNames.push('clipPath' + _i);
  }
  totalMaskIdx += masks.length;
  var maskIdx = 0;
  var x = 0;
  var y = 0;
  var stripeHeight = averageHeight;
  while (true) {
    var w = Math.max(stripeHeight * 10, Math.round(Math.random() * box.width));
    masks[maskIdx].push('\n      M ' + x + ',' + y + ' L ' + (x + w) + ',' + y + ' L ' + (x + w) + ',' + (y + stripeHeight) + ' L ' + x + ',' + (y + stripeHeight) + ' Z\n    ');

    maskIdx += 1;
    if (maskIdx >= masks.length) {
      maskIdx = 0;
    }

    x += w;
    if (x > box.width) {
      x = 0;
      y += stripeHeight;
      stripeHeight = Math.round(Math.random() * averageHeight + averageHeight / 2);
    }
    if (y >= box.height) {
      break;
    }
  }

  masks.forEach(function (rects, i) {
    var el = createSvgChildEl('<clipPath id="' + maskNames[i] + '">\n      <path d="' + rects.join(' ') + '" fill="white"></path>\n    </clipPath>');
    document.querySelector('#clip-paths g').appendChild(el);
  });

  console.log(maskNames);
  return maskNames;
}


function cloneAndStripeElement(element, clipPathName, parent) {
  var el = element.cloneNode(true);
  var box = element.getBoundingClientRect();
  var parentBox = parent.getBoundingClientRect();
  box = {
    top: box.top - parentBox.top,
    left: box.left - parentBox.left,
    width: box.width,
    height: box.height
  };
  var style = window.getComputedStyle(element);

  dynamics.css(el, {
    position: 'absolute',
    left: Math.round(box.left + window.scrollX),
    top: Math.round(box.top + window.scrollY),
    width: Math.ceil(box.width),
    height: Math.ceil(box.height),
    display: 'none',
    pointerEvents: 'none',
    background: '#101214',
    fontSize: style.fontSize,
    fontFamily: style.fontFamily,
    color: style.color,
    textDecoration: style.textDecoration
  });
  parent.appendChild(el);
  el.style['-webkit-clip-path'] = 'url(/#' + clipPathName + ')';
  el.style['clip-path'] = 'url(/#' + clipPathName + ')';

  return el;
}

function handleMouseOver(e) {
  var el = e.target;
  while (el && el.tagName.toLowerCase() !== 'a') {
    el = el.parentNode;
  }
  if (!el) {
    return;
  }
  var r = animateLink(el);

  var handleMouseOut = function handleMouseOut(e) {
    el.removeEventListener('mouseout', handleMouseOut);
    r.stop();
  };

  el.addEventListener('mouseout', handleMouseOut);
}

function animateLink(el) {
  var animating = true;
  var box = el.getBoundingClientRect();

  var animate = function animate() {
    var masks = createMasksWithStripes(3, box, 3);
    var clonedEls = [];

    for (var i = 0; i < masks.length; i++) {
      var clonedEl = cloneAndStripeElement(el, masks[i], document.body);
      var childrenEls = Array.prototype.slice.apply(clonedEl.querySelectorAll('path'));
      childrenEls.push(clonedEl);
      for (var k = 0; k < childrenEls.length; k++) {
        var _color3 = tinycolor('hsl(' + Math.round(Math.random() * 360) + ', 80%, 65%)');
        var rgb = _color3.toRgbString();
        dynamics.css(childrenEls[k], {
          color: rgb,
          fill: rgb
        });
      }
      clonedEl.style.display = '';
      clonedEls.push(clonedEl);
    }

    var _loop4 = function _loop4(_i4) {
      var clonedEl = clonedEls[_i4];
      dynamics.css(clonedEl, {
        translateX: Math.random() * 10 - 5
      });

      dynamics.setTimeout(function () {
        dynamics.css(clonedEl, {
          translateX: 0
        });
      }, 50);

      dynamics.setTimeout(function () {
        dynamics.css(clonedEl, {
          translateX: Math.random() * 5 - 2.5
        });
      }, 100);

      dynamics.setTimeout(function () {
        document.body.removeChild(clonedEl);
      }, 150);
    };

    for (var _i4 = 0; _i4 < clonedEls.length; _i4++) {
      _loop4(_i4);
    }

    dynamics.setTimeout(function () {
      if (animating) {
        animate();
      }
      for (var _i5 = 0; _i5 < masks.length; _i5++) {
        var maskEl = document.querySelector('#' + masks[_i5]);
        maskEl.parentNode.removeChild(maskEl);
      }
    }, Math.random() * 600);
  };

  animate();

  return {
    stop: function stop() {
      animating = false;
    }
  };
};

var linkEls = document.querySelectorAll('a');
if (!('ontouchstart' in window)) {
  for (var i = 0; i < linkEls.length; i++) {
    linkEls[i].addEventListener('mouseover', handleMouseOver);
  }
}
