/* global $ */
/* jshint asi:true */

var md = window.markdownit({ html: true, typographer: true })
var attr = window.markdownItAttrs
var sub = window.markdownitSub
var sup = window.markdownitSup
md.use(attr)
md.use(sub)
md.use(sup)

function convert (markdown) {
  var html = md.render(markdown)
  html = addLineBreaks(html)
  $('body').append(html)
}

function addLineBreaks (html) {
  return html.replace(/<\/p>\s*<p>/g, '<br><br>')
}

function floats () {
  $('p img').each(function () {
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
}

function headers () {
  var show = '\u25bc'
  var hide = '\u25b2'
  for (var i = 6; i >= 1; i--) {
    var stop = [];
    for (var j = 1; j <= i; j++) {
      stop.push('h' + j);
    }
    var next = stop.join(',')
    $('h' + i).each(function () {
      var header = $(this)
      var section = header.nextUntil(next)
      var div = section.wrapAll('<div></div>')
      var button = $('<span aria-hidden="true" title="Collapse">' + hide + '</span>')
      button.css({'color': '#999',
                  'cursor': 'pointer',
                  'float': 'right',
                  'margin-top': '0.3em',
                  'font-size': '0.8em'})
      header.append(button)
      button.click(function () {
        if ($(this).text() === show) {
          $(this).text(hide)
          $(this).attr('title', 'Collapse')
        } else {
          $(this).text(show)
          $(this).attr('title', 'Expand')
        }
        div.toggle()
      })
    })
  }
}

// https://github.com/kellym/smartquotesjs
function smartquotes () {
  var root = document.body
  var node = root.childNodes[0]
  while (node !== null) {
    if (node.nodeType === 3 && node.nodeName !== 'TEXTAREA') {
      node.nodeValue = node.nodeValue
        .replace(/([-([«\s]|^)"(\S)/g, '$1\u201c$2') // beginning "
        .replace(/"/g, '\u201d') // ending "
      // .replace(/([^0-9])"/g,'$1\u201d') // remaining " at end of word
        .replace(/([0-9])('|\u2019)([0-9])/g, '$1\u2032$3') // prime
        .replace(/([-([«\u201c\s]|^)('|\u2019)(\S)/g, '$1\u2018$3') // beginning '
        .replace(/'/ig, '\u2019') // ending '
      // .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3') // conjunction's possession
      // .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3') // abbrev. years like '93
      // .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe

        .replace(/<-+>/g, '\u2194') // double arrow
        .replace(/<=+>/g, '\u21D4')
        .replace(/-+>/g, '\u2192') // right arrow
        .replace(/==+>/g, '\u21D2')
        .replace(/<-+?/g, '\u2190') // left arrow
        .replace(/<==+/g, '\u21D0')
        .replace(/===/g, '\u2261')
        .replace(/---/g, '\u2014') // em-dashes
        .replace(/--/g, '\u2013') // en-dashes
        .replace(/ - /g, ' \u2013 ')
        .replace(/,-/g, ',\u2013')
        .replace(/\.\.\.\./g, '.\u2026') // ellipsis
        .replace(/\.\.\./g, '\u2026')
        .replace(/!=/g, '\u2260') // not equal
        .replace(/<=/g, '\u2264') // less than or equal
        .replace(/>=/g, '\u2265') // more than or equal
        .replace(/'''/g, '\u2034') // triple prime
        .replace(/("|'')/g, '\u2033') // double prime
        .replace(/'/g, '\u2032') // prime
        .replace(/<3/g, '\u2764') // heart
        .replace(/!! :\)/g, '\u203c\u032e') // smiley
        .replace(/:\)/g, '\u263a') // smiley
        .replace(/:\(/g, '\u2639') // frowning smiley
    }
    if (node.hasChildNodes() && (node.firstChild.nodeName !== 'CODE' ||
                                 node.firstChild.nodeName !== 'PRE' ||
                                 node.firstChild.nodeName !== 'TEXTAREA')) {
      node = node.firstChild
    } else {
      do {
        while (node.nextSibling === null && node !== root) {
          node = node.parentNode
        }
        node = node.nextSibling
      } while (node && (node.nodeName === 'CODE' ||
                        node.nodeName === 'PRE' ||
                        node.nodeName === 'SCRIPT' ||
                        node.nodeName === 'TEXTAREA' ||
                        node.nodeName === 'STYLE'))
    }
  }
}

function title () {
  var header = $('h1, h2, h3, h4, h5, h6').first()
  if (header.length > 0) {
    header = header.clone()
    header.find('[aria-hidden="true"]').remove()
    var txt = header.text().trim()
    $('title').html(txt)
  }
}

function process (markdown) {
  convert(markdown)
  floats()
  smartquotes()
  title()
}

$(function () {
  var iframe = $('iframe');
  iframe.hide();
  iframe.on('load', function () {
    var markdown = $(this).contents().text()
    process(markdown)
    $(this).remove()
  })
})
