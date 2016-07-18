Markdown template
=================

> An interactive Markdown template based on
> [markdown-it](https://github.com/markdown-it/markdown-it).

Usage
-----

Edit `markdown.txt` in a text editor.

Open `index.html` in a browser to see the result.

Implementation
--------------

Locally, reading the contents of `markdown.txt` by using a hidden
`iframe` works well in Firefox and Internet Explorer, but not Chrome.
Chrome sets limitations on file access and requires both `index.html`
and `markdown.txt` to be hosted on a server, for example
[http-server](https://www.npmjs.com/package/http-server):

    $ npm install -g http-server
    $ http-server -p 80

This will host the files on <http://localhost/>.

The following implementations are available:

### `loadIframe()` (default)

-   Loads the
    [.contents()](http://stackoverflow.com/questions/1796619/how-to-access-the-content-of-an-iframe-with-jquery)
    of a hidden `iframe`
-   Requires the loaded file to have a file extension of `.txt`
-   When hosted on a web server, it works in Firefox, Chrome, Safari
    and Internet Explorer
-   When opened locally, it works in Firefox and Internet Explorer

### `loadAjax()`

-   Loads the file by means of [$.get()](https://api.jquery.com/jquery.get/)
-   The file can have any extension (e.g., `.md`)
-   However, `.txt` is still recommended since Firefox may store partial files in its download directory
-   When hosted on a web server, it works in Firefox, Chrome, Safari
    and Internet Explorer
-   When opened locally, it works in Firefox

Similar methods: ~~[$.load()](http://api.jquery.com/load/)~~,
    ~~[XMLHttpRequest](http://stackoverflow.com/questions/14446447/javascript-read-local-text-file)~~.

Miscellaneous
-------------

The example text is the article
[General Parser Combinators in Racket](https://epsil.github.io/gll/).

License
-------

[![License][license-image]][license-url]

Released under the MIT License. See the [LICENSE](LICENSE) file
for details.

[license-image]: https://img.shields.io/npm/l/markdownlint.svg
[license-url]: http://opensource.org/licenses/MIT
