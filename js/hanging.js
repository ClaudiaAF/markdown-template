/* global jQuery */
(function ($) {
  $.fn.addHangingPunctuation = function () {
    return this.each(function () {
      $(this).find('h1, h2, h3, h4, h5, h6, li, p, th, td').each(function () {
        var txt = $(this).text()
        if (txt.match(/^[\u00ab\u201c]/)) {
          $(this).addClass('startsWithDoubleQuote')
        } else if (txt.match(/^[\u00b9\u2018]/)) {
          $(this).addClass('startsWithSingleQuote')
        }
      })
    })
  }
}(jQuery))
