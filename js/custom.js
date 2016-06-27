/* global $ */
/* jshint asi:true */

var attr = window.markdownItAttrs
var anchor = window.markdownItAnchor
var sub = window.markdownitSub
var sup = window.markdownitSup
var hljs = window.hljs
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
})

// // Actual default values
// var md = require('markdown-it')({
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return hljs.highlight(lang, str).value;
//       } catch (__) {}
//     }

//     return ''; // use external default escaping
//   }
// });


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
  var iframe = $('iframe')
  iframe.hide()
  iframe.on('load', function () {
    var markdown = $(this).contents().text()
    process(markdown)
    $(this).remove()
  })
})
