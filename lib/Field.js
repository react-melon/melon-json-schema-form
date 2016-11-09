(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './factory', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./factory'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.factory, global.babelHelpers);
        global.Field = mod.exports;
    }
})(this, function (exports, _react, _factory, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var factory = babelHelpers.interopRequireWildcard(_factory);

    var Field = function (_Component) {
        babelHelpers.inherits(Field, _Component);

        function Field() {
            babelHelpers.classCallCheck(this, Field);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Field.prototype.render = function render() {

            var AcutualComponent = factory.getComponent(this.props.schema);

            return AcutualComponent ? _react2['default'].createElement(AcutualComponent, this.props) : null;
        };

        return Field;
    }(_react.Component);

    exports['default'] = Field;


    Field.propTypes = {
        uiSchema: _react.PropTypes.object.isRequired,
        schema: _react.PropTypes.object.isRequired,
        level: _react.PropTypes.number.isRequired
    };

    Field.defaultProps = {
        level: 0,
        uiSchema: {}
    };
});
//# sourceMappingURL=Field.js.map
