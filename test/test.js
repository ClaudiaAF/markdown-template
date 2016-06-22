describe('collapse.js', function () {
  describe('addCollapsibleSections()', function () {
    it('should create a div element for each section', function () {
      var div = $('<div>' +
                  '<h1>Header</h1>' +
                  '<p>Paragraph one</p>' +
                  '<p>Paragraph two</p>' +
                  '<h2>Subheader</h2>' +
                  '<p>Paragraph three</p>' +
                  '<p>Paragraph four</p>' +
                  '</div>')
      assert.equal(div.addCollapsibleSections().html(),
                   '<h1>Header' +
                   '<span aria-hidden="true" class="collapse-button" title="Collapse">▲</span>' +
                   '</h1>' +
                   '<div>' +
                   '<p>Paragraph one</p>' +
                   '<p>Paragraph two</p>' +
                   '<h2>Subheader' +
                   '<span aria-hidden="true" class="collapse-button" title="Collapse">▲</span>' +
                   '</h2>' +
                   '<div>' +
                   '<p>Paragraph three</p>' +
                   '<p>Paragraph four</p>' +
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
      var html = div.addFigures().html()
      assert.isTrue(html ===
                    '<div style="width: 209px;" class="figure right">' +
                    '<img alt="Caption text" class="right" src="image.png" width="200">' +
                    '<p class="caption">Caption text</p>' +
                    '</div>' ||
                    html ===
                    '<div class="figure right" style="width: 209px; ">' +
                    '<img alt="Caption text" class="right" src="image.png" width="200">' +
                    '<p class="caption">Caption text</p>' +
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
      assert.equal(div.addPunctuation().html(),
                   '<p>“Tsk, tsk,” said the Hatter, “what a mess you’ve made.”</p>' +
                   '<p>“It is perfectly fine,” replied Alice calmly. “I will leave it for the garbage collection service to recover.”</p>')
    })

    it('should add horizontal ellipsis', function () {
      var div = $('<div>' +
                  '<p>Is that so...?</p>' +
                  '</div>')
      assert.equal(div.addPunctuation().html(),
                   '<p>Is that so…?</p>')
    })
  })
})

describe('title.js', function () {
  describe('removeAria()', function () {
    it('should remove header anchor', function () {
      var header = $('<h1><a aria-hidden="true" href="#">¶</a>Header</h1>')
      assert.equal(header.removeAria().text(),
                   'Header')
    })

    it('should remove collapse button', function () {
      var header = $('<h1>Header<span title="Collapse" class="collapse-button" aria-hidden="true">▲</span></h1>')
      assert.equal(header.removeAria().text(),
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
      assert.equal(div.addTitle().html(),
                   '<title>Header</title>' +
                   '<h1>Header</h1>' +
                   '<p>Paragraph</p>')
    })
  })
})