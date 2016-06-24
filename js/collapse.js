(function ($) {
  $.fn.addCollapsibleSections = function () {
    return this.each(function () {
      var show = '\u25bc'
      var hide = '\u25b2'
      for (var i = 6; i >= 1; i--) {
        var stop = []
        for (var j = 1; j <= i; j++) {
          stop.push('h' + j)
        }
        var next = stop.join(',')
        $(this).find('h' + i).each(function () {
          var header = $(this)
          var section = header.nextUntil(next)
          var div = section.wrapAll('<div>')
          var button = $('<span aria-hidden="true" class="collapse-button" title="Collapse">' + hide + '</span>')
          header.append(button)
          button.click(function () {
            if ($(this).text() === show) {
              $(this).text(hide)
              $(this).attr('title', 'Collapse')
              header.removeClass('collapsed')
            } else {
              $(this).text(show)
              $(this).attr('title', 'Expand')
              header.addClass('collapsed')
            }
            div.toggle()
            return false
          })
          if (header.hasClass('collapsed')) {
            button.click()
          }
        })
      }
    })
  }
}(jQuery))
