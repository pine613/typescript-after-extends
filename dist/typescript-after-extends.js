/*!
 * typescript-after-extends
 * (C) 2014 Pine Mizune / MIT License
 */(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["TypeScriptAfterExtends"] = factory();
	else
		root["TypeScriptAfterExtends"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Mixin
	 */
	function mixin (self, other, withoutProto) {
	    for (var key in other) {
	        if (other.hasOwnProperty(key)) {
	            if (key !== 'prototype' || !withoutProto) {
	                var d = Object.getOwnPropertyDescriptor(other, key);
	                Object.defineProperty(self, key, d);
	            }
	        }
	    }
	}

	/**
	 * Create named class with extends
	 */
	function createNamedClass (name, klass, baseKlass, superFunc) {
	    if (!superFunc) {
	        superFunc = function () {
	            baseKlass.call(this);
	        };
	    }
	    
	    return new Function(
	        'klass', 'superFunc',
	        'return function ' + name + ' () {' +
	            'superFunc.apply(this, arguments);' +
	            'klass.apply(this, arguments);' +
	        '};'
	        )(klass, superFunc);
	}

	/**
	 * Create prototype
	 */
	function createPrototype (klass, baseKlass, newKlass) {
	    var __ = function () { this.constructor = newKlass; };

	    __.prototype = baseKlass.prototype;
	    mixin(__.prototype, klass.prototype);

	    return new __();
	}

	/**
	 * TypeScript extends later
	 */
	function afterExtends (klass, baseKlass, superFunc) {
	    var newKlass = createNamedClass(klass.name, klass, baseKlass, superFunc);
	    newKlass.prototype = createPrototype(klass, baseKlass, newKlass);
	    
	    return newKlass;
	}

	module.exports = afterExtends;

/***/ }
/******/ ])
});
