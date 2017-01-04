(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-calendar', 'melon-timepicker', '../../../factory', 'moment', 'classnames', '../../ValidityLabel'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-calendar'), require('melon-timepicker'), require('../../../factory'), require('moment'), require('classnames'), require('../../ValidityLabel'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.melonCalendar, global.melonTimepicker, global.factory, global.moment, global.classnames, global.ValidityLabel);
        global.DateTime = mod.exports;
    }
})(this, function (exports, _react, _melonCalendar, _melonTimepicker, _factory, _moment, _classnames, _ValidityLabel) {
    'use strict';

    exports.__esModule = true;
    exports.default = DateTimeControl;

    var _react2 = _interopRequireDefault(_react);

    var _melonCalendar2 = _interopRequireDefault(_melonCalendar);

    var _melonTimepicker2 = _interopRequireDefault(_melonTimepicker);

    var _moment2 = _interopRequireDefault(_moment);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * DateTimeControl
     *
     * @class
     * @param {Object} props 属性
     */
    function DateTimeControl(props) {
        var schema = props.schema,
            value = props.value,
            name = props.name,
            actions = props.actions,
            meta = props.meta;
        var title = schema.title,
            description = schema.description,
            formatMinimum = schema.formatMinimum,
            formatMaximum = schema.formatMaximum;


        value = (0, _moment2['default'])(value);
        value = value.isValid() ? value : (0, _moment2['default'])();

        var date = value.format('YYYY-MM-DD');
        var time = value.format('HH:mm:ss');

        var error = meta.error,
            touched = meta.touched;


        var message = touched && error ? error.message : null;

        var className = (0, _classnames2['default'])('ui-control-datetime', {
            'state-valid': !message,
            'state-invalid': message
        });

        return _react2['default'].createElement(
            'div',
            { className: className },
            title ? _react2['default'].createElement(
                'header',
                {
                    className: 'ui-control-datetime-title' },
                title
            ) : null,
            description ? _react2['default'].createElement(
                'p',
                {
                    className: 'ui-control-datetime-decription' },
                description
            ) : null,
            _react2['default'].createElement(
                'div',
                { className: 'ui-control-datetime-content' },
                _react2['default'].createElement(_melonCalendar2['default'], {
                    size: 'xs',
                    value: date,
                    begin: formatMinimum,
                    end: formatMaximum,
                    onChange: function onChange(e) {
                        actions.change(name, e.value + ' ' + time);
                        actions.validate(name);
                    } }),
                _react2['default'].createElement(_melonTimepicker2['default'], {
                    size: 'xs',
                    value: time,
                    onChange: function onChange(e) {
                        actions.change(name, date + ' ' + e.value);
                        actions.validate(name);
                    } })
            ),
            _react2['default'].createElement(_ValidityLabel2['default'], meta)
        );
    } /**
       * @file DateTimeControl
       * @author leon <ludafa@outlook.com>
       */

    DateTimeControl.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string
    };

    (0, _factory.registerControl)(function (schema) {

        if (schema.type === 'string' && schema.format === 'date-time') {
            return DateTimeControl;
        }
    });
});
//# sourceMappingURL=DateTime.js.map
