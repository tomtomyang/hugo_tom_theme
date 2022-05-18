import pangu from 'pangu'

document.addEventListener('DOMContentLoaded', () => {
  !!pangu && pangu.spacingElementByClassName('list-item');
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
