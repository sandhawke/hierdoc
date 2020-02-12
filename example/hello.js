const Doc = require('..')
const w3cStyle = require('../w3cHTML')

const d = new Doc(w3cStyle)
d.title = 'Hello, World!'
d.section('Greetings').html = '<p><i>Hello</i>, World</p>'
d.writeTo('hello.html')

