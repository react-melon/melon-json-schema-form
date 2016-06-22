/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.pointer = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.get = get;
    exports.set = set;
    exports.remove = remove;
    exports.dict = dict;
    exports.walk = walk;
    exports.has = has;
    exports.escape = escape;
    exports.unescape = unescape;
    exports.parse = parse;
    exports.compile = compile;

    /**
     * @file json pointer utility tool
     * @author leon(ludafa@outlook.com)
     */

    /**
     * Lookup a json pointer in an object
     *
     * @param {Object} obj obj
     * @param {string|Array<string>} pointer pointer
     * @return {*}
     */
    function get(obj, pointer) {

        var refTokens = Array.isArray(pointer) ? pointer : parse(pointer);

        for (var i = 0; i < refTokens.length; ++i) {

            var token = refTokens[i];

            if (!((typeof obj === 'undefined' ? 'undefined' : babelHelpers['typeof'](obj)) === 'object' && token in obj)) {
                throw new Error('Invalid reference token: ' + token);
            }

            obj = obj[token];
        }

        return obj;
    }

    /**
     * Sets a value on an object
     *
     * @param {Object} obj obj
     * @param {string|Array<string>} pointer pointer
     * @param {*} value value
     */
    function set(obj, pointer, value) {

        if (pointer == null) {
            return;
        }

        var tokens = Array.isArray(pointer) ? pointer : parse(pointer);
        var nextToken = tokens[0];

        for (var i = 0, len = tokens.length; i < len - 1; ++i) {

            var token = tokens[i];

            if (token === '-' && Array.isArray(obj)) {
                token = obj.length;
            }

            nextToken = tokens[i + 1];

            if (!(token in obj)) {

                if (nextToken.match(/^(\d+|-)$/)) {
                    obj[token] = [];
                } else {
                    obj[token] = {};
                }
            }

            obj = obj[token];
        }

        if (nextToken === '-' && Array.isArray(obj)) {
            nextToken = obj.length;
        }

        obj[nextToken] = value;
    }

    /**
     * Removes an attribute
     *
     * @param {Object} obj obj
     * @param {string|Array<string>} pointer pointer
     */
    function remove(obj, pointer) {

        var refTokens = Array.isArray(pointer) ? pointer : parse(pointer);
        var finalToken = refTokens[refTokens.length - 1];

        if (finalToken === void 0) {
            throw new Error('Invalid JSON pointer for remove: "' + pointer + '"');
        }

        delete get(obj, refTokens.slice(0, -1))[finalToken];
    }

    /**
     * Return a (pointer -> value) dictionary for an object
     *
     * @param {Object} obj obj
     * @param {Function} descend descend
     * @return {Object}
     */
    function dict(obj, descend) {
        var results = {};
        walk(obj, function (value, pointer) {
            results[pointer] = value;
        }, descend);
        return results;
    }

    var toString = Object.prototype.toString;

    /**
     * Iterates over an object
     * Iterator: function (value, pointer) {}
     *
     * @param {Object} obj obj
     * @param {Function} iterator iterator
     * @param {Function} descend descend
     */
    function walk(obj, iterator, descend) {

        var tokens = [];

        descend = descend || function (value) {
            var type = toString.call(value).slice(8, -1);
            return type === 'Object' || type === 'Array';
        };

        function next(cur) {
            Object.keys(cur, function (key) {

                var value = cur[key];

                tokens.push(key);

                if (descend(value)) {
                    next(value);
                } else {
                    iterator(value, compile(tokens));
                }

                tokens.pop();
            });
        }

        next(obj);
    }

    /**
     * Tests if an object has a value for a json pointer
     *
     * @param {Object} obj     obj
     * @param {string} pointer pointer
     * @return {boolean}
     */
    function has(obj, pointer) {
        try {
            get(obj, pointer);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Escapes a reference token
     *
     * @param {string} str str
     * @return {string}
     */
    function escape(str) {
        return str.toString().replace(/~/g, '~0').replace(/\//g, '~1');
    }

    /**
     * Unescapes a reference token
     *
     * @param {string} str str
     * @return {string}
     */
    function unescape(str) {
        return str.replace(/~1/g, '/').replace(/~0/g, '~');
    }

    /**
     * Converts a json pointer into a array of reference tokens
     *
     * @param {string} pointer pointer
     * @return {Array}
     */
    function parse(pointer) {

        if (!pointer) {
            return [];
        }

        if (pointer.charAt(0) !== '/') {
            throw new Error('Invalid JSON pointer: ' + pointer);
        }

        return pointer.substring(1).split(/\//).map(unescape);
    }

    /**
     * Builds a json pointer from a array of reference tokens
     *
     * @param {Array<string>} refTokens tokens
     * @return {string}
     */
    function compile(refTokens) {
        return !refTokens.length ? '/' + refTokens.map(escape).join('/') : '';
    }
});