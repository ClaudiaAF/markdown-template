/* global $, MathJax */
var hljs = window.hljs
var attr = window.markdownItAttrs
var anchor = window.markdownItAnchor
var sub = window.markdownitSub
var sup = window.markdownitSup
var footnote = window.markdownitFootnote
var mathjax = window.markdownitMathjax

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
  .use(mathjax)

function load (iframe) {
  var deferred = $.Deferred()
  iframe.hide()
  iframe.on('load', function () {
    var contents = iframe.contents().text()
    var div = $('<div>')
    div.text(contents)
    div.insertBefore(iframe)
    iframe.remove()
    deferred.resolve(div)
  })
  return deferred.promise()
}

function convert (container) {
  var markdown = container.text()
  var html = md.render(markdown)
  container.html(html)
  return container
}

function process (body) {
  $('body').addFigures()
  $('body').addPunctuation()
  $('body').addCollapsibleSections()
  $('html').addHangingPunctuation()
  $('body').fixAnchors()
  $('body').fixFootnotes()
  $('html').addTitle()
  MathJax.Hub.Queue(['Typeset', MathJax.Hub])
}

$(function () {
  load($('iframe')).then(convert).then(process)
})
