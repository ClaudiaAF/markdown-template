/* global jQuery */
(function ($) {
  $.fn.removeAria = function () {
    return this.map(function () {
      var clone = $(this).clone()
      clone.find('[aria-hidden="true"]').remove()
      return clone
    })
  }

  $.fn.fixAnchors = function () {
    return this.each(function () {
      $(this).find('h1 a[aria-hidden="true"], h2 a[aria-hidden="true"], h3 a[aria-hidden="true"], h4 a[aria-hidden="true"], h5 a[aria-hidden="true"], h6 a[aria-hidden="true"]').each(function () {
        var anchor = $(this)
        if (!anchor.is('[title]')) {
          var header = anchor.parent()
          var title = header.removeAria().text().trim()
          anchor.attr('title', title)
        }
      })
    })
  }

  $.fn.fixFootnotes = function () {
    return this.each(function () {
      var body = $(this)
      body.find('.footnote-ref a').each(function () {
        var link = $(this)
        var id = link.attr('href')
        var note = body.find(id)
        var text = note.text().replace(/(\s*\u21a9\s*)+$/, '')
        link.attr('title', text)
      })
    })
  }

  $.fn.addTitle = function () {
    return this.each(function () {
      var title = $(this).find('title')
      if (title.length === 0) {
        title = $('title')
      }
      var header = $(this).find('h1, h2, h3, h4, h5, h6, strong, b, em, i, p').first()
      if (header.length > 0) {
        var txt = header.removeAria().text().trim()
        title.html(txt)
      }
    })
  }
}(jQuery))
