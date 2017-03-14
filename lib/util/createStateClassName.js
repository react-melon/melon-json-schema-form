(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'classnames'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('classnames'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.classnames);
        global.createStateClassName = mod.exports;
    }
})(this, function (exports, _classnames) {
    'use strict';

    exports.__esModule = true;

    exports.default = function (type, props) {
        var meta = props.meta,
            disabled = props.disabled,
            readOnly = props.readOnly,
            hidden = props.hidden,
            className = props.className;
        var error = meta.error,
            touched = meta.touched;


        var invalid = touched && error && error.message;

        return (0, _classnames2['default'])(type, className, {
            'state-valid': !invalid,
            'state-invalid': invalid,
            'state-hidden': hidden,
            'state-disabled': disabled,
            'state-read-only': readOnly
        });
    };

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
});
//# sourceMappingURL=createStateClassName.js.map
