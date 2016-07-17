/* global jQuery */
(function ($) {
  $.fn.addForkButton = function () {
    return this.each(function () {
      if ($(this).find('.github-fork-ribbon').length > 0) {
        return
      }

      var button = $('<a class="github-fork-ribbon" href="' +
                     $.fn.addForkButton.location() +
                     '" title="Fork me on GitHub">Fork me on GitHub</a>')
      var container = $(this).find('.container')

      container.prepend(button)
    })
  }

  $.fn.addForkButton.resource = function (url) {
    return URI(url).resource()
  }

  $.fn.addForkButton.path = function (url) {
    return URI($.fn.addForkButton.resource(url)).relativeTo('/')
             .toString()
             .replace(/index\.html?$/, '')
             .replace(/\/?$/, '')
  }

  $.fn.addForkButton.url = function (url) {
    if (URI(url).protocol() === 'file') {
      return url
    }

    var github = 'https://github.com/epsil/epsil.github.io/tree/master/'
    var file = '/index.txt'
    var path = $.fn.addForkButton.path(url)

    if (path === '') {
      return 'https://github.com/epsil/epsil.github.io/'
    }

    return github + path + file
  }

  $.fn.addForkButton.location = function () {
    return $.fn.addForkButton.url(window.location.href)
  }
}(jQuery))
