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

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onKeyDown = _this.onKeyDown.bind(_this);
            _this.onBlur = _this.onBlur.bind(_this);
            return _this;
        }

        NumberComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        NumberComponent.prototype.onKeyDown = function onKeyDown(e) {
            var _props = this.props,
                value = _props.value,
                onChange = _props.onChange;
            var keyCode = e.keyCode,
                shiftKey = e.shiftKey,
                altKey = e.altKey,
                metaKey = e.metaKey;


            var currentValue = e.target.value;

            // 如果是上或下，那么要做额外数字处理
            // shift 是 10x，alt 是 0.1x 其他就是 1x
            if (keyCode === 38 || keyCode === 40) {

                e.preventDefault();

                currentValue = +currentValue + (keyCode === 38 ? 1 : -1) * (metaKey ? 100 : shiftKey ? 10 : altKey ? 0.1 : 1);

                onChange({
                    type: 'change',
                    target: this.refs.textbox,
                    value: +currentValue.toFixed(3)
                });

                return;
            }

            // 如果是回车，相当于触发了一个 blur
            if (keyCode === 13 && currentValue !== value) {
                onChange({
                    type: 'change',
                    target: this.refs.textbox,
                    value: currentValue === '' ? value : +currentValue
                });
            }
        };

        NumberComponent.prototype.onBlur = function onBlur(e) {
            var _props2 = this.props,
                onChange = _props2.onChange,
                value = _props2.value;

            var target = e.target;
            var currentValue = target.getValue();

            if (currentValue !== value) {
                onChange({
                    type: 'change',
                    target: target,
                    value: currentValue === '' ? value : currentValue
                });
            }
        };

        NumberComponent.prototype.render = function render() {
            var _props3 = this.props,
                schema = _props3.schema,
                name = _props3.name,
                rest = babelHelpers.objectWithoutProperties(_props3, ['schema', 'name']);
            var divisibleBy = schema.divisibleBy,
                _schema$max = schema.max,
                max = _schema$max === undefined ? Infinity : _schema$max,
                _schema$min = schema.min,
                min = _schema$min === undefined ? -Infinity : _schema$min,
                type = schema.type;


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
                    onChange: null,
                    ref: 'textbox',
                    size: 'xxs',
                    step: divisibleBy || type === 'integer' ? 1 : 0.001,
                    min: min,
                    max: max,
                    variants: ['fluid'],
                    name: name,
                    rules: schema,
                    value: value,
                    defaultValue: schema['default'],
                    validateEvents: ['blur'],
                    onKeyDown: this.onKeyDown,
                    onBlur: this.onBlur }))
            );
        };

        return NumberComponent;
    }(_react.Component);

    exports['default'] = NumberComponent;


    NumberComponent.displayName = 'Number';

    NumberComponent.propTypes = {
        onChange: _react.PropTypes.func.isRequired
    };

    (0, _factory.registerComponent)(function (schema) {

        var type = schema.type;

        if (type === 'number' || type === 'integer') {
            return NumberComponent;
        }
    });
});
//# sourceMappingURL=Number.js.map
