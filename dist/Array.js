/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './factory', 'react', 'melon/Title', 'melon/InputComponent', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./factory'), require('react'), require('melon/Title'), require('melon/InputComponent'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.factory, global.react, global.Title, global.InputComponent, global.babelHelpers);
        global.Array = mod.exports;
    }
})(this, function (exports, _factory, _react, _Title, _InputComponent2, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var factory = babelHelpers.interopRequireWildcard(_factory);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var ArrayComponent = function (_InputComponent) {
        babelHelpers.inherits(ArrayComponent, _InputComponent);

        function ArrayComponent() {
            babelHelpers.classCallCheck(this, ArrayComponent);
            return babelHelpers.possibleConstructorReturn(this, _InputComponent.apply(this, arguments));
        }

        ArrayComponent.prototype.renderArray = function renderArray(schema, value, pointer) {
            var _this2 = this;

            var items = schema.items;
            var title = schema.title;


            return _react2['default'].createElement(
                'section',
                { className: 'ui-field variant-array', rules: schema, key: pointer },
                _react2['default'].createElement(
                    _Title2['default'],
                    { level: 3 },
                    title
                ),
                value.map(function (record, index) {
                    var type = items.type;
                    var recordPointer = pointer + '/' + index;
                    var Field = factory.getComponent(type);
                    return _react2['default'].createElement(Field, {
                        key: recordPointer,
                        name: index + '',
                        value: record,
                        schema: items,
                        onChange: function onChange(e) {
                            _InputComponent.prototype.onChange.call(_this2, {
                                type: 'change',
                                target: _this2,
                                value: value.slice(0, index).concat(e.value).concat(value.slice(index + 1))
                            });
                        } });
                })
            );
        };

        ArrayComponent.prototype.renderTuple = function renderTuple(schema, value, pointer) {
            var _this3 = this;

            var items = schema.items;
            var title = schema.title;


            return _react2['default'].createElement(
                'section',
                { className: 'ui-field variant-tuple', rules: schema },
                _react2['default'].createElement(
                    _Title2['default'],
                    { level: 3 },
                    title
                ),
                items.map(function (item, index) {
                    var type = item.type;
                    var recordPointer = pointer + '/' + index;
                    var Field = factory.getComponent(type);
                    return _react2['default'].createElement(Field, {
                        key: recordPointer,
                        schema: item,
                        value: value[index],
                        name: index + '',
                        onChange: function onChange(e) {
                            _InputComponent.prototype.onChange.call(_this3, {
                                type: 'change',
                                target: _this3,
                                value: value.slice(0, index).concat(e.value).concat(value.slice(index + 1))
                            });
                        } });
                })
            );
        };

        ArrayComponent.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var pointer = _props.pointer;

            var value = this.state.value;

            var items = schema.items;

            return Array.isArray(items) ? this.renderTuple(schema, value, pointer) : this.renderArray(schema, value, pointer);
        };

        return ArrayComponent;
    }(_InputComponent3['default']);

    exports['default'] = ArrayComponent;


    ArrayComponent.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        value: _react.PropTypes.array,
        defaultValue: _react.PropTypes.array
    });

    ArrayComponent.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        value: [],
        defaultValue: []
    });

    factory.registerComponent('array', ArrayComponent);
});