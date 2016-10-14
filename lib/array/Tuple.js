(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/InputComponent', 'melon-core/classname/classname', '../factory', '../util/resolveDefaults', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/InputComponent'), require('melon-core/classname/classname'), require('../factory'), require('../util/resolveDefaults'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.InputComponent, global.classname, global.factory, global.resolveDefaults, global.shallowEqual, global.babelHelpers);
        global.Tuple = mod.exports;
    }
})(this, function (exports, _react, _InputComponent2, _classname, _factory, _resolveDefaults, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.ArrayTupleItem = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _resolveDefaults2 = babelHelpers.interopRequireDefault(_resolveDefaults);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var ArrayTupleItem = exports.ArrayTupleItem = function (_Component) {
        babelHelpers.inherits(ArrayTupleItem, _Component);

        function ArrayTupleItem() {
            babelHelpers.classCallCheck(this, ArrayTupleItem);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onFieldChange = _this.onFieldChange.bind(_this);
            return _this;
        }

        ArrayTupleItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(this.props, nextProps);
        };

        ArrayTupleItem.prototype.onFieldChange = function onFieldChange(e) {
            var target = e.target;
            var value = e.value;
            var _props = this.props;
            var onChange = _props.onChange;
            var index = _props.index;


            onChange({
                type: 'change',
                target: target,
                value: value,
                index: index
            });
        };

        ArrayTupleItem.prototype.render = function render() {
            var _props2 = this.props;
            var level = _props2.level;
            var schema = _props2.schema;
            var value = _props2.value;
            var name = _props2.name;
            var Field = _props2.Field;


            return _react2['default'].createElement(Field, {
                level: level,
                schema: schema,
                value: value,
                name: name,
                onChange: this.onFieldChange });
        };

        return ArrayTupleItem;
    }(_react.Component);

    var ArrayTuple = function (_InputComponent) {
        babelHelpers.inherits(ArrayTuple, _InputComponent);

        function ArrayTuple() {
            babelHelpers.classCallCheck(this, ArrayTuple);

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var _this2 = babelHelpers.possibleConstructorReturn(this, _InputComponent.call.apply(_InputComponent, [this].concat(args)));

            _this2.onFieldChange = _this2.onFieldChange.bind(_this2);
            return _this2;
        }

        ArrayTuple.prototype.onFieldChange = function onFieldChange(e) {

            var tuple = this.state.value;

            var index = e.index;
            var value = e.value;


            this.onChange({
                target: this,
                value: [].concat(tuple.slice(0, index), [value], tuple.slice(index + 1))
            });
        };

        ArrayTuple.prototype.render = function render() {
            var _this3 = this;

            var props = this.props;
            var pointer = this.pointer;
            var schema = props.schema;
            var value = props.value;
            var level = props.level;
            var items = schema.items;
            var title = schema.title;


            var titleClassName = (0, _classname.createClassName)('ui-field-array-title', 'ui-field-title', 'variant-level-' + level);

            return _react2['default'].createElement(
                'fieldset',
                { className: 'ui-field ui-field-array variant-tuple' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    title
                ),
                _react2['default'].createElement(
                    'ol',
                    { className: 'ui-field-content' },
                    items.map(function (item, index) {

                        var Field = (0, _factory.getComponent)(item);

                        if (!Field) {
                            return null;
                        }

                        var recordPointer = pointer + '/' + index;
                        var itemValue = value && value[index] || (0, _resolveDefaults2['default'])(item);

                        return _react2['default'].createElement(
                            'li',
                            { key: recordPointer },
                            _react2['default'].createElement(ArrayTupleItem, {
                                Field: Field,
                                level: level + 1,
                                schema: item,
                                value: itemValue,
                                index: index,
                                name: index + '',
                                onChange: _this3.onFieldChange })
                        );
                    })
                )
            );
        };

        return ArrayTuple;
    }(_InputComponent3['default']);

    exports['default'] = ArrayTuple;


    ArrayTuple.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        value: _react.PropTypes.array,
        schema: _react.PropTypes.object,
        level: _react.PropTypes.number
    });

    ArrayTuple.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        value: []
    });

    (0, _factory.registerComponent)(function (schema) {
        var type = schema.type;
        var items = schema.items;


        if (type === 'array' && Array.isArray(items)) {
            return ArrayTuple;
        }
    });
});
//# sourceMappingURL=Tuple.js.map
