;(function () {
  function getTheme() {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : null
  }

  function setTheme(style) {
    document.documentElement.setAttribute('data-theme', style)
    localStorage.setItem('theme', style)
  }

  function switchTheme(e) {
    var theme = getTheme()
    setTheme(theme == 'light' ? 'dark' : 'light')
  }

  ;(function () {
    var theme = getTheme()
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    if (theme == null) {
      setTheme(userPrefersDark ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute(
        'data-theme',
        theme == 'light' ? 'light' : 'dark'
      )
    }
  })()

  var switchBtn = null

  window.addEventListener(
    'DOMContentLoaded',
    (e) => {
      switchBtn = document.querySelectorAll('#switch_btn')

      !!switchBtn &&
        switchBtn.forEach((ele) => {
          ele.addEventListener('click', switchTheme)
        })
    },
    { once: true }
  )
})()
