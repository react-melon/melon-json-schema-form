(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Uploader', '../factory', 'melon-core/classname/classname', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Uploader'), require('../factory'), require('melon-core/classname/classname'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Uploader, global.factory, global.classname, global.shallowEqual, global.babelHelpers);
        global.Image = mod.exports;
    }
})(this, function (exports, _react, _Uploader, _factory, _classname, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Uploader2 = babelHelpers.interopRequireDefault(_Uploader);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    var Image = function (_Component) {
        babelHelpers.inherits(Image, _Component);

        function Image() {
            babelHelpers.classCallCheck(this, Image);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Image.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        Image.prototype.render = function render() {
            var _props = this.props;
            var schema = _props.schema;
            var value = _props.value;
            var onChange = _props.onChange;
            var name = _props.name;


            var titleClassName = (0, _classname.createClassName)('ui-field-title', 'variant-level-4');

            return _react2['default'].createElement(
                'div',
                { className: 'ui-field ui-field-string variant-string' },
                _react2['default'].createElement(
                    'header',
                    { className: titleClassName },
                    schema.title
                ),
                _react2['default'].createElement(_Uploader2['default'], {
                    size: 'xxs',
                    name: name,
                    variants: ['fluid'],
                    rules: schema,
                    upload: (0, _factory.getUploaderHandler)(),
                    value: value,
                    onChange: onChange })
            );
        };

        return Image;
    }(_react.Component);

    exports['default'] = Image;


    Image.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string,
        onChange: _react.PropTypes.func
    };

    (0, _factory.registerComponent)(function (schema) {

        if (schema.type === 'string' && schema.media && /^image\//.test(schema.media.type)) {
            return Image;
        }
    });
});
//# sourceMappingURL=Image.js.map
