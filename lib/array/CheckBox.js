(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/BoxGroup', 'melon-core/classname/classname', '../factory', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/BoxGroup'), require('melon-core/classname/classname'), require('../factory'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.BoxGroup, global.classname, global.factory, global.shallowEqual, global.babelHelpers);
        global.CheckBox = mod.exports;
    }
})(this, function (exports, _react, _BoxGroup, _classname, _factory, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _BoxGroup2 = babelHelpers.interopRequireDefault(_BoxGroup);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var ArrayCheckBox = function (_Component) {
        babelHelpers.inherits(ArrayCheckBox, _Component);

        function ArrayCheckBox() {
            babelHelpers.classCallCheck(this, ArrayCheckBox);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        ArrayCheckBox.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(this.props, nextProps);
        };

        ArrayCheckBox.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var name = _props.name;
            var value = _props.value;
            var onChange = _props.onChange;


            var titleClassName = (0, _classname.createClassName)('ui-field-title', 'variant-level-4');

            var title = schema.title;
            var items = schema.items;

            var enumNames = items.enumNames || [];

            var options = items['enum'].map(function (item, index) {
                return _react2['default'].createElement(
                    'option',
                    { key: 'item', value: item },
                    enumNames[index] || item
                );
            });

            return _react2['default'].createElement(
                'div',
                {
                    className: 'ui-field ui-field-string variant-string' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    title
                ),
                _react2['default'].createElement(
                    _BoxGroup2['default'],
                    {
                        size: 'xxs',
                        name: name,
                        rules: schema,
                        value: value,
                        onChange: onChange },
                    options
                )
            );
        };

        return ArrayCheckBox;
    }(_react.Component);

    exports['default'] = ArrayCheckBox;


    ArrayCheckBox.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        onChange: _react.PropTypes.func.isRequired
    };

    (0, _factory.registerComponent)(function (schema) {
        var type = schema.type;
        var uniqueItems = schema.uniqueItems;
        var items = schema.items;


        if (type === 'array' && uniqueItems && (typeof items === 'undefined' ? 'undefined' : babelHelpers['typeof'](items)) === 'object' && items.type === 'string' && items['enum']) {
            return ArrayCheckBox;
        }
    });
});
//# sourceMappingURL=CheckBox.js.map
