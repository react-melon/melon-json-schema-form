(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-timepicker', '../../../factory', '../../ValidityLabel', '../../../util/createStateClassName'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-timepicker'), require('../../../factory'), require('../../ValidityLabel'), require('../../../util/createStateClassName'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonTimepicker, global.factory, global.ValidityLabel, global.createStateClassName);
        global.Time = mod.exports;
    }
})(this, function (exports, _react, _melonTimepicker, _factory, _ValidityLabel, _createStateClassName) {
    'use strict';

    exports.__esModule = true;
    exports.TimeControl = TimeControl;

    var _react2 = _interopRequireDefault(_react);

    var _melonTimepicker2 = _interopRequireDefault(_melonTimepicker);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    var _createStateClassName2 = _interopRequireDefault(_createStateClassName);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * 时间选择器
     *
     * @class
     * @param {*} props 属性
     */
    function TimeControl(props) {
        var name = props.name,
            value = props.value,
            meta = props.meta,
            actions = props.actions,
            schema = props.schema,
            disabled = props.disabled,
            readOnly = props.readOnly;
        var title = schema.title,
            description = schema.description;
        var error = meta.error,
            touched = meta.touched;


        var invalid = touched && error && error.message;

        var className = (0, _createStateClassName2['default'])('ui-control-time', props);

        return _react2['default'].createElement(
            'div',
            { className: className },
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
                disabled: disabled,
                readOnly: readOnly,
                size: 'xxs',
                states: { invalid: invalid },
                value: value == null ? schema['default'] : value,
                onChange: function onChange(e) {
                    return actions.change(name, e.value);
                }
            }),
            _react2['default'].createElement(_ValidityLabel2['default'], meta)
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
