const Doc = require('..')
const w3cStyle = require('../w3cHTML')

const d = new Doc(w3cStyle)
d.title = 'Testing Nesting'
let s = d
let n = 1

s = s.section('Going deeper ' + (n++))
s = s.section('Going deeper ' + (n++))
s = s.section('Going deeper ' + (n++))
s = s.section('Going deeper ' + (n++))
s = s.section('Going deeper ' + (n++))


s = d

s = s.section('Second Dive ' + (n++))
s = s.section('Second Dive ' + (n++))
s.section('branch 1A')
s.section('branch 1B')
s = s.section('Second Dive ' + (n++))
s = s.section('Second Dive ' + (n++))
s.section('branch 1A')
s.section('branch 1B')
s = s.section('Second Dive ' + (n++))


if (typeof window) {
  d.sync()
} else {
  d.writeTo('hello.html')
}

