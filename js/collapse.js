/* global jQuery */
(function ($) {
  $.fn.addCollapsibleSections = function (options) {
    var opts = $.extend({}, $.fn.addCollapsibleSections.defaults, options)

    return this.each(function () {
      var body = $(this)
      // process innermost sections first
      $.each(['h6', 'h5', 'h4', 'h3', 'h2', 'h1'],
             function (i, el) {
               var end = $.fn.addCollapsibleSections.endOfSection(el)
               body.find(el).each(function () {
                 // add section
                 var header = $(this)
                 var section = header.nextUntil(end)
                 section = section.wrapAll('<div>')

                 // add button
                 var button = $('<span aria-hidden="true" class="collapse-button" title="Collapse">' + opts.hide + '</span>')
                 header.append(button)

                 // add click handler
                 button.click($.fn.addCollapsibleSections.clickHandler(button, header, section, opts.show, opts.hide))

                 // allow pre-collapsed sections
                 if (header.hasClass('collapsed')) {
                   button.click()
                 }
               })
             })
    })
  }

  // end of section
  $.fn.addCollapsibleSections.endOfSection = function (el) {
    // h1 ends at next h1,
    // h2 ends at next h1 or h2,
    // h3 ends at next h1, h2 or h3,
    // and so on
    var i = parseInt(el.match(/\d+/)[0])
    var stop = []
    for (var j = 1; j <= i; j++) {
      stop.push('h' + j)
    }
    return stop.join(', ')
  }

  // click handler
  $.fn.addCollapsibleSections.clickHandler = function (button, header, section, show, hide) {
    return function () {
      if (button.text() === show) {
        button.text(hide)
        button.attr('title', 'Collapse')
        header.removeClass('collapsed')
      } else {
        button.text(show)
        button.attr('title', 'Expand')
        header.addClass('collapsed')
      }
      section.toggle()
      return false
    }
  }

  // Default options
  $.fn.addCollapsibleSections.defaults = {
    show: '\u25bc', // black down-pointing triangle
    hide: '\u25b2'  // black up-pointing triangle
  }
}(jQuery))
