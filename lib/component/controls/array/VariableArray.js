(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon/Button', 'melon/Icon', 'melon-core/util/shallowEqual', '../../Field', '../Control', '../../../factory', '../../../util/field', 'classnames', '../../ValidityLabel', '../../../util/schema'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon/Button'), require('melon/Icon'), require('melon-core/util/shallowEqual'), require('../../Field'), require('../Control'), require('../../../factory'), require('../../../util/field'), require('classnames'), require('../../ValidityLabel'), require('../../../util/schema'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Button, global.Icon, global.shallowEqual, global.Field, global.Control, global.factory, global.field, global.classnames, global.ValidityLabel, global.schema);
        global.VariableArray = mod.exports;
    }
})(this, function (exports, _react, _Button, _Icon, _shallowEqual, _Field, _Control, _factory, _field, _classnames, _ValidityLabel, _schema) {
    'use strict';

    exports.__esModule = true;
    exports.VariableArrayItem = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _Button2 = _interopRequireDefault(_Button);

    var _Icon2 = _interopRequireDefault(_Icon);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    var _Field2 = _interopRequireDefault(_Field);

    var _Control2 = _interopRequireDefault(_Control);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

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

    var VariableArrayItem = exports.VariableArrayItem = function (_Component) {
        _inherits(VariableArrayItem, _Component);

        function VariableArrayItem() {
            _classCallCheck(this, VariableArrayItem);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onRemove = _this.onRemove.bind(_this);
            _this.onUpward = _this.onUpward.bind(_this);
            _this.onDownward = _this.onDownward.bind(_this);
            return _this;
        }

        VariableArrayItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        VariableArrayItem.prototype.onUpward = function onUpward(e) {

            e.stopPropagation();

            var _props = this.props;
            var index = _props.index;
            var onUpward = _props.onUpward;


            onUpward(index);
        };

        VariableArrayItem.prototype.onDownward = function onDownward(e) {

            e.stopPropagation();

            var _props2 = this.props;
            var index = _props2.index;
            var onDownward = _props2.onDownward;


            onDownward(index);
        };

        VariableArrayItem.prototype.onRemove = function onRemove() {
            var _props3 = this.props;
            var index = _props3.index;
            var onRemove = _props3.onRemove;


            onRemove(index);
        };

        VariableArrayItem.prototype.render = function render() {
            var _props4 = this.props;
            var schema = _props4.schema;
            var uiSchema = _props4.uiSchema;
            var name = _props4.name;
            var removable = _props4.removable;
            var downable = _props4.downable;
            var index = _props4.index;


            var upButton = index ? _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    size: 'xxs',
                    variants: ['info', 'icon'],
                    onClick: this.onUpward },
                _react2['default'].createElement(_Icon2['default'], { icon: 'arrow-upward' })
            ) : null;

            var downButton = downable ? _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    size: 'xxs',
                    variants: ['info', 'icon'],
                    onClick: this.onDownward },
                _react2['default'].createElement(_Icon2['default'], { icon: 'arrow-downward' })
            ) : null;

            var deleteButton = removable ? _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    size: 'xxs',
                    variants: ['danger', 'icon'],
                    onClick: this.onRemove },
                _react2['default'].createElement(_Icon2['default'], { icon: 'delete' })
            ) : null;

            var title = _react2['default'].createElement(
                'header',
                { className: 'ui-control-variable-array-item-title' },
                _react2['default'].createElement(
                    'label',
                    null,
                    index + 1,
                    '.'
                ),
                upButton,
                downButton,
                deleteButton
            );

            return _react2['default'].createElement(
                'div',
                { className: 'ui-control-variable-array-item' },
                title,
                _react2['default'].createElement(
                    'div',
                    { className: 'ui-control-variable-array-item-content' },
                    _react2['default'].createElement(_Field2['default'], {
                        name: name,
                        schema: schema,
                        uiSchema: uiSchema,
                        control: _Control2['default'],
                        format: _field.format })
                )
            );
        };

        return VariableArrayItem;
    }(_react.Component);

    VariableArrayItem.propTypes = {
        schema: _react.PropTypes.object,
        index: _react.PropTypes.number,
        removable: _react.PropTypes.bool,
        downable: _react.PropTypes.bool,
        upable: _react.PropTypes.bool,
        onUpward: _react.PropTypes.func,
        onDownward: _react.PropTypes.func,
        onRemove: _react.PropTypes.func
    };

    var VariableArray = function (_Component2) {
        _inherits(VariableArray, _Component2);

        function VariableArray() {
            _classCallCheck(this, VariableArray);

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var _this2 = _possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args)));

            _this2.onFieldUpward = _this2.onFieldUpward.bind(_this2);
            _this2.onFieldDownward = _this2.onFieldDownward.bind(_this2);
            _this2.onFieldRemove = _this2.onFieldRemove.bind(_this2);
            _this2.onFieldAdd = _this2.onFieldAdd.bind(_this2);
            return _this2;
        }

        VariableArray.prototype.onFieldAdd = function onFieldAdd() {
            var _props5 = this.props;
            var actions = _props5.actions;
            var name = _props5.name;
            var schema = _props5.schema;


            actions.arrayPush(name, (0, _schema.fill)(void 0, schema.items));
            actions.validate(name);
        };

        VariableArray.prototype.onFieldUpward = function onFieldUpward(index) {
            var _props6 = this.props;
            var actions = _props6.actions;
            var name = _props6.name;


            actions.arraySwap(name, index, index - 1);
            actions.validate(name);
        };

        VariableArray.prototype.onFieldDownward = function onFieldDownward(index) {
            var _props7 = this.props;
            var actions = _props7.actions;
            var name = _props7.name;


            actions.arraySwap(name, index, index + 1);
            actions.validate(name);
        };

        VariableArray.prototype.onFieldRemove = function onFieldRemove(index) {
            var _props8 = this.props;
            var actions = _props8.actions;
            var name = _props8.name;


            actions.arraySplice(name, index, 1);
            actions.validate(name);
        };

        VariableArray.prototype.render = function render() {
            var _this3 = this;

            var _props9 = this.props;
            var name = _props9.name;
            var schema = _props9.schema;
            var value = _props9.value;
            var uiSchema = _props9.uiSchema;
            var meta = _props9.meta;
            var items = schema.items;
            var _schema$minItems = schema.minItems;
            var minItems = _schema$minItems === undefined ? 1 : _schema$minItems;
            var _schema$maxItems = schema.maxItems;
            var maxItems = _schema$maxItems === undefined ? Number.MAX_VALUE : _schema$maxItems;
            var title = schema.title;
            var description = schema.description;


            if (!Array.isArray(value)) {
                value = [];
            }

            var addButton = maxItems > value.length ? _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    size: 'xxs',
                    variants: ['icon', 'info'],
                    onClick: this.onFieldAdd },
                _react2['default'].createElement(_Icon2['default'], { icon: 'add' })
            ) : null;

            var fields = value.length ? value.map(function (record, index, arr) {
                var key = name + '[' + index + ']';
                return _react2['default'].createElement(VariableArrayItem, {
                    key: key,
                    name: key,
                    schema: items,
                    uiSchema: uiSchema && uiSchema.$items,
                    index: index,
                    removable: minItems < arr.length,
                    downable: index < arr.length - 1,
                    upable: index > 1,
                    onUpward: _this3.onFieldUpward,
                    onDownward: _this3.onFieldDownward,
                    onRemove: _this3.onFieldRemove });
            }) : _react2['default'].createElement(
                'p',
                { className: 'ui-control-variable-array-empty-list' },
                _react2['default'].createElement(
                    _Button2['default'],
                    {
                        type: 'button',
                        size: 'xs',
                        variants: ['info'],
                        onClick: this.onFieldAdd },
                    '\u6682\u65E0\u6761\u76EE\uFF0C\u70B9\u51FB\u6DFB\u52A0'
                )
            );

            var touched = meta.touched;
            var error = meta.error;


            var invalid = touched && error && error.message;

            var className = (0, _classnames2['default'])('ui-control-variable-array', {
                'state-invalid': invalid,
                'state-valid': !invalid
            });

            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement(
                    'header',
                    { className: 'ui-control-variable-array-title' },
                    title,
                    addButton
                ),
                description ? _react2['default'].createElement(
                    'p',
                    { className: 'ui-control-variable-array-description' },
                    description
                ) : null,
                _react2['default'].createElement(_ValidityLabel2['default'], meta),
                _react2['default'].createElement(
                    'ul',
                    { className: 'ui-control-variable-array-list' },
                    fields
                )
            );
        };

        return VariableArray;
    }(_react.Component);

    exports['default'] = VariableArray;


    VariableArray.displayName = 'VariableArray';

    VariableArray.propTypes = {
        name: _react.PropTypes.string.isRequired,
        schema: _react.PropTypes.object.isRequired,
        uiSchema: _react.PropTypes.object,
        actions: _react.PropTypes.object.isRequired,
        value: _react.PropTypes.array
    };

    (0, _factory.registerControl)(function (schema) {
        var type = schema.type;
        var items = schema.items;


        if (type === 'array' && !Array.isArray(items)) {
            return VariableArray;
        }
    });
});
//# sourceMappingURL=VariableArray.js.map
