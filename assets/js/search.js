import docsearch from 'docsearch'

;(function () {
  function changeSearchShow(e) {
    if (
      !!searchContainer &&
      !!cover &&
      !!searchBtn &&
      (e.target == cover || e.target == searchBtn)
    ) {
      searchContainer.classList.toggle('show')
      cover.classList.toggle('show')
      searchInput.focus()
      e.stopPropagation()
    }
  }

  var searchContainer = null
  var cover = null
  var searchBtn = null
  // var searchLoading = null;
  var searchInput = null

  window.addEventListener(
    'DOMContentLoaded',
    (e) => {
      searchContainer = document.querySelector('.search-container')
      searchBtn = document.querySelector('#search_btn')
      cover = document.querySelector('#cover')
      // searchLoading = document.querySelector('#loading');
      searchInput = document.querySelector('.search-input')

      !!searchBtn && searchBtn.addEventListener('click', changeSearchShow)
      !!cover && cover.addEventListener('click', changeSearchShow)

      document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0]
        if (e.keyCode == 75 && e.ctrlKey) {
          e.preventDefault()
          searchContainer.classList.toggle('show')
          cover.classList.toggle('show')
          searchInput.focus()
        }
      }

      !!docsearch && docsearch({
        apiKey: 'f7f9aeb8485880cfd0e747129ea4ddf9',
        indexName: 'blogsearch',
        appId: 'SGIZDO9IMB',
        inputSelector: '.docsearch-input',
        debug: true,
        algoliaOptions: {
          hitsPerPage: 50,
        },
        // handleSelected: (input, event, suggestion, datasetNumber, context) => {
        //     console.log(input, event, suggestion, datasetNumber, context);
        // },
        // queryHook: query => {
        //     searchLoading.innerHTML = '查询中';
        //     searchLoading.classList.add('show');
        // },
        // transformData: tips => {
        //     if (tips instanceof Array && tips.length > 0) {
        //         searchLoading.innerHTML = '';
        //         searchLoading.classList.remove('show');
        //     } else {
        //         searchLoading.innerHTML = '无结果';
        //         searchLoading.classList.add('show');
        //     }
        // }
      })
    },
    { once: true }
  )
})()
