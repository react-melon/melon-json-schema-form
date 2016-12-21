(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-form', './util/createGetActions', './validator'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-form'), require('./util/createGetActions'), require('./validator'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonForm, global.createGetActions, global.validator);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _melonForm, _createGetActions, _validator) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _validator2 = _interopRequireDefault(_validator);

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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var JSONSchemaForm = function (_Component) {
        _inherits(JSONSchemaForm, _Component);

        function JSONSchemaForm() {
            _classCallCheck(this, JSONSchemaForm);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.getActions = _this.getActions.bind(_this);
            _this.validate = (0, _validator2['default'])();
            return _this;
        }

        JSONSchemaForm.prototype.getActions = function getActions(actions) {

            return {
                upload: (0, _createGetActions.createUpload)(actions, this.props.upload)
            };
        };

        JSONSchemaForm.prototype.render = function render() {

            return _react2['default'].createElement(_melonForm.Form, _extends({}, this.props, {
                validate: this.validate,
                getActions: this.getActions }));
        };

        return JSONSchemaForm;
    }(_react.Component);

    exports['default'] = JSONSchemaForm;


    JSONSchemaForm.propTypes = _extends({}, _melonForm.Form.propTypes, {
        upload: _react.PropTypes.func
    });
});
//# sourceMappingURL=Form.js.map
