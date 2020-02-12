(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
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


},{"..":4,"../w3cHTML":9}],4:[function(require,module,exports){
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


},{"debug":5,"fs":1,"when-dom-ready":8}],5:[function(require,module,exports){
(function (process){
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = require('./common')(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

}).call(this,require('_process'))
},{"./common":6,"_process":2}],6:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = require('ms');

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;

},{"ms":7}],7:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],8:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.whenDomReady = factory());
}(this, (function () { 'use strict';

/* eslint no-void: "off" */

// Loaded ready states
var loadedStates = ['interactive', 'complete'];

// Return Promise
var whenDomReady = function whenDomReady(cb, doc) {
	return new Promise(function (resolve) {
		// Allow doc to be passed in as the lone first param
		if (cb && typeof cb !== 'function') {
			doc = cb;
			cb = null;
		}

		// Use global document if we don't have one
		doc = doc || window.document;

		// Handle DOM load
		var done = function done() {
			return resolve(void (cb && setTimeout(cb)));
		};

		// Resolve now if DOM has already loaded
		// Otherwise wait for DOMContentLoaded
		if (loadedStates.indexOf(doc.readyState) !== -1) {
			done();
		} else {
			doc.addEventListener('DOMContentLoaded', done);
		}
	});
};

// Promise chain helper
whenDomReady.resume = function (doc) {
	return function (val) {
		return whenDomReady(doc).then(function () {
			return val;
		});
	};
};

return whenDomReady;

})));


},{}],9:[function(require,module,exports){

function headFunction ({title, canonicalURL}) {
  return (`<!DOCTYPE html><html dir="ltr" lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>${title}</title>
  <link rel="canonical" href="${canonicalURL | ''}" />
  <script src="./openup.js"></script>
  <link rel="stylesheet" href="./part1.css" />
  <link rel="stylesheet" href="respec-mainstyle.css" />
  <link rel="stylesheet" href="./part2.css" />
  <link rel="stylesheet" href="https://www.w3.org/StyleSheets/TR/2016/base" />
  <link rel="stylesheet" href="./spinner.css" />
  <link rel="stylesheet" href="./tooltip.css" />
  <link rel="stylesheet" href="./part3.css" />
</head>
    <body class="h-entry informative">
`)
}

function bodyFunction ({title, abstract, toc, main, isodate, w3cdate, statusName, repo, status, editor, dts = '', date}) {
  const now = date || new Date()
  const month = now.toLocaleDateString('en-US', { month: 'long' })
  if (!w3cdate) w3cdate = `${now.getDate()} ${month} ${now.getYear()+1900}`
  if (!isodate) isodate =  now.toISOString().slice(0,10)
  return `
  <div class="head">
  <a class="logo" href="https://www.w3.org/"><img alt="W3C" src="https://www.w3.org/StyleSheets/TR/2016/logos/W3C" width="72" height="48" /></a> <h1 id="title" class="title p-name">${title}</h1>
      
      <h2>
        W3C ${statusName},
        <time class="dt-published" datetime="${isodate}">${w3cdate}</time>
      </h2>
      <dl>
${dts}
        <!--
        <dt>This version:</dt><dd>
                <a class="u-url" href="https://www.w3.org/TR/2019/UN-credweb-20191124/">https://www.w3.org/TR/2019/UN-credweb-20191124/</a>
              </dd><dt>Latest published version:</dt><dd>
                <a href="https://www.w3.org/TR/credweb/">https://www.w3.org/TR/credweb/</a>
              </dd>
        <dt>Latest editor's draft:</dt><dd><a href="https://credweb.org/signals">https://credweb.org/signals</a></dd>
        
        
        
        
        <dt>Previous version:</dt><dd><a href=""></a></dd>
        -->
        <dt>Editor:</dt>
        <dd class="p-author h-card vcard"><span class="p-name fn">${editor}</span></dd>
        
        
        <dt>Participate:</dt><dd>
      <a href="https://github.com/${repo}/">GitHub ${repo}</a>
    </dd><dd>
      <a href="https://github.com/${repo}/issues/">File a bug</a>
    </dd>
      </dl>
      
      
      
      <p class="copyright">
      <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Copyright">Copyright</a>
      ©
      2020
      
      <a href="https://www.w3.org/"><abbr title="World Wide Web Consortium">W3C</abbr></a><sup>®</sup> (<a href="https://www.csail.mit.edu/"><abbr title="Massachusetts Institute of Technology">MIT</abbr></a>,
      <a href="https://www.ercim.eu/"><abbr title="European Research Consortium for Informatics and Mathematics">ERCIM</abbr></a>, <a href="https://www.keio.ac.jp/">Keio</a>,
      <a href="https://ev.buaa.edu.cn/">Beihang</a>). 
      W3C <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer">liability</a>,
      <a href="https://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks">trademark</a> and <a rel="license" href="https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document">permissive document license</a> rules
      apply.
    </p>
      <hr title="Separator for header" />
    </div>
  <div id="abstract" class="introductory"><h2>Abstract</h2>
${abstract}</div>
  <div id="sotd" class="introductory"><h2>Status of This Document</h2><p><em>This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current <abbr title="World Wide Web Consortium">W3C</abbr> publications and the latest revision of this technical report can be found in the <a href="https://www.w3.org/TR/"><abbr title="World Wide Web Consortium">W3C</abbr> technical reports index</a> at https://www.w3.org/TR/.</em></p>${status || ''}
      
    <p>
      <a href="https://github.com/${repo}/issues/">GitHub Issues</a> are preferred for
            discussion of this specification.
          
    </p><p>
      Publication as a  does not imply endorsement by the
      <abbr title="World Wide Web Consortium">W3C</abbr> Membership. This is a draft document and may be updated, replaced or
      obsoleted by other documents at any time. It is inappropriate to cite this
      document as other than work in progress.
    </p><p>
      
        This document was produced by a group
        operating under the
        <a href="https://www.w3.org/Consortium/Patent-Policy/"><abbr title="World Wide Web Consortium">W3C</abbr> Patent Policy</a>.
       The group does not expect this document to become a <abbr title="World Wide Web Consortium">W3C</abbr> Recommendation.
      
                  <abbr title="World Wide Web Consortium">W3C</abbr> maintains a
                  <a rel="disclosure" href="">public list of any patent disclosures</a>
            made in connection with the deliverables of
            the group; that page also includes
            instructions for disclosing a patent. An individual who has actual
            knowledge of a patent which the individual believes contains
            <a href="https://www.w3.org/Consortium/Patent-Policy/#def-essential">Essential Claim(s)</a>
            must disclose the information in accordance with
            <a href="https://www.w3.org/Consortium/Patent-Policy/#sec-Disclosure">section 6 of the <abbr title="World Wide Web Consortium">W3C</abbr> Patent Policy</a>.
          
      
    </p><p>
                  This document is governed by the
                  <a id="w3c_process_revision" href="https://www.w3.org/2019/Process-20190301/">1 March 2019 <abbr title="World Wide Web Consortium">W3C</abbr> Process Document</a>.
  </p></div>
  <nav id="toc">
    <h2 class="introductory" id="table-of-contents">Table of Contents</h2>
    <ol class="toc" id="toc-ol">${toc || ''}</ol>
  </nav>
  <div id="main">${main || ''}</div>

  <p role="navigation" id="back-to-top"><a href="#title"><abbr title="Back to Top">↑</abbr></a></p><script src="https://www.w3.org/scripts/TR/2016/fixup.js"></script>
</body></html>
`}

module.exports = { headFunction, bodyFunction }


},{}]},{},[3]);
