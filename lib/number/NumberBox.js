(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'melon/TextBox', 'melon/textbox/Input', 'melon-core/Validity', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('melon/TextBox'), require('melon/textbox/Input'), require('melon-core/Validity'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.TextBox, global.Input, global.Validity, global.cxBuilder, global.babelHelpers);
        global.NumberBox = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _TextBox2, _Input, _Validity, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _TextBox3 = babelHelpers.interopRequireDefault(_TextBox2);

    var _Input2 = babelHelpers.interopRequireDefault(_Input);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    /**
     * @file NumberBox
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('TextBox');

    var NumberBox = function (_TextBox) {
        babelHelpers.inherits(NumberBox, _TextBox);

        function NumberBox(props, context) {
            babelHelpers.classCallCheck(this, NumberBox);

            var _this = babelHelpers.possibleConstructorReturn(this, _TextBox.call(this, props, context));

            var value = _this.state.value;
            _this.state.value = value === '' || isNaN(+value) ? '' : +value;
            return _this;
        }

        NumberBox.prototype.getValue = function getValue() {
            var value = this.state.value;
            return value === '' ? '' : +value;
        };

        NumberBox.prototype.onChange = function onChange(e) {

            var value = e.target.value;

            _TextBox.prototype.onChange.call(this, {
                type: 'change',
                target: {
                    value: value === '' ? '' : +value
                }
            });
        };

        NumberBox.prototype.onBlur = function onBlur(e) {

            var value = e.target.value;

            _TextBox.prototype.onBlur.call(this, {
                type: 'change',
                target: {
                    value: value === '' ? '' : +value
                }
            });
        };

        NumberBox.prototype.onFocus = function onFocus(e) {

            var value = e.target.value;

            _TextBox.prototype.onFocus.call(this, {
                type: 'change',
                target: {
                    value: value === '' ? '' : +value
                }
            });
        };

        NumberBox.prototype.render = function render() {
            var _this2 = this;

            var onFocus = this.onFocus;
            var onBlur = this.onBlur;
            var onChange = this.onChange;
            var props = this.props;
            var floatingLabel = props.floatingLabel;
            var rest = babelHelpers.objectWithoutProperties(props, ['floatingLabel']);
            var _state = this.state;
            var validity = _state.validity;
            var isFocus = _state.isFocus;
            var isFloating = _state.isFloating;
            var value = _state.value;


            var statefulClassName = cx(props).addStates({
                focus: isFocus,
                floating: isFloating,
                fulfilled: !!value
            }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                { className: statefulClassName },
                this.renderFloatingLabel(floatingLabel, isFloating, isFocus),
                _react2['default'].createElement(_Input2['default'], babelHelpers['extends']({}, rest, {
                    type: 'number',
                    onFocus: onFocus,
                    onBlur: onBlur,
                    onChange: onChange,
                    isFocus: isFocus,
                    value: value + '',
                    ref: function ref(input) {
                        if (input) {
                            _this2.input = _reactDom2['default'].findDOMNode(input);
                        }
                    } })),
                _react2['default'].createElement(_Validity2['default'], { validity: validity })
            );
        };

        return NumberBox;
    }(_TextBox3['default']);

    exports['default'] = NumberBox;


    NumberBox.displayName = 'NumberBox';

    NumberBox.defaultProps = _TextBox3['default'].defaultProps;
});
//# sourceMappingURL=NumberBox.js.map
