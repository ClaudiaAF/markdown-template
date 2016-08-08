/* global $, MathJax */
var hljs = window.hljs
var attr = window.markdownItAttrs
var anchor = window.markdownItAnchor
var sub = window.markdownitSub
var sup = window.markdownitSup
var footnote = window.markdownitFootnote
var abbr = window.markdownitAbbr
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
  .use(abbr)
  .use(mathjax)

function loadIframe (iframe) {
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

/* eslint-disable no-unused-vars */
function loadAjax (iframe) {
  var deferred = $.Deferred()
  iframe.hide()
  var src = iframe.attr('src')
  var div = $('<div>')
  div.insertBefore(iframe)
  iframe.remove()
  $.get(src, function (data) {
    div.text(data)
    deferred.resolve(div)
  }, 'text')
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
  $('html').addCollapsibleSections()
  $('html').addHangingPunctuation()
  $('body').fixAnchors()
  $('body').fixFootnotes()
  $('body').removeEmptyTableHeaders()
  $('html').addTitle()
  $('html').addForkButton()
  MathJax.Hub.Queue(['Typeset', MathJax.Hub])
}

$(function () {
  loadIframe($('iframe')).then(convert).then(process)
})
