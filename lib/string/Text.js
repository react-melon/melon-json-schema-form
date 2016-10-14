(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/TextBox', '../factory', 'melon-core/classname/classname', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/TextBox'), require('../factory'), require('melon-core/classname/classname'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.TextBox, global.factory, global.classname, global.shallowEqual, global.babelHelpers);
        global.Text = mod.exports;
    }
})(this, function (exports, _react, _TextBox, _factory, _classname, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _TextBox2 = babelHelpers.interopRequireDefault(_TextBox);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var TextField = function (_Component) {
        babelHelpers.inherits(TextField, _Component);

        function TextField() {
            babelHelpers.classCallCheck(this, TextField);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TextField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        TextField.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var onChange = _props.onChange;
            var name = _props.name;
            var maxLength = schema.maxLength;
            var placeholder = schema.placeholder;
            var title = schema.title;


            var titleClassName = (0, _classname.createClassName)('ui-field-title', 'variant-level-4');

            return _react2['default'].createElement(
                'div',
                { className: 'ui-field ui-field-string variant-string' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    title
                ),
                _react2['default'].createElement(_TextBox2['default'], {
                    size: 'xxs',
                    variants: ['fluid'],
                    multiline: maxLength && maxLength >= 120,
                    placeholder: placeholder,
                    name: name,
                    rules: schema,
                    value: value,
                    defaultValue: schema['default'],
                    onChange: onChange })
            );
        };

        return TextField;
    }(_react.Component);

    exports['default'] = TextField;


    TextField.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string,
        onChange: _react.PropTypes.func
    };

    (0, _factory.registerComponent)(function (schema) {

        if (schema.type === 'string') {
            return TextField;
        }
    });
});
//# sourceMappingURL=Text.js.map
