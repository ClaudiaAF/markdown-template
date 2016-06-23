/* global $ */
/* jshint asi:true */

var md = window.markdownit({ html: true, typographer: true })
var attr = window.markdownItAttrs
var anchor = window.markdownItAnchor
var sub = window.markdownitSub
var sup = window.markdownitSup

md.use(attr)
md.use(anchor, {permalink: true, permalinkBefore: true})
md.use(sub)
md.use(sup)

function convert (markdown) {
  var html = md.render(markdown)
  $('.container').append(html)
}

function process (markdown) {
  convert(markdown)
  $('body').addFigures()
  $('body').addPunctuation()
  $('body').addCollapsibleSections()
  $('html').addTitle()
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
