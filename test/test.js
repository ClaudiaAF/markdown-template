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
      $.fn.addCollapsibleSections.button('\u25bc').prop('outerHTML').should.equal(
        '<span aria-hidden="true" class="collapse-button" title="Collapse">▼</span>')
    })
  })

  describe('addCollapsibleSections()', function () {
    it('should create button for each section', function () {
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
        '<h1>Header' +
        '<span aria-hidden="true" class="collapse-button slide" title="Collapse">▼</span>' +
        '</h1>' +
        '<div>' +
        '<p>Paragraph one</p>' +
        '<p>Paragraph two</p>' +
        '<h2>Subheader' +
        '<span aria-hidden="true" class="collapse-button slide" title="Collapse">▼</span>' +
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
