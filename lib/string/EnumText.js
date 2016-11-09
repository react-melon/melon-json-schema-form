(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Select', '../factory', 'melon-core/classname/classname', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Select'), require('../factory'), require('melon-core/classname/classname'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Select, global.factory, global.classname, global.shallowEqual, global.babelHelpers);
        global.EnumText = mod.exports;
    }
})(this, function (exports, _react, _Select, _factory, _classname, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Select2 = babelHelpers.interopRequireDefault(_Select);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var EnumTextField = function (_Component) {
        babelHelpers.inherits(EnumTextField, _Component);

        function EnumTextField() {
            babelHelpers.classCallCheck(this, EnumTextField);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        EnumTextField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        EnumTextField.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var onChange = _props.onChange;
            var name = _props.name;
            var title = schema.title;
            var enumNames = schema.enumNames;


            var titleClassName = (0, _classname.createClassName)('ui-field-title', 'variant-level-4');

            return _react2['default'].createElement(
                'div',
                { className: 'ui-field ui-field-string variant-string' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    title
                ),
                _react2['default'].createElement(
                    _Select2['default'],
                    {
                        size: 'xxs',
                        variants: ['fluid'],
                        name: name,
                        rules: schema,
                        value: value,
                        defaultValue: schema['default'],
                        onChange: onChange },
                    schema['enum'].map(function (item, index) {
                        return _react2['default'].createElement(
                            'option',
                            { key: item, value: item },
                            enumNames && enumNames[index] || item
                        );
                    })
                )
            );
        };

        return EnumTextField;
    }(_react.Component);

    exports['default'] = EnumTextField;


    EnumTextField.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string,
        onChange: _react.PropTypes.func.isRequired
    };

    (0, _factory.registerComponent)(function (schema) {

        if (schema.type === 'string' && schema['enum']) {
            return EnumTextField;
        }
    });
});
//# sourceMappingURL=EnumText.js.map
