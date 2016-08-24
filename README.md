Markdown template
=================

> An interactive Markdown template based on
> [markdown-it](https://github.com/markdown-it/markdown-it).

Usage
-----

### Method #1: `.txt` file and `.html` file

Create a text file called `index.txt` and put `index.html` in the same folder.

To edit the document, open `index.txt` in a text editor.

To view the document, open `index.html` in a browser.

### Method #2: `.md.html` file

Create a file called `index.md.html` that contains the document text followed by a `<script>` link:

    This is a *Markdown* document.

    ...

    <meta charset="utf-8"><script src="markdown-template.js"></script><script src="https://github.com/epsil/markdown-template/raw/webpack/src/js/markdown-template.js"></script>

To edit the document, open `index.md.html` in a text editor.

To view the document, open `index.md.html` in a browser.

(If `markdown-template.js` is stored locally in the same folder, it performs the conversion; otherwise, the code is downloaded from the Internet.)

### Method #3: Convert manually

It is also possible to invoke the template from the command line. To convert `index.txt` to `index.html`, do:

    $ node src/lib/build.js index.txt index.html

Implementation
--------------

The code reads the contents of `index.txt` by using a hidden `iframe`.
Locally, this works very well in Firefox. Chrome, however, imposes
restrictions on local file access. A workaround is to host the files
on a local HTTP server, for example
[http-server](https://www.npmjs.com/package/http-server):

    $ npm install -g http-server
    $ http-server -a localhost -p 80

Run these commands in the directory containing `index.html` and
`index.txt`. The template is now available from <http://localhost/>.

The following implementations are available:

### `loadIframe()` (default)

-   Loads the
    [.contents()](http://stackoverflow.com/questions/1796619/how-to-access-the-content-of-an-iframe-with-jquery)
    of a hidden `iframe`
-   Requires the loaded file to have a file extension of `.txt`
-   Locally:
    -   Works in Firefox and Internet Explorer
-   On a server:
    -   Works in Firefox, Chrome, Safari and Internet Explorer

### `loadAjax()`

-   Loads the file with [$.get()](https://api.jquery.com/jquery.get/)
-   The file can have any extension (e.g., `.md`)
-   Locally:
    -   Works in Firefox
-   On a server:
    -   Works in Firefox, Chrome, Safari and Internet Explorer
    -   Can use any file extension

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
