(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'classnames'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('classnames'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.classnames);
        global.ValidityLabel = mod.exports;
    }
})(this, function (exports, _react, _classnames) {
    'use strict';

    exports.__esModule = true;
    exports.default = ValidityLabel;

    var _react2 = _interopRequireDefault(_react);

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * ValidityLabel
     *
     * @class
     * @param {Object} props 属性
     */
    /**
     * @file ValidityLabel
     * @author leon <ludafa@outlook.com>
     */

    function ValidityLabel(props) {
        var touched = props.touched;
        var error = props.error;
        var focus = props.focus;


        var message = !focus && touched && error ? error.message : '';

        var className = (0, _classnames2['default'])('ui-control-validity-label', {
            'state-valid': !message,
            'state-invalid': message
        });

        return _react2['default'].createElement(
            'div',
            { className: className },
            message ? message : null
        );
    }

    ValidityLabel.propTypes = {
        touched: _react.PropTypes.bool.isRequired
    };

    ValidityLabel.defaultProps = {
        touched: false
    };
});
//# sourceMappingURL=ValidityLabel.js.map
