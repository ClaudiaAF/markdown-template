var Handlebars = require('handlebars')

var templates = {}

templates.document = Handlebars.compile(
  '<!DOCTYPE html>\n' +
  '<html{{#if lang}} lang="{{lang}}"{{/if}}>\n' +
  '<head>\n' +
  '<title>{{text title}}</title>\n' +
  '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">\n' +
  '<meta content="text/css" http-equiv="Content-Style-Type">\n' +
  '<meta content="width=device-width, initial-scale=1" name="viewport">\n' +
  '<link href="{{urlResolve url "/favicon.ico"}}" rel="icon" type="image/x-icon">\n' +
  '<link href="index.txt" rel="alternate" title="Markdown" type="text/markdown">\n' +
  '{{#if css}}' +
  '<link href="{{urlResolve url css}}" rel="stylesheet" type="text/css">\n' +
  '{{/if}}' +
  '{{#if js}}' +
  '<script src="{{urlResolve url js}}" type="text/javascript"></script>\n' +
  '{{/if}}' +
  '{{#if mathjax}}' +
  '<script src="{{urlResolve url mathjax}}" type="text/x-mathjax-config"></script>\n' +
  '{{/if}}' +
  '<script async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML" type="text/javascript"></script>\n' +
  '<script src="{{urlResolve url "/js/markdown-template.js"}}"></script>\n' +
  '<style type="text/css">\n' +
  '{{{style}}}' +
  '</style>\n' +
  '</head>\n' +
  '<body>\n' +
  '{{{content}}}' +
  '</body>\n' +
  '</html>')

templates.body = Handlebars.compile(
  '<div class="container">\n' +
  '<article>\n' +
  '<header>\n' +
  '{{#if title}}' +
  '<h1 class="title">{{{title}}}</h1>\n' +
  '{{#if subtitle}}' +
  '<h2 class="title">{{{subtitle}}}</h2>\n' +
  '{{/if}}' +
  '{{#if date}}' +
  '<p><time><i class="fa fa-calendar-o"></i> {{dateFormat date}}</time></p>\n' +
  '{{/if}}' +
  '{{else}}' +
  '{{#if date}}' +
  '<h1 class="title">{{dateFormat date}}</h1>\n' +
  '{{/if}}' +
  '{{/if}}' +
  '</header>\n' +
  '<section id="content">\n' +
  '{{{content}}}' +
  '</section>\n' +
  '</article>\n' +
  '</div>')

module.exports = templates
