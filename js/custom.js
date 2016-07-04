/* global $ */
var hljs = window.hljs
var attr = window.markdownItAttrs
var anchor = window.markdownItAnchor
var sub = window.markdownitSub
var sup = window.markdownitSup
var footnote = window.markdownitFootnote

var md = window.markdownit({
  html: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return '' // use external default escaping
  }
}).use(attr)
  .use(anchor, {permalink: true, permalinkBefore: true})
  .use(sub)
  .use(sup)
  .use(footnote)

function convert (markdown) {
  var html = md.render(markdown)
  $('.container').append(html)
}

function process (markdown) {
  convert(markdown)
  $('body').addFigures()
  $('body').addPunctuation()
  $('body').addCollapsibleSections({
    show: '\u25b2', // black up-pointing triangle
    hide: '\u25bc'  // black down-pointing triangle
  })
  $('html').addTitle()
}

$(function () {
  var iframe = $('iframe')
  iframe.hide()
  iframe.on('load', function () {
    var markdown = $(this).contents().text()
    process(markdown)
    $(this).remove()
  })
})
