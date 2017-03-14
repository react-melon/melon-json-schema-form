(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Uploader', 'melon-core/util/shallowEqual', '../../../factory', '../../ValidityLabel', '../../../util/createStateClassName'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Uploader'), require('melon-core/util/shallowEqual'), require('../../../factory'), require('../../ValidityLabel'), require('../../../util/createStateClassName'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Uploader, global.shallowEqual, global.factory, global.ValidityLabel, global.createStateClassName);
        global.Image = mod.exports;
    }
})(this, function (exports, _react, _Uploader, _shallowEqual, _factory, _ValidityLabel, _createStateClassName) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _Uploader2 = _interopRequireDefault(_Uploader);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    var _createStateClassName2 = _interopRequireDefault(_createStateClassName);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Image = function (_Component) {
        _inherits(Image, _Component);

        function Image() {
            _classCallCheck(this, Image);

            return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Image.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        Image.prototype.render = function render() {
            var _props = this.props,
                schema = _props.schema,
                value = _props.value,
                name = _props.name,
                actions = _props.actions,
                meta = _props.meta;
            var title = schema.title,
                description = schema.description;
            var pending = meta.pending,
                touched = meta.touched,
                error = meta.error;


            var invalid = touched && error && error.message;

            var className = (0, _createStateClassName2['default'])('ui-control-image', this.props);

            return _react2['default'].createElement(
                'div',
                { className: className },
                title ? _react2['default'].createElement(
                    'header',
                    {
                        className: 'ui-control-image-title' },
                    title
                ) : null,
                description ? _react2['default'].createElement(
                    'p',
                    {
                        className: 'ui-control-image-decription' },
                    description
                ) : null,
                _react2['default'].createElement(_Uploader2['default'], {
                    size: 'xxs',
                    variants: ['fluid'],
                    style: { maxWidth: '100%' },
                    states: { invalid: invalid },
                    uploading: pending,
                    onFileChange: function onFileChange(file) {
                        return file ? actions.upload(name, file) : actions.change(name, '');
                    },
                    onUploadCancel: function onUploadCancel() {
                        return actions.stopPending(name);
                    },
                    value: value }),
                _react2['default'].createElement(_ValidityLabel2['default'], meta)
            );
        };

        return Image;
    }(_react.Component);

    exports['default'] = Image;


    Image.propTypes = {
        schema: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.string
    };

    (0, _factory.registerControl)(function (schema) {

        if (schema.type === 'string' && schema.media && /^image\//.test(schema.media.type)) {
            return Image;
        }
    });
});
//# sourceMappingURL=Image.js.map
