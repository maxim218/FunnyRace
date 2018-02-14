/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(8).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class StringContentManager {
    static normalChar(charParam) {
        const c = charParam.toLowerCase();
        const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
        return allowedChars.indexOf(c) !== -1;
    }

    static normalString(stringParam) {
        const s = stringParam;
        for(let i = 0; i < s.length; i++) {
            const c = s.charAt(i);
            if(StringContentManager.normalChar(c) === false) {
                return false;
            }
        }
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StringContentManager;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class AjaxWorker {
    static getBasicUrl() {
        return "http://localhost:5005/";
    }

    static sendPost(url, body, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", AjaxWorker.getBasicUrl() + url, true);
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(body));
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                const answer = xhr.responseText.toString();
                callback(answer);
                xhr = null;
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AjaxWorker;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_log_in_page_LogInPage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_log_in_page_log_in_page_scss__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_log_in_page_log_in_page_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__views_log_in_page_log_in_page_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_sign_up_page_SignUpPage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_sign_up_page_sign_up_page_scss__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_sign_up_page_sign_up_page_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_sign_up_page_sign_up_page_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_main_menu_page_MainMenuPage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_main_menu_page_main_menu_page_scss__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_main_menu_page_main_menu_page_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_main_menu_page_main_menu_page_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Router__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ElementsBase__ = __webpack_require__(21);














class Start {
    constructor() {
        this.createPages();
        this.createAndInitRouter();
        this.createAndInitElementsBase();
        this.addEventsToElements();
    }

    createPages() {
        this.logInPage = new __WEBPACK_IMPORTED_MODULE_0__views_log_in_page_LogInPage__["a" /* default */]();
        this.signInPage = new __WEBPACK_IMPORTED_MODULE_2__views_sign_up_page_SignUpPage__["a" /* default */]();
        this.mainMenuPage = new __WEBPACK_IMPORTED_MODULE_4__views_main_menu_page_MainMenuPage__["a" /* default */]();
    }

    createAndInitRouter() {
        this.router = new __WEBPACK_IMPORTED_MODULE_6__Router__["a" /* default */]();
        this.router.addPage("/log-in", document.querySelector(".log-in-page"));
        this.router.addPage("/sign-up", document.querySelector(".sign-up-page"));
        this.router.addPage("/main-menu", document.querySelector(".main-menu-page"));
        this.router.showPage();
    }

    createAndInitElementsBase() {
        this.elementsBase = new __WEBPACK_IMPORTED_MODULE_7__ElementsBase__["a" /* default */]();

        this.elementsBase.addElement("signUpLoginField", document.querySelector(".sign-up-page__form .form__login-input-field"));
        this.elementsBase.addElement("signUpPasswordField", document.querySelector(".sign-up-page__form .form__password-input-field"));
        this.elementsBase.addElement("signUpMessageBox", document.querySelector(".sign-up-page__message-box"));

        this.elementsBase.addElement("logInLoginField", document.querySelector(".log-in-page__form .form__login-input-field"));
        this.elementsBase.addElement("logInPasswordField", document.querySelector(".log-in-page__form .form__password-input-field"));
        this.elementsBase.addElement("logInMessageBox", document.querySelector(".log-in-page__message-box"));
    }

    addEventsToElements() {
        __WEBPACK_IMPORTED_MODULE_0__views_log_in_page_LogInPage__["a" /* default */].addEventsToElements(this.router, this.elementsBase);
        __WEBPACK_IMPORTED_MODULE_2__views_sign_up_page_SignUpPage__["a" /* default */].addEventsToElements(this.router, this.elementsBase);
    }
}

window.addEventListener("load", () => {
    new Start();
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_in_page_pug__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_in_page_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__log_in_page_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StringContentManager__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_AjaxWorker__ = __webpack_require__(4);






class LogInPage {
    constructor() {
        LogInPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += __WEBPACK_IMPORTED_MODULE_0__log_in_page_pug___default()();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".log-in-page__link-to-sign-up-page").addEventListener("click", () => {
            router.moveToPage("/sign-up");
        });

        document.querySelector(".form__log-in-button").addEventListener("click", () => {
            const login = elementsBase.getElement("logInLoginField").value;
            const password = elementsBase.getElement("logInPasswordField").value;

            const messageBox = elementsBase.getElement("logInMessageBox");
            messageBox.innerHTML = "";

            const messageArr = [];

            if(login.length === 0) {
                messageArr.push("Поле ввода логина пусто.");
            }

            if(__WEBPACK_IMPORTED_MODULE_1__modules_StringContentManager__["a" /* default */].normalString(login) === false) {
                messageArr.push("Поле ввода логина содержит запретные символы.")
            }

            if(password.length === 0) {
                messageArr.push("Поле ввода пароля пусто.");
            }

            if(__WEBPACK_IMPORTED_MODULE_1__modules_StringContentManager__["a" /* default */].normalString(password) === false) {
                messageArr.push("Поле ввода пароля содержит запретные символы.");
            }

            for(let i = 0; i < messageArr.length; i++) {
                const message = messageArr[i];
                const p = document.createElement('p');
                p.innerHTML = message;
                messageBox.appendChild(p);
            }

            if(messageArr.length === 0) {
                __WEBPACK_IMPORTED_MODULE_2__modules_AjaxWorker__["a" /* default */].sendPost("login/", {
                    loginField: login,
                    passwordField: password
                }, (result) => {
                    const message = JSON.parse(result).message;
                    if(message === "YES") {
                        router.moveToPage("/main-menu");
                    }
                    if(message === "NO") {
                        const h3 = document.createElement('h3');
                        h3.innerHTML = "Неверный логин или пароль.";
                        messageBox.appendChild(h3);
                    }
                });
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LogInPage;



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"log-in-page\" hidden\u003E\u003Ch2\u003ELog In Page\u003C\u002Fh2\u003E\u003Cform class=\"log-in-page__form\"\u003E\u003Cspan\u003ELogin\u003C\u002Fspan\u003E\u003Cbr\u003E\u003Cinput class=\"form__login-input-field\" type=\"text\" spellcheck=\"false\" autocomplete=\"off\" maxlength=\"10\" placeholder=\"Maxim\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cspan\u003EPassword\u003C\u002Fspan\u003E\u003Cbr\u003E\u003Cinput class=\"form__password-input-field\" type=\"password\" spellcheck=\"false\" autocomplete=\"off\" maxlength=\"10\" placeholder=\"secret123\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cinput class=\"form__log-in-button\" type=\"button\" value=\"Log In\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003Cspan class=\"log-in-page__link-to-sign-up-page\"\u003ESign Up Page\u003C\u002Fspan\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"log-in-page__message-box\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(10);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./log-in-page.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./log-in-page.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".log-in-page__form .form__login-input-field {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  background: white;\n  padding: 7px;\n  width: 300px;\n  border: 2px solid black;\n  outline: none;\n  border-radius: 5px;\n  margin-left: 10px; }\n\n.log-in-page__form .form__password-input-field {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  background: white;\n  padding: 7px;\n  width: 300px;\n  border: 2px solid black;\n  outline: none;\n  border-radius: 5px;\n  margin-left: 10px; }\n\n.log-in-page__form .form__log-in-button {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  padding: 7px;\n  border: 2px solid black;\n  border-radius: 5px;\n  outline: none;\n  cursor: pointer;\n  width: 200px; }\n\n.log-in-page__link-to-sign-up-page {\n  color: blueviolet;\n  cursor: pointer; }\n\n.log-in-page__message-box {\n  color: red; }\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sign_up_page_pug__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sign_up_page_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sign_up_page_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StringContentManager__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_AjaxWorker__ = __webpack_require__(4);






class SignUpPage {
    constructor() {
        SignUpPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += __WEBPACK_IMPORTED_MODULE_0__sign_up_page_pug___default()();
    }

    static addEventsToElements(router, elementsBase) {
        document.querySelector(".sign-up-page__link-to-log-in-page").addEventListener("click", () => {
            router.moveToPage("/log-in");
        });

        document.querySelector(".form__sign-up-button").addEventListener("click", () => {
            const login = elementsBase.getElement("signUpLoginField").value;
            const password = elementsBase.getElement("signUpPasswordField").value;

            const messageBox = elementsBase.getElement("signUpMessageBox");
            messageBox.innerHTML = "";

            const messageArr = [];

            if(login.length === 0) {
                messageArr.push("Поле ввода логина пусто.");
            }

            if(__WEBPACK_IMPORTED_MODULE_1__modules_StringContentManager__["a" /* default */].normalString(login) === false) {
                messageArr.push("Поле ввода логина содержит запретные символы.")
            }

            if(password.length === 0) {
                messageArr.push("Поле ввода пароля пусто.");
            }

            if(__WEBPACK_IMPORTED_MODULE_1__modules_StringContentManager__["a" /* default */].normalString(password) === false) {
                messageArr.push("Поле ввода пароля содержит запретные символы.");
            }

            for(let i = 0; i < messageArr.length; i++) {
                const message = messageArr[i];
                const p = document.createElement('p');
                p.innerHTML = message;
                messageBox.appendChild(p);
            }

            if(messageArr.length === 0) {
                __WEBPACK_IMPORTED_MODULE_2__modules_AjaxWorker__["a" /* default */].sendPost("signup/", {
                    loginField: login,
                    passwordField: password
                }, (result) => {
                    const message = JSON.parse(result).message;
                    if(message === "YES") {
                        const h3 = document.createElement('h3');
                        h3.innerHTML = "Регистрация прошла успешно.";
                        messageBox.appendChild(h3);
                    }
                    if(message === "NO") {
                        const h3 = document.createElement('h3');
                        h3.innerHTML = "Пользователь с таким логином уже есть в БД.";
                        messageBox.appendChild(h3);
                    }
                });
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SignUpPage;



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"sign-up-page\" hidden\u003E\u003Ch2\u003ESign Up Page\u003C\u002Fh2\u003E\u003Cform class=\"sign-up-page__form\"\u003E\u003Cspan\u003ELogin\u003C\u002Fspan\u003E\u003Cbr\u003E\u003Cinput class=\"form__login-input-field\" type=\"text\" spellcheck=\"false\" autocomplete=\"off\" maxlength=\"10\" placeholder=\"Alex\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cspan\u003EPassword\u003C\u002Fspan\u003E\u003Cbr\u003E\u003Cinput class=\"form__password-input-field\" type=\"password\" spellcheck=\"false\" autocomplete=\"off\" maxlength=\"10\" placeholder=\"secret123\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cinput class=\"form__sign-up-button\" type=\"button\" value=\"Sign Up\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003Cspan class=\"sign-up-page__link-to-log-in-page\"\u003ELog In Page\u003C\u002Fspan\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sign-up-page__message-box\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(15);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./sign-up-page.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./sign-up-page.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".sign-up-page__form .form__login-input-field {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  background: white;\n  padding: 7px;\n  width: 300px;\n  border: 2px solid black;\n  outline: none;\n  border-radius: 5px;\n  margin-left: 10px; }\n\n.sign-up-page__form .form__password-input-field {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  background: white;\n  padding: 7px;\n  width: 300px;\n  border: 2px solid black;\n  outline: none;\n  border-radius: 5px;\n  margin-left: 10px; }\n\n.sign-up-page__form .form__sign-up-button {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  padding: 7px;\n  border: 2px solid black;\n  border-radius: 5px;\n  outline: none;\n  cursor: pointer;\n  width: 200px; }\n\n.sign-up-page__link-to-log-in-page {\n  color: blueviolet;\n  cursor: pointer; }\n\n.sign-up-page__message-box {\n  color: red; }\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_menu_page_pug__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_menu_page_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_menu_page_pug__);




class MainMenuPage {
    constructor() {
        MainMenuPage.render();
    }

    static render() {
        document.querySelector(".center-box").innerHTML += __WEBPACK_IMPORTED_MODULE_0__main_menu_page_pug___default()();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainMenuPage;



/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"main-menu-page\" hidden\u003E\u003Ch2\u003EMain Menu Page\u003C\u002Fh2\u003E\u003Cform class=\"main-menu-page__form\"\u003E\u003Cinput class=\"form__single-player-game-button\" type=\"button\" value=\"Single player\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cinput class=\"form__multiplayer-game-button\" type=\"button\" value=\"Multiplayer\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cinput class=\"form__game-rules-button\" type=\"button\" value=\"Game rules\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003Cinput class=\"form__about-authors-button\" type=\"button\" value=\"About authors\"\u003E\u003Cdiv class=\"vertical-space\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(19);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./main-menu-page.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--2-2!./main-menu-page.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".form__single-player-game-button {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  padding: 7px;\n  border: 2px solid black;\n  border-radius: 5px;\n  outline: none;\n  cursor: pointer;\n  width: 350px; }\n\n.form__multiplayer-game-button {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  padding: 7px;\n  border: 2px solid black;\n  border-radius: 5px;\n  outline: none;\n  cursor: pointer;\n  width: 350px; }\n\n.form__game-rules-button {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  padding: 7px;\n  border: 2px solid black;\n  border-radius: 5px;\n  outline: none;\n  cursor: pointer;\n  width: 350px; }\n\n.form__about-authors-button {\n  color: black;\n  font-size: 20px;\n  font-family: Geneva, Arial, Helvetica, sans-serif;\n  padding: 7px;\n  border: 2px solid black;\n  border-radius: 5px;\n  outline: none;\n  cursor: pointer;\n  width: 350px; }\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Router {
    constructor() {
        this.listOfPages = [];

        window.addEventListener("popstate", () => {
            this.showPage();
        });
    }


    addPage(url, page) {
        this.listOfPages.push({
            url: url,
            page: page
        });
    }

    hidePages() {
        for(let i = 0; i < this.listOfPages.length; i++) {
            this.listOfPages[i].page.hidden = true;
        }
    }

    showPage() {
        this.hidePages();

        const url = window.location.pathname;

        for(let i = 0; i < this.listOfPages.length; i++) {
            if(url === this.listOfPages[i].url) {
                this.listOfPages[i].page.hidden = false;
                return;
            }
        }

        this.listOfPages[0].page.hidden = false;
        history.pushState({}, "", this.listOfPages[0].url);
    }

    moveToPage(url) {
        history.pushState({}, "", url);
        this.showPage();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ElementsBase {
    constructor() {
        this.elements = {};
    }

    addElement(elementName, element) {
        this.elements[elementName] = element;
    }

    getElement(elementName) {
        return this.elements[elementName];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementsBase;



/***/ })
/******/ ]);