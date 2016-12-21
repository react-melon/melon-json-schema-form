(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-timepicker', '../../../factory'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-timepicker'), require('../../../factory'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonTimepicker, global.factory);
        global.Time = mod.exports;
    }
})(this, function (exports, _react, _melonTimepicker, _factory) {
    'use strict';

    exports.__esModule = true;
    exports.TimeControl = TimeControl;

    var _react2 = _interopRequireDefault(_react);

    var _melonTimepicker2 = _interopRequireDefault(_melonTimepicker);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function TimeControl(props) {
        var name = props.name;
        var value = props.value;
        var meta = props.meta;
        var actions = props.actions;
        var schema = props.schema;
        var title = schema.title;
        var description = schema.description;
        var error = meta.error;
        var touched = meta.touched;


        var message = touched && error ? _react2['default'].createElement(
            'div',
            null,
            error
        ) : null;

        return _react2['default'].createElement(
            'div',
            { className: 'ui-control-time' },
            title ? _react2['default'].createElement(
                'header',
                {
                    className: 'ui-control-time-title' },
                title
            ) : null,
            description ? _react2['default'].createElement(
                'p',
                {
                    className: 'ui-control-time-decription' },
                description
            ) : null,
            _react2['default'].createElement(_melonTimepicker2['default'], {
                size: 'xxs',
                value: value == null ? schema['default'] : value,
                onChange: function onChange(e) {
                    return actions.change(name, e.value);
                }
            }),
            message
        );
    } /**
       * @file TimeControl
       * @author leon <ludafa@outlook.com>
       */

    (0, _factory.registerControl)(function (schema) {

        if (schema.type === 'string' && schema.format === 'time') {
            return TimeControl;
        }
    });
});
//# sourceMappingURL=Time.js.map
