Markdown template
=================

> An interactive Markdown template based on
> [markdown-it](https://github.com/markdown-it/markdown-it).

Usage
-----

Edit `markdown.txt` in a text editor.

Open `index.html` in a browser to see the result.

### Command line

To edit the Markdown:

    $ npm run edit

To view the result:

    $ npm start

To run tests:

    $ npm test

To do
-----

Reading the contents of `markdown.txt` by using an `iframe` works well
in Firefox and Internet Explorer, but not Chrome. Chrome sets
limitations on local file access and requires both `index.html` and
`markdown.txt` to be hosted on a server, for example
[http-server](https://www.npmjs.com/package/http-server):

    $ npm install -g http-server
    $ http-server -a localhost -p 80

This will host the files on <http://localhost/>.

Tested methods:
[iframe](http://stackoverflow.com/questions/1796619/how-to-access-the-content-of-an-iframe-with-jquery),
~~[$.get()](https://api.jquery.com/jquery.get/)~~,
~~[XMLHttpRequest](http://stackoverflow.com/questions/14446447/javascript-read-local-text-file)~~.

License
-------

[![License][license-image]][license-url]

Released under the MIT License. See the [LICENSE](LICENSE) file
for details.

[license-image]: https://img.shields.io/npm/l/markdownlint.svg
[license-url]: http://opensource.org/licenses/MIT
