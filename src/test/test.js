/* global describe, it, $ */
describe('collapse.js', function () {
  describe('addSection()', function () {
    it('should create a section for a header', function () {
      var div = $('<div>' +
                  '<h1>Header</h1>' +
                  '<p>Paragraph one</p>' +
                  '<p>Paragraph two</p>' +
                  '</div>')
      var header = div.find('h1')
      $.fn.addCollapsibleSections.addSection(header)
      div.prop('outerHTML').should.equal(
        '<div>' +
        '<h1>Header</h1>' +
        '<div>' +
        '<p>Paragraph one</p>' +
        '<p>Paragraph two</p>' +
        '</div>' +
        '</div>')
    })
  })

  describe('button()', function () {
    it('should create a button as specified', function () {
      $.fn.addCollapsibleSections.button('Collapse', '\u25bc').prop('outerHTML').should.equal(
        '<span aria-hidden="true" class="collapse-button" title="Collapse"></span>')
    })
  })

  describe('addCollapsibleSections()', function () {
    it('should add button to each header except h1', function () {
      var div = $('<div>' +
                  '<h1>Header</h1>' +
                  '<p>Paragraph one</p>' +
                  '<p>Paragraph two</p>' +
                  '<h2>Subheader</h2>' +
                  '<p>Paragraph three</p>' +
                  '<p>Paragraph four</p>' +
                  '</div>')
      div.addCollapsibleSections().prop('outerHTML').should.equal(
        '<div>' +
        '<h1>Header</h1>' +
        '<div>' +
        '<p>Paragraph one</p>' +
        '<p>Paragraph two</p>' +
        '<h2>Subheader' +
        '<span aria-hidden="true" class="collapse-button slide" title="Collapse"></span>' +
        '</h2>' +
        '<div>' +
        '<p>Paragraph three</p>' +
        '<p>Paragraph four</p>' +
        '</div>' +
        '</div>' +
        '</div>')
    })
  })
})

describe('figure.js', function () {
  describe('addFigures()', function () {
    it('should add captions to images', function () {
      var div = $('<div>' +
                  '<p>' +
                  '<img alt="Caption text" class="right" src="image.png" width="200">' +
                  '</p>' +
                  '</div>')
      div.addFigures().prop('outerHTML').should.equal(
        '<div>' +
        '<div style="width: 209px;" class="figure right">' +
        '<img alt="Caption text" class="right" src="image.png" width="200">' +
        '<p class="caption">Caption text</p>' +
        '</div>' +
        '</div>')
    })

    it('should handle multiple images within a paragraph', function () {
      var div = $('<div>' +
                  '<p>' +
                  '<img alt="Caption text 1" class="right" src="image1.png" width="200">' +
                  '<img alt="Caption text 2" class="right" src="image2.png" width="200">' +
                  '</p>' +
                  '</div>')
      div.addFigures().prop('outerHTML').should.equal(
        '<div>' +
        '<div style="width: 209px;" class="figure right">' +
        '<img alt="Caption text 1" class="right" src="image1.png" width="200">' +
        '<p class="caption">Caption text 1</p>' +
        '</div>' +
        '<div style="width: 209px;" class="figure right">' +
        '<img alt="Caption text 2" class="right" src="image2.png" width="200">' +
        '<p class="caption">Caption text 2</p>' +
        '</div>' +
        '</div>')
    })

    it('should ignore captionless images', function () {
      var div = $('<div>' +
                  '<p>' +
                  '<img alt="" src="image.png">' +
                  '</p>' +
                  '</div>')
      div.addFigures().prop('outerHTML').should.equal(
        '<div>' +
        '<p>' +
        '<img alt="" src="image.png">' +
        '</p>' +
        '</div>')
    })
  })
})

describe('punctuation.js', function () {
  describe('addPunctuation()', function () {
    it('should add opening and closing quotation marks', function () {
      var div = $('<div>' +
                  '<p>"Tsk, tsk," said the Hatter, "what a mess you\'ve made."</p>' +
                  '<p>"It is perfectly fine," replied Alice calmly. "I will leave it for the garbage collection service to recover."</p>' +
                  '</div>')
      div.addPunctuation().prop('outerHTML').should.equal(
        '<div>' +
        '<p>“Tsk, tsk,” said the Hatter, “what a mess you’ve made.”</p>' +
        '<p>“It is perfectly fine,” replied Alice calmly. “I will leave it for the garbage collection service to recover.”</p>' +
        '</div>')
    })

    it('should add horizontal ellipsis', function () {
      var div = $('<div>' +
                  '<p>Is that so...?</p>' +
                  '</div>')
      div.addPunctuation().prop('outerHTML').should.equal(
        '<div>' +
        '<p>Is that so…?</p>' +
        '</div>')
    })
  })
})

describe('hanging.js', function () {
  describe('addHangingPunctuation()', function () {
    it('should detect opening double quotation marks', function () {
      var div = $('<div><p>“Tsk, tsk,” said the Hatter, “what a mess you’ve made.”</p></div>')
      div.addHangingPunctuation().prop('outerHTML').should.equal(
        '<div><p class="startsWithDoubleQuote">“Tsk, tsk,” said the Hatter, “what a mess you’ve made.”</p></div>')
    })

    it('should detect opening single quotation marks', function () {
      var div = $('<div><p>‘Tsk, tsk,’ said the Hatter, ‘what a mess you’ve made.’</p></div>')
      div.addHangingPunctuation().prop('outerHTML').should.equal(
        '<div><p class="startsWithSingleQuote">‘Tsk, tsk,’ said the Hatter, ‘what a mess you’ve made.’</p></div>')
    })
  })
})

describe('github.js', function () {
  describe('addForkButton.resource()', function () {
    it('should extract resource path', function () {
      $.fn.addForkButton.resource('http://www.example.org/foo/').should.equal('/foo/')
    })
  })

  describe('addForkButton.path()', function () {
    it('should extract relative path', function () {
      $.fn.addForkButton.path('http://www.example.org/foo/').should.equal('foo')
    })
  })

  describe('addForkButton.url()', function () {
    it('should simplify the address for root', function () {
      $.fn.addForkButton.url('http://epsil.github.io/').should.equal('https://github.com/epsil/epsil.github.io/')
    })

    it('should point to the Markdown source', function () {
      $.fn.addForkButton.url('http://epsil.github.io/2011/05/29/').should.equal('https://github.com/epsil/epsil.github.io/tree/master/2011/05/29/index.txt')
    })

    it('should ignore trailing slash', function () {
      $.fn.addForkButton.url('http://epsil.github.io/2011/05/29').should.equal('https://github.com/epsil/epsil.github.io/tree/master/2011/05/29/index.txt')
    })

    it('should ignore file:/// links', function () {
      $.fn.addForkButton.url('file:///test').should.equal('file:///test')
    })
  })
})

describe('util.js', function () {
  describe('removeAria()', function () {
    it('should remove header anchor', function () {
      var header = $('<h1><a aria-hidden="true" href="#">¶</a>Header</h1>')
      header.removeAria().text().should.equal(
        'Header')
    })

    it('should remove collapse button', function () {
      var header = $('<h1>Header<span title="Collapse" class="collapse-button" aria-hidden="true">▲</span></h1>')
      header.removeAria().text().should.equal(
        'Header')
    })
  })

  describe('fixAnchors()', function () {
    it('should add title attribute to header anchor', function () {
      var div = $('<div><h1><a aria-hidden="true" href="#"></a>Header</h1></div>')
      div.fixAnchors().prop('outerHTML').should.equal(
        '<div><h1><a title="Header" aria-hidden="true" href="#"></a>Header</h1></div>')
    })

    it('should remove anchor glyph', function () {
      var div = $('<div><h1><a aria-hidden="true" href="#">¶</a>Header</h1></div>')
      div.fixAnchors().prop('outerHTML').should.equal(
        '<div><h1><a title="Header" aria-hidden="true" href="#"></a>Header</h1></div>')
    })
  })

  describe('fixFootnotes()', function () {
    it('should add title attribute to footnote link', function () {
      var div = $('<div>' +
                  '<p>This is a test.<sup class="footnote-ref"><a id="fnref1" href="#fn1">[1]</a></sup></p>' +
                  '<hr class="footnotes-sep">' +
                  '<section class="footnotes">' +
                  '<ol class="footnotes-list">' +
                  '<li class="footnote-item" id="fn1"><p>This is a footnote. <a class="footnote-backref" href="#fnref1">↩</a></p>' +
                  '</li>' +
                  '</ol>' +
                  '</section>' +
                  '</div>')
      div.fixFootnotes().prop('outerHTML').should.equal(
        '<div>' +
        '<p>This is a test.<sup class="footnote-ref"><a title="This is a footnote." id="fnref1" href="#fn1">[1]</a></sup></p>' +
        '<hr class="footnotes-sep">' +
        '<section class="footnotes">' +
        '<ol class="footnotes-list">' +
        '<li class="footnote-item" id="fn1"><p>This is a footnote. <a class="footnote-backref" href="#fnref1">↩</a></p>' +
        '</li>' +
        '</ol>' +
        '</section>' +
        '</div>')
    })

    it('should handle multiple usages of the same footnote', function () {
      var div = $('<div>' +
                  '<p>This is a test.<sup class="footnote-ref"><a id="fnref1" href="#fn1">[1]</a></sup> Same footnote again.<sup class="footnote-ref"><a id="fnref2" href="#fn1">[1]</a></sup></p>' +
                  '<hr class="footnotes-sep">' +
                  '<section class="footnotes">' +
                  '<ol class="footnotes-list">' +
                  '<li class="footnote-item" id="fn1"><p>This is a footnote. <a class="footnote-backref" href="#fnref1">↩</a> <a class="footnote-backref" href="#fnref2">↩</a></p>' +
                  '</li>' +
                  '</ol>' +
                  '</section>' +
                  '</div>')
      div.fixFootnotes().prop('outerHTML').should.equal(
        '<div>' +
        '<p>This is a test.<sup class="footnote-ref"><a title="This is a footnote." id="fnref1" href="#fn1">[1]</a></sup> Same footnote again.<sup class="footnote-ref"><a title="This is a footnote." id="fnref2" href="#fn1">[1]</a></sup></p>' +
        '<hr class="footnotes-sep">' +
        '<section class="footnotes">' +
        '<ol class="footnotes-list">' +
        '<li class="footnote-item" id="fn1"><p>This is a footnote. <a class="footnote-backref" href="#fnref1">↩</a> <a class="footnote-backref" href="#fnref2">↩</a></p>' +
        '</li>' +
        '</ol>' +
        '</section>' +
        '</div>')
    })
  })

  describe('addTitle()', function () {
    it('should set title to first header', function () {
      var div = $('<div>' +
                  '<head>' +
                  '<title></title>' +
                  '</head>' +
                  '<body>' +
                  '<h1>Header</h1>' +
                  '<p>Paragraph</p>' +
                  '</body>' +
                  '</div>')
      div.addTitle().prop('outerHTML').should.equal(
        '<div>' +
        '<title>Header</title>' +
        '<h1>Header</h1>' +
        '<p>Paragraph</p>' +
        '</div>')
    })
  })
})
