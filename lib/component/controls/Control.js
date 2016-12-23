(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../../factory'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../../factory'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.factory);
        global.Control = mod.exports;
    }
})(this, function (exports, _react, _factory) {
    'use strict';

    exports.__esModule = true;
    exports.default = Control;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /* eslint-disable fecs-prefer-class */
    /**
     * Control
     *
     * @class
     * @param {Object} props 属性
     */
    /**
     * @file FieldControl
     * @author leon <ludafa@outlook.com>
     */

    function Control(props) {

        var Control = (0, _factory.getControl)(props.schema);

        if (process.env.NODE_ENV === 'dev') {
            if (!Control) {
                throw new Error('no control match schema: \n' + JSON.stringify(props.schema, 0, 2));
            }
        }

        return _react2['default'].createElement(Control, props);
    }

    Control.propTypes = {
        schema: _react.PropTypes.object.isRequired
    };
});
//# sourceMappingURL=Control.js.map
