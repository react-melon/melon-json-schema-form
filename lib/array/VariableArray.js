(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/InputComponent', '../factory', 'melon/Button', 'melon/Icon', '../util/resolveDefaults', 'melon-core/Validity', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/InputComponent'), require('../factory'), require('melon/Button'), require('melon/Icon'), require('../util/resolveDefaults'), require('melon-core/Validity'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.InputComponent, global.factory, global.Button, global.Icon, global.resolveDefaults, global.Validity, global.shallowEqual, global.babelHelpers);
        global.VariableArray = mod.exports;
    }
})(this, function (exports, _react, _InputComponent2, _factory, _Button, _Icon, _resolveDefaults, _Validity, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.VariableArrayItem = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _resolveDefaults2 = babelHelpers.interopRequireDefault(_resolveDefaults);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var VariableArrayItem = exports.VariableArrayItem = function (_Component) {
        babelHelpers.inherits(VariableArrayItem, _Component);

        function VariableArrayItem() {
            babelHelpers.classCallCheck(this, VariableArrayItem);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onChange = _this.onChange.bind(_this);
            _this.onUpward = _this.onUpward.bind(_this);
            _this.onDownward = _this.onDownward.bind(_this);
            return _this;
        }

        VariableArrayItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        VariableArrayItem.prototype.onChange = function onChange(e) {
            var _props = this.props,
                onChange = _props.onChange,
                index = _props.index;


            onChange({
                value: e.value,
                index: index
            });
        };

        VariableArrayItem.prototype.onUpward = function onUpward(e) {

            e.stopPropagation();

            var _props2 = this.props,
                index = _props2.index,
                onUpward = _props2.onUpward;


            onUpward(index);
        };

        VariableArrayItem.prototype.onDownward = function onDownward(e) {

            e.stopPropagation();

            var _props3 = this.props,
                index = _props3.index,
                onDownward = _props3.onDownward;


            onDownward(index);
        };

        VariableArrayItem.prototype.render = function render() {
            var _props4 = this.props,
                schema = _props4.schema,
                level = _props4.level,
                index = _props4.index,
                name = _props4.name,
                value = _props4.value,
                removable = _props4.removable,
                downable = _props4.downable;


            var Field = (0, _factory.getComponent)(schema);

            if (!Field) {
                return null;
            }

            var upButton = index ? _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    size: 'xxs',
                    variants: ['info', 'icon'],
                    onClick: this.onUpward },
                _react2['default'].createElement(_Icon2['default'], { icon: 'arrow-upward' })
            ) : null;

            var downButton = downable ? _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    size: 'xxs',
                    variants: ['info', 'icon'],
                    onClick: this.onDownward },
                _react2['default'].createElement(_Icon2['default'], { icon: 'arrow-downward' })
            ) : null;

            var deleteButton = removable ? _react2['default'].createElement(
                _Button2['default'],
                {
                    size: 'xxs',
                    variants: ['danger', 'icon'],
                    onClick: function onClick() {} },
                _react2['default'].createElement(_Icon2['default'], { icon: 'delete' })
            ) : null;

            var title = _react2['default'].createElement(
                'header',
                { className: 'ui-field-array-item-title' },
                _react2['default'].createElement(
                    'label',
                    null,
                    index + 1,
                    '.'
                ),
                upButton,
                downButton,
                deleteButton
            );

            return _react2['default'].createElement(
                'li',
                null,
                title,
                _react2['default'].createElement(Field, {
                    level: level,
                    name: name,
                    value: value,
                    schema: schema,
                    onChange: this.onChange })
            );
        };

        return VariableArrayItem;
    }(_react.Component);

    VariableArrayItem.propTypes = {
        schema: _react.PropTypes.object,
        level: _react.PropTypes.number,
        index: _react.PropTypes.number,
        removable: _react.PropTypes.bool,
        downable: _react.PropTypes.bool,
        name: _react.PropTypes.string,
        value: _react.PropTypes.any,
        onChange: _react.PropTypes.func,
        onUpward: _react.PropTypes.func,
        onDownward: _react.PropTypes.func,
        onRemove: _react.PropTypes.func
    };

    var VariableArray = function (_InputComponent) {
        babelHelpers.inherits(VariableArray, _InputComponent);

        function VariableArray() {
            babelHelpers.classCallCheck(this, VariableArray);

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var _this2 = babelHelpers.possibleConstructorReturn(this, _InputComponent.call.apply(_InputComponent, [this].concat(args)));

            _this2.onFieldUpward = _this2.onFieldUpward.bind(_this2);
            _this2.onFieldRemove = _this2.onFieldRemove.bind(_this2);
            _this2.onFieldDownward = _this2.onFieldDownward.bind(_this2);
            _this2.onFieldChange = _this2.onFieldChange.bind(_this2);
            return _this2;
        }

        VariableArray.prototype.onFieldUpward = function onFieldUpward(index) {

            var value = this.state.value;

            this.onChange({
                type: 'change',
                target: this,
                value: [].concat(value.slice(0, index - 1), [value[index], value[index - 1]], value.slice(index + 1))
            });
        };

        VariableArray.prototype.onFieldRemove = function onFieldRemove(index) {
            var value = this.state.value;

            this.onChange({
                type: 'change',
                target: this,
                value: [].concat(value.slice(0, index), value.slice(index + 1))
            });
        };

        VariableArray.prototype.onFieldDownward = function onFieldDownward(index) {

            var value = this.state.value;

            this.onChange({
                type: 'change',
                target: this,
                value: [].concat(value.slice(0, index), [value[index + 1], value[index]], value.slice(index + 2))
            });
        };

        VariableArray.prototype.onFieldChange = function onFieldChange(e) {

            var thisValue = this.state.value;
            var value = e.value,
                index = e.index;


            this.onChange({
                type: 'change',
                target: this,
                value: [].concat(thisValue.slice(0, index), [value], thisValue.slice(index + 1))
            });
        };

        VariableArray.prototype.render = function render() {
            var _this3 = this;

            var pointer = this.pointer,
                props = this.props;
            var schema = props.schema,
                level = props.level,
                value = props.value;
            var items = schema.items,
                title = schema.title,
                _schema$minItems = schema.minItems,
                minItems = _schema$minItems === undefined ? 1 : _schema$minItems,
                _schema$maxItems = schema.maxItems,
                maxItems = _schema$maxItems === undefined ? Infinity : _schema$maxItems;


            // 如果 value 没有任何一项，那这个时候数组空
            // 那么我先做一个默认值项出来
            if (!value || !value.length) {
                value = [(0, _resolveDefaults2['default'])(items)];
            }

            var addButton = maxItems > value.length ? _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    size: 'xxs',
                    variants: ['icon', 'info'],
                    onClick: function onClick() {
                        _this3.onChange({
                            type: 'change',
                            target: _this3,
                            value: [].concat(value, [(0, _resolveDefaults2['default'])(schema)])
                        });
                    } },
                _react2['default'].createElement(_Icon2['default'], { icon: 'add' })
            ) : null;

            return _react2['default'].createElement(
                'fieldset',
                { className: 'ui-field ui-field-array variant-array' },
                _react2['default'].createElement(
                    'header',
                    {
                        className: 'ui-field-title ui-field-array-title variant-level-4' },
                    _react2['default'].createElement(
                        'label',
                        null,
                        title
                    ),
                    addButton
                ),
                _react2['default'].createElement(
                    'ul',
                    { className: 'ui-field-content' },
                    value.map(function (record, index, arr) {
                        return _react2['default'].createElement(VariableArrayItem, {
                            key: pointer + '/' + index,
                            schema: items,
                            removable: minItems < arr.length,
                            downable: index < arr.length - 1,
                            level: level + 1,
                            index: index,
                            name: index + '',
                            value: record,
                            onChange: _this3.onFieldChange,
                            onUpward: _this3.onFieldUpward,
                            onDownward: _this3.onFieldDownward });
                    })
                ),
                _react2['default'].createElement(_Validity2['default'], { validity: this.state.validity })
            );
        };

        return VariableArray;
    }(_InputComponent3['default']);

    exports['default'] = VariableArray;


    VariableArray.displayName = 'VariableArray';

    VariableArray.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        onChange: _react.PropTypes.func.isRequired,
        value: []
    });

    (0, _factory.registerComponent)(function (schema) {
        var type = schema.type,
            items = schema.items;


        if (type === 'array' && !Array.isArray(items)) {
            return VariableArray;
        }
    });
});
//# sourceMappingURL=VariableArray.js.map
