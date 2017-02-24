(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'ajv', 'ajv-i18n/localize/zh', 'kolor'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('ajv'), require('ajv-i18n/localize/zh'), require('kolor'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.ajv, global.zh, global.kolor);
        global.validator = mod.exports;
    }
})(this, function (exports, _ajv, _zh, _kolor) {
    'use strict';

    exports.__esModule = true;

    var _ajv2 = _interopRequireDefault(_ajv);

    var _zh2 = _interopRequireDefault(_zh);

    var _kolor2 = _interopRequireDefault(_kolor);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var validator = new _ajv2['default']({
        allErrors: true,
        v5: true,
        coerceTypes: false
    });

    validator.addFormat('color', {
        validate: function validate(value) {
            return !!(0, _kolor2['default'])(value);
        }
    });

    validator.addFormat('date', {
        validate: function validate(value) {
            return (/^\d\d\d\d-[01]\d-[0-3]\d$/.test(value)
            );
        },
        compare: function compare(a, b) {

            if (a === b) {
                return 0;
            }

            if (!a && b) {
                return -1;
            }

            if (a && !b) {
                return 1;
            }

            return new Date(a) - new Date(b);
        }
    });

    validator.addFormat('numeric', {
        validate: function validate(value) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            return (type === 'number' || type === 'string') && !isNaN(value - parseFloat(value));
        },
        compare: function compare(a, b) {
            return a - b;
        }
    });

    validator.addFormat('date-time', /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d$/i);

    // 用于做出错排序
    var KEYWORD_PRIORITY = {
        type: 1,
        format: 2,
        formatMinimum: 3,
        formatMaximum: 4
    };

    function shouldReplaceError(error1, error2) {
        return KEYWORD_PRIORITY[error1.keyword] - KEYWORD_PRIORITY[error2.keyword] > 0;
    }

    exports['default'] = function () {

        var validate = null;
        var schema = null;

        return function (state, props, origin) {

            if (!validate || props.schema !== schema) {
                validate = validator.compile(props.schema);
                schema = props.schema;
            }

            var valid = validate(state.value);

            (0, _zh2['default'])(validate.errors);

            return valid ? null : validate.errors.reduce(function (validity, error) {
                var dataPath = error.dataPath,
                    keyword = error.keyword,
                    params = error.params,
                    message = error.message;


                if (keyword === 'required' && params.missingProperty) {
                    dataPath = dataPath + '.' + params.missingProperty;
                    message = '请填写此项';
                }

                if (dataPath[0] === '.') {
                    dataPath = dataPath.slice(1);
                }

                if (!validity[dataPath] || shouldReplaceError(validity[dataPath], error)) {
                    validity[dataPath] = _extends({}, error, {
                        name: dataPath,
                        message: message
                    });
                }

                return validity;
            }, {});
        };
    };
});
//# sourceMappingURL=validator.js.map
