(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-calendar', '../factory', 'melon-core/classname/classname', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-calendar'), require('../factory'), require('melon-core/classname/classname'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonCalendar, global.factory, global.classname, global.shallowEqual, global.babelHelpers);
        global.Date = mod.exports;
    }
})(this, function (exports, _react, _melonCalendar, _factory, _classname, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _melonCalendar2 = babelHelpers.interopRequireDefault(_melonCalendar);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var DateField = function (_Component) {
        babelHelpers.inherits(DateField, _Component);

        function DateField() {
            babelHelpers.classCallCheck(this, DateField);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        DateField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        DateField.prototype.render = function render() {
            var _props = this.props,
                schema = _props.schema,
                value = _props.value,
                onChange = _props.onChange,
                name = _props.name;
            var title = schema.title,
                begin = schema.begin,
                end = schema.end;


            var titleClassName = (0, _classname.createClassName)('ui-field-title', 'variant-level-4');

            return _react2['default'].createElement(
                'div',
                { className: 'ui-field ui-field-string variant-string' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    title
                ),
                _react2['default'].createElement(_melonCalendar2['default'], {
                    size: 'xxs',
                    variants: ['fluid'],
                    name: name,
                    rules: schema,
                    value: value,
                    defaultValue: schema['default'],
                    begin: begin,
                    end: end,
                    onChange: onChange })
            );
        };

        return DateField;
    }(_react.Component);

    exports['default'] = DateField;


    DateField.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string,
        onChange: _react.PropTypes.func.isRequired
    };

    (0, _factory.registerComponent)(function (schema) {

        if (schema.type === 'string' && schema.format === 'date') {
            return DateField;
        }
    });
});
//# sourceMappingURL=Date.js.map
