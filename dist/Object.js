/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './factory', 'melon-core/InputComponent', 'melon/Title', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./factory'), require('melon-core/InputComponent'), require('melon/Title'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.factory, global.InputComponent, global.Title, global.babelHelpers);
        global.Object = mod.exports;
    }
})(this, function (exports, _react, _factory, _InputComponent2, _Title, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var main = babelHelpers.interopRequireWildcard(_factory);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    var ObjectComponent = function (_InputComponent) {
        babelHelpers.inherits(ObjectComponent, _InputComponent);

        function ObjectComponent() {
            babelHelpers.classCallCheck(this, ObjectComponent);
            return babelHelpers.possibleConstructorReturn(this, _InputComponent.apply(this, arguments));
        }

        ObjectComponent.prototype.render = function render() {
            var _this2 = this;

            var _props = this.props;
            var schema = _props.schema;
            var pointer = _props.pointer;
            var properties = schema.properties;
            var title = schema.title;


            var value = this.state.value;

            return _react2['default'].createElement(
                'section',
                { 'data-pointer': pointer, className: 'ui-field variant-map' },
                _react2['default'].createElement(
                    _Title2['default'],
                    { level: 3 },
                    title
                ),
                Object.keys(properties).map(function (name) {
                    var subSchema = properties[name];
                    var type = subSchema.type;
                    var Field = main.getComponent(type);
                    return _react2['default'].createElement(Field, {
                        schema: subSchema,
                        value: value[name],
                        key: pointer + '/' + name,
                        name: name,
                        onChange: function onChange(e) {
                            var _babelHelpers$extends;

                            _InputComponent.prototype.onChange.call(_this2, {
                                type: 'change',
                                target: _this2,
                                value: babelHelpers['extends']({}, _this2.state.value, (_babelHelpers$extends = {}, _babelHelpers$extends[name] = e.value, _babelHelpers$extends))
                            });
                        } });
                })
            );
        };

        return ObjectComponent;
    }(_InputComponent3['default']);

    exports['default'] = ObjectComponent;


    ObjectComponent.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        value: _react.PropTypes.object,
        defaultValue: _react.PropTypes.object
    });

    ObjectComponent.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        value: {},
        defaultValue: {}
    });

    main.registerComponent('object', ObjectComponent);
});