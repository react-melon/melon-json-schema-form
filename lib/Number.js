(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/TextBox', 'melon/Title', 'melon-core/InputComponent', './factory', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/TextBox'), require('melon/Title'), require('melon-core/InputComponent'), require('./factory'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.TextBox, global.Title, global.InputComponent, global.factory, global.babelHelpers);
        global.Number = mod.exports;
    }
})(this, function (exports, _react, _TextBox, _Title, _InputComponent2, _factory, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _TextBox2 = babelHelpers.interopRequireDefault(_TextBox);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var main = babelHelpers.interopRequireWildcard(_factory);

    var NumberComponent = function (_InputComponent) {
        babelHelpers.inherits(NumberComponent, _InputComponent);

        function NumberComponent() {
            babelHelpers.classCallCheck(this, NumberComponent);
            return babelHelpers.possibleConstructorReturn(this, _InputComponent.apply(this, arguments));
        }

        NumberComponent.prototype.render = function render() {
            var _this2 = this;

            var _props = this.props;
            var schema = _props.schema;
            var name = _props.name;
            var _props$variants = _props.variants;
            var variants = _props$variants === undefined ? [] : _props$variants;
            var rest = babelHelpers.objectWithoutProperties(_props, ['schema', 'name', 'variants']);


            var value = this.state.value;

            variants.push('fluid');

            return _react2['default'].createElement(
                'div',
                { className: 'ui-field variant-number' },
                _react2['default'].createElement(
                    _Title2['default'],
                    { level: 4 },
                    schema.title
                ),
                _react2['default'].createElement(_TextBox2['default'], babelHelpers['extends']({}, rest, {
                    variants: ['fluid'],
                    name: name,
                    rules: babelHelpers['extends']({}, schema, { type: 'string' }),
                    numberic: true,
                    value: value ? +value : '',
                    onChange: function onChange(_ref) {
                        var value = _ref.value;

                        _InputComponent.prototype.onChange.call(_this2, {
                            type: 'change',
                            target: _this2,
                            value: value ? +value : ''
                        });
                    } }))
            );
        };

        return NumberComponent;
    }(_InputComponent3['default']);

    exports['default'] = NumberComponent;


    main.registerComponent('number', NumberComponent);
});
//# sourceMappingURL=Number.js.map
