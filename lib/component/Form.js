(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './controls/Object'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./controls/Object'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Object);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _Object) {
    'use strict';

    exports.__esModule = true;
    exports.default = Form;

    var _react2 = _interopRequireDefault(_react);

    var _Object2 = _interopRequireDefault(_Object);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _objectWithoutProperties(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    }

    /* eslint-disable fecs-prefer-class */
    /**
     * Form
     *
     * @class
     * @param {Object} props 属性
     */
    function Form(props) {
        var schema = props.schema;
        var uiSchema = props.uiSchema;
        var children = props.children;
        var meta = props.meta;
        var dispatch = props.dispatch;
        var actions = props.actions;

        var rest = _objectWithoutProperties(props, ['schema', 'uiSchema', 'children', 'meta', 'dispatch', 'actions']);

        return _react2['default'].createElement(
            'form',
            rest,
            _react2['default'].createElement(_Object2['default'], {
                name: '',
                schema: schema,
                uiSchema: uiSchema
            }),
            children
        );
    }

    Form.propTypes = {
        schema: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]).isRequired,
        uiSchema: _react.PropTypes.object
    };
});
//# sourceMappingURL=Form.js.map
