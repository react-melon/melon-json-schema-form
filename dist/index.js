/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', './Array', './Object', './String', './Number', './Form', './Field', './factory', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('./Array'), require('./Object'), require('./String'), require('./Number'), require('./Form'), require('./Field'), require('./factory'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.Array, global.Object, global.String, global.Number, global.Form, global.Field, global.factory, global.babelHelpers);
        global.index = mod.exports;
    }
})(this, function (module, _Array, _Object, _String, _Number, _Form, _Field, _factory, babelHelpers) {
    'use strict';

    var _Array2 = babelHelpers.interopRequireDefault(_Array);

    var _Object2 = babelHelpers.interopRequireDefault(_Object);

    var _String2 = babelHelpers.interopRequireDefault(_String);

    var _Number2 = babelHelpers.interopRequireDefault(_Number);

    var _Form2 = babelHelpers.interopRequireDefault(_Form);

    var _Field2 = babelHelpers.interopRequireDefault(_Field);

    var factory = babelHelpers.interopRequireWildcard(_factory);

    /**
     * @file melon-json-schema-form
     * @author leon(ludafa@outlook.com)
     */

    module.exports = {
        Array: _Array2['default'],
        Object: _Object2['default'],
        String: _String2['default'],
        Number: _Number2['default'],
        Form: _Form2['default'],
        Field: _Field2['default'],
        factory: factory
    };
});