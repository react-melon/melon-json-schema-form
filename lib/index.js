(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './component/controls/Object', './component/controls/Boolean', './component/controls/string/Text', './component/controls/string/Color', './component/controls/string/Date', './component/controls/string/Time', './component/controls/string/DateTime', './component/controls/string/Enum', './component/controls/string/Range', './component/controls/string/Image', './component/controls/array/VariableArray', './component/controls/array/Tuple', './component/controls/array/CheckBox', './component/controls/Control', './component/ValidityLabel', './Form', './component/Field', './util/schema', './createReducer'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./component/controls/Object'), require('./component/controls/Boolean'), require('./component/controls/string/Text'), require('./component/controls/string/Color'), require('./component/controls/string/Date'), require('./component/controls/string/Time'), require('./component/controls/string/DateTime'), require('./component/controls/string/Enum'), require('./component/controls/string/Range'), require('./component/controls/string/Image'), require('./component/controls/array/VariableArray'), require('./component/controls/array/Tuple'), require('./component/controls/array/CheckBox'), require('./component/controls/Control'), require('./component/ValidityLabel'), require('./Form'), require('./component/Field'), require('./util/schema'), require('./createReducer'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Object, global.Boolean, global.Text, global.Color, global.Date, global.Time, global.DateTime, global.Enum, global.Range, global.Image, global.VariableArray, global.Tuple, global.CheckBox, global.Control, global.ValidityLabel, global.Form, global.Field, global.schema, global.createReducer);
        global.index = mod.exports;
    }
})(this, function (exports, _Object, _Boolean, _Text, _Color, _Date, _Time, _DateTime, _Enum, _Range, _Image, _VariableArray, _Tuple, _CheckBox, _Control, _ValidityLabel, _Form, _Field, _schema, _createReducer) {
    'use strict';

    exports.__esModule = true;
    exports.fill = exports.Control = exports.CheckBoxControl = exports.TupleControl = exports.VariableArrayControl = exports.ImageControl = exports.EnumControl = exports.DateTimeControl = exports.TimeControl = exports.DateControl = exports.ColorControl = exports.TextControl = exports.RangeControl = exports.BooleanControl = exports.ObjectControl = exports.ValidityLabel = exports.Field = exports.Form = exports.createReducer = undefined;

    var _Object2 = _interopRequireDefault(_Object);

    var _Boolean2 = _interopRequireDefault(_Boolean);

    var _Text2 = _interopRequireDefault(_Text);

    var _Color2 = _interopRequireDefault(_Color);

    var _Date2 = _interopRequireDefault(_Date);

    var _Time2 = _interopRequireDefault(_Time);

    var _DateTime2 = _interopRequireDefault(_DateTime);

    var _Enum2 = _interopRequireDefault(_Enum);

    var _Range2 = _interopRequireDefault(_Range);

    var _Image2 = _interopRequireDefault(_Image);

    var _VariableArray2 = _interopRequireDefault(_VariableArray);

    var _Tuple2 = _interopRequireDefault(_Tuple);

    var _CheckBox2 = _interopRequireDefault(_CheckBox);

    var _Control2 = _interopRequireDefault(_Control);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    var _Form2 = _interopRequireDefault(_Form);

    var _Field2 = _interopRequireDefault(_Field);

    var _createReducer2 = _interopRequireDefault(_createReducer);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.createReducer = _createReducer2['default'];
    exports.Form = _Form2['default'];
    exports.Field = _Field2['default'];
    exports.ValidityLabel = _ValidityLabel2['default'];
    exports.ObjectControl = _Object2['default'];
    exports.BooleanControl = _Boolean2['default'];
    exports.RangeControl = _Range2['default'];
    exports.TextControl = _Text2['default'];
    exports.ColorControl = _Color2['default'];
    exports.DateControl = _Date2['default'];
    exports.TimeControl = _Time2['default'];
    exports.DateTimeControl = _DateTime2['default'];
    exports.EnumControl = _Enum2['default'];
    exports.ImageControl = _Image2['default'];
    exports.VariableArrayControl = _VariableArray2['default'];
    exports.TupleControl = _Tuple2['default'];
    exports.CheckBoxControl = _CheckBox2['default'];
    exports.Control = _Control2['default'];
    exports.fill = _schema.fill;
});
//# sourceMappingURL=index.js.map
