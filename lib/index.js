(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './factory', './Form', './Field', './Object', './Boolean', './number/Range', './number/Number', './string/Color', './string/Date', './string/EnumText', './string/Image', './string/Text', './array/CheckBox', './array/Tuple', './array/VariableArray', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./factory'), require('./Form'), require('./Field'), require('./Object'), require('./Boolean'), require('./number/Range'), require('./number/Number'), require('./string/Color'), require('./string/Date'), require('./string/EnumText'), require('./string/Image'), require('./string/Text'), require('./array/CheckBox'), require('./array/Tuple'), require('./array/VariableArray'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.factory, global.Form, global.Field, global.Object, global.Boolean, global.Range, global.Number, global.Color, global.Date, global.EnumText, global.Image, global.Text, global.CheckBox, global.Tuple, global.VariableArray, global.babelHelpers);
        global.index = mod.exports;
    }
})(this, function (exports, _factory, _Form, _Field, _Object, _Boolean, _Range, _Number, _Color, _Date, _EnumText, _Image, _Text, _CheckBox, _Tuple, _VariableArray, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.VariableArray = exports.Tuple = exports.CheckBox = exports.Text = exports.Image = exports.Color = exports.EnumText = exports.Number = exports.Range = exports.Boolean = exports.Object = exports.Date = exports.Field = exports.Form = undefined;
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

    var _Range2 = babelHelpers.interopRequireDefault(_Range);

    var _Number2 = babelHelpers.interopRequireDefault(_Number);

    var _Color2 = babelHelpers.interopRequireDefault(_Color);

    var _Date2 = babelHelpers.interopRequireDefault(_Date);

    var _EnumText2 = babelHelpers.interopRequireDefault(_EnumText);

    var _Image2 = babelHelpers.interopRequireDefault(_Image);

    var _Text2 = babelHelpers.interopRequireDefault(_Text);

    var _CheckBox2 = babelHelpers.interopRequireDefault(_CheckBox);

    var _Tuple2 = babelHelpers.interopRequireDefault(_Tuple);

    var _VariableArray2 = babelHelpers.interopRequireDefault(_VariableArray);

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
});
//# sourceMappingURL=index.js.map
