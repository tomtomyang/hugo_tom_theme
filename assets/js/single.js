;(function () {
  function scrollTo(targetHeight) {
    if (!!singlePost && !!header && !!content && !!footer) {
      let totalHeight =
        content.offsetHeight +
        footer.offsetHeight +
        header.offsetHeight +
        160 -
        document.body.clientHeight
      if (targetHeight > totalHeight) {
        targetHeight = totalHeight
      }
      if (singlePost.scrollTop != targetHeight) {
        singlePost.scrollTop = targetHeight
      }

      // let currentHeight = singlePost.scrollTop;
      // let needScrollTop = targetHeight - currentHeight;
      // setTimeout(() => {
      //     // 一次调用滑动帧数，每次调用会不一样
      //     let dist = Math.ceil(needScrollTop / 10);
      //     currentHeight += dist
      //     singlePost.scrollTop = currentHeight;

      //     // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
      //     if ((needScrollTop > 10 || needScrollTop < -10)) {
      //         scrollTo(targetHeight)
      //     } else {
      //         singlePost.scrollTop = targetHeight;
      //     }
      // }, 20)
    }
  }

  function backToTop() {
    !!singlePost && scrollTo(0)
  }

  function setReadPercentage() {
    if (!!singlePost && !!header && !!content && !!footer && !!percentage) {
      let currentHeight = singlePost.scrollTop
      let totalHeight =
        content.offsetHeight +
        footer.offsetHeight +
        header.offsetHeight +
        160 -
        document.body.clientHeight
      let readPercentage = Math.round((currentHeight / totalHeight) * 100)
      percentage.style.width = `${readPercentage}%`
    }
  }

  function showMenu(currentHeight) {
    if (!!menu) {
      currentHeight > 50
        ? menu.classList.add('show')
        : menu.classList.remove('show')
    }
  }

  function checkCurrentHeader(currentHeight) {
    if (
      !!currentHeight &&
      !!headerList &&
      !!tocList &&
      headerList.length > 0 &&
      tocList.length > 0 &&
      headerList?.length == tocList?.length
    ) {
      let activeIndex = null
      for (let index = 0; index <= headerList.length; index++) {
        if (!!headerList[index] && !!headerList[index + 1]) {
          if (
            !!headerList[index]?.offsetTop &&
            currentHeight > headerList[index].offsetTop &&
            !!headerList[index + 1]?.offsetTop &&
            currentHeight < headerList[index + 1].offsetTop
          ) {
            activeIndex = index
            break
          }
        }
        if (!!headerList[index] && !headerList[index + 1]) {
          if (
            !!headerList[index]?.offsetTop &&
            currentHeight > headerList[index].offsetTop
          ) {
            activeIndex = index
            break
          }
        }
      }
      clearActivedTocItem()
      setActiveTocItem(activeIndex)
    }
  }

  function clearActivedTocItem() {
    let activeTocList = document.querySelectorAll('.toc li .active')
    !!activeTocList &&
      activeTocList.forEach((ele) => ele.classList.remove('active'))
  }

  function setActiveTocItem(index) {
    !!tocList[index] && tocList[index].classList.add('active')
    tocContainerScroll()
  }

  function tocContainerScroll() {
    let activeLi = document.querySelector('.toc li .active')?.parentNode
    if (!!tocContainer) {
      if (!!activeLi) {
        if (
          activeLi.offsetTop + activeLi.clientHeight >
          tocContainer.clientHeight + tocContainer.scrollTop
        ) {
          tocContainer.scrollTop +=
            activeLi.offsetTop +
            activeLi.clientHeight -
            (tocContainer.clientHeight + tocContainer.scrollTop) +
            10
        }
        if (activeLi.offsetTop < tocContainer.scrollTop) {
          tocContainer.scrollTop = activeLi.offsetTop - 10
        }
      } else {
        tocContainer.scrollTop = 0
      }
    }
  }

  function handleImgError(e) {
    e.target.src = '/images/img_error.svg'
  }

  var singlePost = null
  var header = null
  var content = null
  var footer = null
  var headerList = null
  var tocContainer = null
  var tocList = null
  var imgList = null
  var menu = null
  var backTopBtn = null
  var percentage = null

  window.addEventListener(
    'DOMContentLoaded',
    (e) => {
      singlePost = document.querySelector('.single-post')
      header = document.querySelector('.single-post .post .header')
      content = document.querySelector('.single-post .post .content')
      footer = document.querySelector('.single-post .post .footer')
      headerList = document.querySelectorAll(
        '.content h1[id],h2[id],h3[id],h4[id],h5[id]'
      )
      tocContainer = document.querySelector('.toc')
      tocList = document.querySelectorAll('.toc li .toc-link')
      imgList = document.querySelectorAll('.content img')
      menu = document.querySelector('.menu')
      backTopBtn = document.querySelector('#back_top_btn')
      percentage = document.querySelector('#percentage')

      if (!!imgList && imgList.length > 0) {
        imgList.forEach((ele) => {
          ele.onerror = handleImgError
        })
      }

      if (!!singlePost) {
        checkCurrentHeader(singlePost.scrollTop + document.body.clientHeight)
        singlePost.addEventListener(
          'scroll',
          throttle(() => {
            checkCurrentHeader(
              singlePost.scrollTop + document.body.clientHeight
            )
            showMenu(singlePost.scrollTop)
            setReadPercentage()
          }, 200)
        )
      }

      if (
        !!tocList &&
        tocList.length > 0 &&
        !!headerList &&
        headerList.length > 0
      ) {
        tocList.forEach((ele, index) => {
          ele.addEventListener('click', (e) => {
            if (!!headerList[index]) {
              scrollTo(headerList[index].offsetTop)
            }
          })
        })
      } else {
        // !!tocContainer && tocContainer.classList.add('hidden');
      }

      !!backTopBtn && backTopBtn.addEventListener('click', backToTop)
      !!percentage && setReadPercentage()
    },
    { once: true }
  )

  window.addEventListener(
    'resize',
    throttle(() => {
      if (!!singlePost) {
        checkCurrentHeader(singlePost.scrollTop + document.body.clientHeight)
        setReadPercentage()
      }
    }, 200)
  )
})()

// function showActiveTocItem2() {
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             const id = entry.target.id;
//             if (entry.intersectionRatio > 0) {
//                 let activeTocEle = document.querySelectorAll('.toc li .active');
//                 !!activeTocEle && activeTocEle.forEach(ele => { ele.classList.remove('active') });

//                 let tocEle = document.querySelector(`.toc li a[data-anchorId="${id}"]`);
//                 !!tocEle && tocEle.classList.add('active');
//             } else {
//                 if (document.querySelectorAll('.toc li .active').length == 1) {
//                     return;
//                 } else {
//                     let tocEle = document.querySelector(`.toc li a[data-anchorId="${id}"]`);
//                     !!tocEle && tocEle.classList.remove('active');
//                 }
//             }
//         })
//     });

//     // 监听h1-5标签是否进入可视区域
//     !!headerList && headerList.forEach(section => {
//         observer.observe(section);
//     });
// }

// function scrollTo2(height, time) {
//     if (!time) {
//         singlePost.scrollTop = height;
//     } else {
//         // 设置循环的间隔时间  值越小消耗性能越高
//         const spacingTime = 40;
//         // 计算循环的次数
//         let spacingIndex = time / spacingTime;
//         // 获取当前滚动条位置
//         let currentHeight = singlePost.scrollTop;
//         // 计算每次滑动的距离，可以是正数也可以是负数
//         let everyStep = (height - currentHeight) / spacingIndex;

//         let scrollTimer = setInterval(() => {
//             if (spacingIndex > 0) {
//                 spacingIndex--;
//                 currentHeight += everyStep;
//                 singlePost.scrollTop = currentHeight;
//             } else {
//                 clearInterval(scrollTimer);
//             }
//         }, spacingTime);
//     }
// }
