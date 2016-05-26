/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './factory', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./factory'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.factory, global.babelHelpers);
        global.Field = mod.exports;
    }
})(this, function (exports, _react, _factory, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var factory = babelHelpers.interopRequireWildcard(_factory);

    var Field = function (_Component) {
        babelHelpers.inherits(Field, _Component);

        function Field() {
            babelHelpers.classCallCheck(this, Field);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Field.prototype.render = function render() {

            var schema = this.props.schema;
            var type = schema.type;
            var AcutualComponent = factory.getComponent(type);

            return _react2['default'].createElement(AcutualComponent, this.props);
        };

        return Field;
    }(_react.Component);

    exports['default'] = Field;


    Field.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        pointer: _react.PropTypes.string.isRequired
    };

    Field.defaultProps = {
        pointer: ''
    };
});