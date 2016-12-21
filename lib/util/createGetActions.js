(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.createGetActions = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.createUpload = createUpload;

    exports.default = function (getActions, upload) {

        return function (props, actions) {

            var customActions = typeof getActions === 'function' ? getActions(props, actions) : null;

            return _extends({}, customActions, {
                upload: createUpload(actions, upload)
            });
        };
    };

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

    /**
     * @file create `get action`
     * @author leon <ludafa@outlook.com>
     */

    function createUpload(actions, upload) {

        return function (name, files) {
            return function (dispatch, getState) {
                dispatch(actions.startPending(name));
                return upload(files[0]).then(function (value) {
                    dispatch(actions.change(name, value));
                    dispatch(actions.blur(name));
                    dispatch(actions.stopPending(name));
                }, function (error) {
                    return dispatch(actions.stopPending(name));
                });
            };
        };
    }
});
//# sourceMappingURL=createGetActions.js.map
