(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'melon-form', 'react-addons-update'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('melon-form'), require('react-addons-update'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.melonForm, global.reactAddonsUpdate);
        global.createReducer = mod.exports;
    }
})(this, function (exports, _melonForm, _reactAddonsUpdate) {
    'use strict';

    exports.__esModule = true;

    var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    exports['default'] = function (model, initialValue, reducers) {
        var _extends2;

        return (0, _melonForm.createReducer)(model, initialValue, _extends({}, reducers, (_extends2 = {}, _extends2[_melonForm.actionTypes.CHANGE] = function (state, action, next) {
            var _action$payload = action.payload;
            var name = _action$payload.name;
            var value = _action$payload.value;


            if (value === '') {
                return (0, _reactAddonsUpdate2['default'])(state, {
                    value: {
                        $set: _melonForm.dataPath.deleteIn(state.value, name)
                    }
                });
            }

            return next(state, action);
        }, _extends2)));
    };
});
//# sourceMappingURL=createReducer.js.map
