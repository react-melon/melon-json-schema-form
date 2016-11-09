(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './factory', 'melon-core/InputComponent', 'melon/Title', './util/getOrderedKeys', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./factory'), require('melon-core/InputComponent'), require('melon/Title'), require('./util/getOrderedKeys'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.factory, global.InputComponent, global.Title, global.getOrderedKeys, global.babelHelpers);
        global.Object = mod.exports;
    }
})(this, function (exports, _react, _factory, _InputComponent2, _Title, _getOrderedKeys, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var main = babelHelpers.interopRequireWildcard(_factory);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    var ObjectField = function (_InputComponent) {
        babelHelpers.inherits(ObjectField, _InputComponent);

        function ObjectField() {
            babelHelpers.classCallCheck(this, ObjectField);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call.apply(_InputComponent, [this].concat(args)));

            _this.onFieldChange = _this.onFieldChange.bind(_this);
            return _this;
        }

        ObjectField.prototype.renderTitle = function renderTitle(title) {

            if (!title) {
                return null;
            }

            return _react2['default'].createElement(
                'legend',
                null,
                _react2['default'].createElement(
                    _Title2['default'],
                    { level: 4, size: 'xxs' },
                    title
                )
            );
        };

        ObjectField.prototype.onFieldChange = function onFieldChange(e) {
            var _babelHelpers$extends;

            var target = e.target;
            var value = e.value;


            this.onChange({
                target: this,
                value: babelHelpers['extends']({}, this.state.value, (_babelHelpers$extends = {}, _babelHelpers$extends[target.props.name] = value, _babelHelpers$extends))
            });
        };

        ObjectField.prototype.render = function render() {
            var _this2 = this;

            var props = this.props;
            var pointer = this.pointer;
            var schema = props.schema;
            var level = props.level;
            var style = props.style;
            var uiSchema = props.uiSchema;
            var properties = schema.properties;
            var title = schema.title;


            var value = this.state.value;

            var fields = (0, _getOrderedKeys.getOrderedKeys)(properties, uiSchema['@order']).map(function (name) {
                var subSchema = properties[name];
                var Field = main.getComponent(subSchema);
                if (!Field) {
                    return null;
                }
                return _react2['default'].createElement(
                    'li',
                    { key: pointer + '/' + name },
                    _react2['default'].createElement(Field, {
                        schema: subSchema,
                        level: level + 1,
                        value: value[name],
                        name: name,
                        onChange: _this2.onFieldChange })
                );
            });

            return _react2['default'].createElement(
                'fieldset',
                {
                    'data-pointer': pointer,
                    className: 'ui-field variant-map',
                    style: style },
                _react2['default'].createElement(
                    'header',
                    { className: 'ui-field-title ui-field-object-title' },
                    title
                ),
                _react2['default'].createElement(
                    'ul',
                    { className: 'ui-field-content' },
                    fields
                )
            );
        };

        return ObjectField;
    }(_InputComponent3['default']);

    exports['default'] = ObjectField;


    ObjectField.displayName = 'Object';

    ObjectField.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        value: _react.PropTypes.object,
        defaultValue: _react.PropTypes.object,
        uiSchema: _react.PropTypes.object.isRequired,
        schema: _react.PropTypes.object.isRequired
    });

    ObjectField.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        value: {},
        defaultValue: {},
        uiSchema: {}
    });

    main.registerComponent(function (schema) {

        if (schema.type === 'object') {
            return ObjectField;
        }
    });
});
//# sourceMappingURL=Object.js.map
