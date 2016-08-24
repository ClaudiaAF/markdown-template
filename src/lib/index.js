/* global MathJax, window */
var $ = require('jquery')
var URI = require('urijs')
var compile = require('./compile')

// address of current page
function url () {
  var url = window.location.href
  if (URI(url).protocol() === 'file') {
    return url
  }
  return URI(url).resource()
}

// enable MathJax rendering
function typeset (document) {
  if (typeof MathJax !== 'undefined') {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }
  return document
}

// replace <body> with HTML converted from Markdown
function convert (data) {
  var html = compile(data, url())
  // browser strips <html>, <head> and <body> tags
  html = html.replace('<head>', '<div class="head">')
             .replace('</head>', '</div>')
             .replace('<body>', '<div class="body">')
             .replace('</body>', '</div>')
  var doc = $('<div>').html(html)
  // add tags to <head>
  var head = $('head')
  var headDiv = doc.find('div.head')
  headDiv.find('link, style').appendTo(head)
  headDiv.find('title').each(function () {
    head.find('title').text($(this).text())
  })
  // add content to <body>
  var body = $('body')
  var bodyDiv = doc.find('div.body')
  body.html(bodyDiv.html())
  return $('html')
}

// read contents of <iframe>
function loadIframe (iframe) {
  var deferred = $.Deferred()
  var file = iframe.attr('src')
  if (!file.match(/\.txt$/)) {
    return loadAjax(iframe)
  }
  iframe.hide()
  iframe.on('load', function () {
    var contents = iframe.contents().text().trim()
    var div = $('<div style="display: none">')
    div.text(contents)
    div.insertBefore(iframe)
    iframe.remove()
    var data = div.text().trim()
    deferred.resolve(data)
  })
  return deferred.promise()
}

// read contents of file
function loadFile (file) {
  var deferred = $.Deferred()
  $.get(file, function (data) {
    deferred.resolve(data)
  }, 'text')
  return deferred.promise()
}

/* eslint-disable no-unused-vars */
function loadAjax (iframe) {
  var deferred = $.Deferred()
  iframe.hide()
  var src = iframe.attr('src')
  var div = $('<div style="display: none">')
  div.insertBefore(iframe)
  iframe.remove()
  loadFile(src).then(function (data) {
    div.text(data)
    deferred.resolve(data)
  })
  return deferred.promise()
}

// read Markdown from <iframe> or file and
// insert the converted HTML into the document
function loadData () {
  if (window.converted) {
    return
  }

  var file = 'index.txt'
  var iframe = $('iframe').first()
  if (iframe.length > 0) {
    // <body> contains <iframe src="index.txt">:
    // replace <iframe> with its converted contents
    loadIframe(iframe).then(convert).then(typeset)
  } else {
    // <body> contains no <iframe>:
    // get file from <link> element
    var link = $('link[type="text/markdown"]')
    if (link.length > 0) {
      file = link.attr('href')
      // replace <body> with converted data from file
      // loadFile(file).then(convert).then(process).then(typeset)
      loadFile(file).then(convert).then(typeset)
    } else {
      // fall-back: assume whole document is Markdown
      // (with an embedded <script> tag)
      var body = $('body')
      body.css({'visibility': 'hidden', 'white-space': 'pre'})
      var data = body.text()
      convert(data)
      typeset(body)
      body.css({'visibility': '', 'white-space': ''})
    }
  }

  window.converted = true
}

$(function () {
  loadData()
})
