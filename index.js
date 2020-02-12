// const emerj = require('emXXerj')
const fs = require('fs')
const whenDomReady = require('when-dom-ready')
const debug = require('debug')('hierdoc')

const $ = (selector, elem) => {
  if (elem === undefined) elem = document
  return elem.querySelector(selector)
}

class Section {
  constructor () {
    this.children = []
    this.out = []
  }

  section (title, id) {
    const s = new Section()
    s.title = title
    s.id = id
    this.children.push(s)
    return s
  }

  removeChild (child) {
    const index = this.children.indexOf(child)
    if (index < 0) throw Error('attempt to remove unknown child')
    this.children.splice(index, 1)
  }

  sectionById (id) {
    if (this.id === id) return this
    for (const child of this.children) {
      const r = child.sectionById(id)
      if (r) return r
    }
    return undefined
  }
}

class Doc extends Section {
  constructor (config) {
    super ()
    if (config) Object.assign(this, config)
    this.counter = 0
  }

  genId (title, section) {
    let n = 1
    let base = (title
              .replace(/[^a-zA-Z0-9]/g, '-')
              .replace(/-+/g, '-')
              .replace(/(^-)|(-$)/, '')
              .toLowerCase())
    while (true) {
      let id = base
      if (n > 1) id = base + '-' + n
      if (this.sectionById(id)) {
        n++
      } else {
        return id
      }
    }
  }

  assemble () {
    const toc = []
    const main = []
    
    const secNoArray = [0]  
    let prevLevel = 1

    const doSection = (s, path) => {
      if (!s.id) {
        s.id = this.genId(s.title, s)
        console.log('assigned s.id = ', s.id)
      }
      
      s.hLevel = path.length
      
      if (!s.title) throw Error('no section title: ' + JSON.stringify(s))

      if (s.hLevel > prevLevel) {
        debug('toc +', s.hLevel, prevLevel, secNoArray, s.title)
        toc.push('<ol class="toc">')
        toc.push('<li class="tocline">')
        secNoArray.push(1)
      } else if (s.hLevel < prevLevel) {
        debug('toc -', s.hLevel, prevLevel, secNoArray, s.title)
        toc.push('</li></ol>')
        secNoArray.pop()
        secNoArray[secNoArray.length - 1]++
      } else {
        debug('toc =', s.hLevel, prevLevel, secNoArray, s.title)
        secNoArray[secNoArray.length - 1]++
        if (secNoArray[secNoArray.length - 1] > 1) toc.push('</li>')
        toc.push('<li class="tocline">')
      }
      prevLevel = s.hLevel
      s.secno = secNoArray.join('.')

      if (!s.notoc) toc.push(`<a href="#${s.id}"><bdi class="secno">${s.secno}. </bdi>${s.title}</a>`)

      const spans = []
      /*
        for (const id of s.otherIds) {
        // make HTML targets for all our aliases
        spans.push(`<span id="${id}"></span>`)
        }
      */

      main.push('\n\n<section>\n')
      main.push(`<h${s.hLevel}><span id="${s.id}"><a class="subtle" href="#${s.id}"><span style="font-size:75%">§</span> ${spans.join('')}<bdi class="secno">${s.secno}. </bdi>${s.title}</a></span></h${s.hLevel}>`)
      main.push('')

      if (s.html) main.push(s.html)
      main.push(...s.out)
      
      if (path.length > 10) {
        main.push('<h1>LOOP IN CATEGORIES</h1>')
        console.error('loop', s)
      } else {
        for (const sub of s.children) {
          doSection(sub, path.concat([sub]))
        }
      }
      
      main.push('\n</section>\n')
    }

    // root doesnt go in TOC, so we don't want doSection(this, [this])
    
    for (const sub of this.children) {
      debug('root do-section', sub.title)
      doSection(sub, [sub])
      while(prevLevel > 1) {
        toc.push('</li></ol>')
        prevLevel--
        secNoArray.pop()
      }
    }

    this.toc = toc.map(x => x.toString()).join('\n')
    this.main = main.map(x => x.toString()).join('')
  }

  async sync () {
    this.assemble()
    await whenDomReady()
    if (!this.firstSync) {
      $('.erase-on-start').innerHTML = ''
      $('#w3cbody').innerHTML = this.bodyFunction(this)
      $('title').innerHTML = this.title
      this.firstSync = false
    }
    // emerj.merge($('#toc-ol'), this.toc)
    // emerj.merge($('#main'), this.main)
    $('#toc-ol').html = this.toc
    $('#main').html = this.main
  }

  writeTo (filename) {
    const toc = this.assemble()
    const html = this.headFunction(this) + this.bodyFunction(this)
    fs.writeFileSync(filename, html)
    console.error('opn', filename)
  }
}

module.exports = Doc

