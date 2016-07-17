/* global jQuery */
(function ($) {
  $.fn.addFigures = function () {
    return this.each(function () {
      $(this).find('p img').each(function () {
        var img = $(this)
        var alt = img.attr('alt')

        // ignore images without a caption
        if (alt === '') {
          return
        }

        // create figure div
        var p = img.parent()
        var div = $('<div class="figure"></div>')
        var caption = $('<p class="caption">' + alt + '</p>')
        div.append(img)
        div.append(caption)

        // add classes
        div.addClass('figure')
        div.addClass(img.attr('class'))
        if (img.is('[width]')) {
          var width = parseInt(img.attr('width'))
          div.css('width', (width + 9) + 'px')
        }

        // insert into DOM
        div.insertBefore(p)
        if (p.is(':empty')) {
          p.remove()
        }
      })
    })
  }
}(jQuery))
