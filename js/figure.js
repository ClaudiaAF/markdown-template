(function ($) {
  $.fn.addFigures = function () {
    return this.each(function () {
      $(this).find('p img').each(function () {
        var img = $(this)
        var p = img.parent()
        var div = $('<div class="figure"></div>')
        var caption = $('<p class="caption">' +
                        img.attr('alt') + '</p>')
        div.insertBefore(p)
        div.addClass('figure')
        var width = parseInt(img.attr('width'))
        div.addClass(img.attr('class'))
        div.css('width', (width + 9) + 'px')
        div.append(img)
        div.append(caption)
        p.remove()
      })
    })
  }
}(jQuery))
