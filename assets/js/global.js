
function throttle(fn, wait) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args)
        timer = null
      }, wait)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  !!pangu && pangu.spacingElementByClassName('item-title');
  !!pangu && pangu.spacingElementByClassName('toc');
  !!pangu && pangu.spacingElementByClassName('single-post');
});

// window.oncontextmenu = function () {
//     event.preventDefault();
//     return false;
// }

window.onkeydown = window.onkeyup = window.onkeypress = function () {
    if(event.keyCode == 123){
        event.preventDefault();
        window.event.returnValue = false;
    }
}
