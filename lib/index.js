(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './factory', './Form', './Field', './Object', './Boolean', './number/Number', './number/Range', './string/Text', './string/Color', './string/Date', './string/EnumText', './string/Image', './array/VariableArray', './array/Tuple', './array/CheckBox', './util/resolveDefaults', './pointer', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./factory'), require('./Form'), require('./Field'), require('./Object'), require('./Boolean'), require('./number/Number'), require('./number/Range'), require('./string/Text'), require('./string/Color'), require('./string/Date'), require('./string/EnumText'), require('./string/Image'), require('./array/VariableArray'), require('./array/Tuple'), require('./array/CheckBox'), require('./util/resolveDefaults'), require('./pointer'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.factory, global.Form, global.Field, global.Object, global.Boolean, global.Number, global.Range, global.Text, global.Color, global.Date, global.EnumText, global.Image, global.VariableArray, global.Tuple, global.CheckBox, global.resolveDefaults, global.pointer, global.babelHelpers);
        global.index = mod.exports;
    }
})(this, function (exports, _factory, _Form, _Field, _Object, _Boolean, _Number, _Range, _Text, _Color, _Date, _EnumText, _Image, _VariableArray, _Tuple, _CheckBox, _resolveDefaults, _pointer, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.pointer = exports.resolveDefaults = exports.VariableArray = exports.Tuple = exports.CheckBox = exports.Text = exports.Image = exports.Color = exports.EnumText = exports.Number = exports.Range = exports.Boolean = exports.Object = exports.Date = exports.Field = exports.Form = undefined;
    Object.keys(_factory).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _factory[key];
            }
        });
    });

    var _Form2 = babelHelpers.interopRequireDefault(_Form);

    var _Field2 = babelHelpers.interopRequireDefault(_Field);

    var _Object2 = babelHelpers.interopRequireDefault(_Object);

    var _Boolean2 = babelHelpers.interopRequireDefault(_Boolean);

    var _Number2 = babelHelpers.interopRequireDefault(_Number);

    var _Range2 = babelHelpers.interopRequireDefault(_Range);

    var _Text2 = babelHelpers.interopRequireDefault(_Text);

    var _Color2 = babelHelpers.interopRequireDefault(_Color);

    var _Date2 = babelHelpers.interopRequireDefault(_Date);

    var _EnumText2 = babelHelpers.interopRequireDefault(_EnumText);

    var _Image2 = babelHelpers.interopRequireDefault(_Image);

    var _VariableArray2 = babelHelpers.interopRequireDefault(_VariableArray);

    var _Tuple2 = babelHelpers.interopRequireDefault(_Tuple);

    var _CheckBox2 = babelHelpers.interopRequireDefault(_CheckBox);

    var _resolveDefaults2 = babelHelpers.interopRequireDefault(_resolveDefaults);

    var pointer = babelHelpers.interopRequireWildcard(_pointer);
    exports.Form = _Form2['default'];
    exports.Field = _Field2['default'];
    exports.Date = _Date2['default'];
    exports.Object = _Object2['default'];
    exports.Boolean = _Boolean2['default'];
    exports.Range = _Range2['default'];
    exports.Number = _Number2['default'];
    exports.EnumText = _EnumText2['default'];
    exports.Color = _Color2['default'];
    exports.Image = _Image2['default'];
    exports.Text = _Text2['default'];
    exports.CheckBox = _CheckBox2['default'];
    exports.Tuple = _Tuple2['default'];
    exports.VariableArray = _VariableArray2['default'];
    exports.resolveDefaults = _resolveDefaults2['default'];
    exports.pointer = pointer;
});
//# sourceMappingURL=index.js.map
