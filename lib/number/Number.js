(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../factory', 'melon-core/classname/classname', './NumberBox', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../factory'), require('melon-core/classname/classname'), require('./NumberBox'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.factory, global.classname, global.NumberBox, global.shallowEqual, global.babelHelpers);
        global.Number = mod.exports;
    }
})(this, function (exports, _react, _factory, _classname, _NumberBox, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _NumberBox2 = babelHelpers.interopRequireDefault(_NumberBox);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var NumberComponent = function (_Component) {
        babelHelpers.inherits(NumberComponent, _Component);

        function NumberComponent() {
            babelHelpers.classCallCheck(this, NumberComponent);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        NumberComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        NumberComponent.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var name = _props.name;
            var onChange = _props.onChange;
            var rest = babelHelpers.objectWithoutProperties(_props, ['schema', 'name', 'onChange']);
            var _schema$divisibleBy = schema.divisibleBy;
            var divisibleBy = _schema$divisibleBy === undefined ? 1 : _schema$divisibleBy;
            var _schema$max = schema.max;
            var max = _schema$max === undefined ? Infinity : _schema$max;
            var _schema$min = schema.min;
            var min = _schema$min === undefined ? -Infinity : _schema$min;


            var value = this.props.value;
            var titleClassName = (0, _classname.createClassName)('ui-field-title', 'variant-level-4');
            return _react2['default'].createElement(
                'div',
                { className: 'ui-field ui-field-number variant-number' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    schema.title
                ),
                _react2['default'].createElement(_NumberBox2['default'], babelHelpers['extends']({}, rest, {
                    size: 'xxs',
                    step: divisibleBy,
                    min: min,
                    max: max,
                    variants: ['fluid'],
                    name: name,
                    rules: schema,
                    value: value,
                    defaultValue: schema['default'],
                    onChange: onChange }))
            );
        };

        return NumberComponent;
    }(_react.Component);

    exports['default'] = NumberComponent;


    NumberComponent.displayName = 'Number';

    (0, _factory.registerComponent)(function (schema) {

        var type = schema.type;

        if (type === 'number' || type === 'integer') {
            return NumberComponent;
        }
    });
});
//# sourceMappingURL=Number.js.map
