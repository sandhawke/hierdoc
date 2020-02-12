# hierdoc - a simple document construction api
[![NPM version][npm-image]][npm-url]

Status: mostly works for me. Definitely not stable or "production quality"

We view a document as a tree of sections (and a section itself). Each
section has a title and a .html with its own content. The tree is
formed by the .children array in each section.  This code manages an
outer template, a table of contents, section headings (h1, h2, ...),
and more for each section. The .html content is included after the
section heading and before and child section headings and content.

So this code:

```js
const Doc = require('..')
const w3cStyle = require('../w3cHTML')

const d = new Doc(w3cStyle)
d.title = 'Hello, World!'
d.section('Greetings').html = '<p><i>Hello</i>, World</p>'
d.writeTo('hello.html')
```

Generates a W3C spec with this body:

---

<img src="https://hawkeworks.com/Screenshot_2020-02-11_19-49-58.png" />

---

In practice, for W3C style, you need to set some other fields, for all
the heading information. Right now this document style handles a VERY
small class of status and document features, because that's all I
need.

Why? Because sometimes, even though you totally
[respec](https://github.com/w3c/respec/wiki) the
[bikeshed](https://github.com/tabatkins/bikeshed) you've got, you want
another one.

More seriously, it's because I'm programmatically generating the
content and sometimes modifying it in place. I should probably just
figure out how to get respec to handle that, but ... that's not what I
did. It was fun.

This runs either in a node command-line environement, generating a static html
file, or in the browser, loading/updating content. See example/nest.js for doing both; turn it into static/bundle.js with

```terminal
$ watchify -o static/bundle.js example/nest.js
```

then load static/w3c.html to see it rendered.

[npm-image]: https://img.shields.io/npm/v/hierdoc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/hierdoc
