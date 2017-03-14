(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../Control', '../../../factory', '../../../util/field', '../../Field', '../../ValidityLabel', '../../../util/createStateClassName'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../Control'), require('../../../factory'), require('../../../util/field'), require('../../Field'), require('../../ValidityLabel'), require('../../../util/createStateClassName'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Control, global.factory, global.field, global.Field, global.ValidityLabel, global.createStateClassName);
        global.Tuple = mod.exports;
    }
})(this, function (exports, _react, _Control, _factory, _field, _Field, _ValidityLabel, _createStateClassName) {
    'use strict';

    exports.__esModule = true;
    exports.default = Tuple;

    var _react2 = _interopRequireDefault(_react);

    var _Control2 = _interopRequireDefault(_Control);

    var _Field2 = _interopRequireDefault(_Field);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

    var _createStateClassName2 = _interopRequireDefault(_createStateClassName);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /* eslint-disable fecs-prefer-class */

    /**
     * Tuple
     *
     * @class
     * @param {Object} props 属性
     */
    function Tuple(props) {
        var name = props.name,
            schema = props.schema,
            uiSchema = props.uiSchema,
            meta = props.meta,
            disabled = props.disabled,
            readOnly = props.readOnly;
        var items = schema.items,
            title = schema.title,
            description = schema.description;


        var className = (0, _createStateClassName2['default'])('ui-control-tuple', props);

        return _react2['default'].createElement(
            'div',
            { className: className },
            title ? _react2['default'].createElement(
                'header',
                { className: 'ui-control-tuple-title' },
                title
            ) : null,
            description ? _react2['default'].createElement(
                'p',
                { className: 'ui-control-tuple-description' },
                description
            ) : null,
            _react2['default'].createElement(_ValidityLabel2['default'], meta),
            _react2['default'].createElement(
                'ol',
                { className: 'ui-field-content' },
                items.map(function (item, index) {
                    var key = name + '[' + index + ']';
                    return _react2['default'].createElement(
                        'li',
                        { key: key },
                        _react2['default'].createElement(_Field2['default'], {
                            uiSchema: uiSchema && uiSchema[index],
                            schema: item,
                            name: key,
                            control: _Control2['default'],
                            format: _field.format,
                            disabled: disabled,
                            readOnly: readOnly })
                    );
                })
            )
        );
    } /**
       * @file Tulpe
       * @author leon <ludafa@outlook.com>
       */

    Tuple.displayName = 'Tuple';

    Tuple.propTypes = {
        value: _react.PropTypes.array,
        schema: _react.PropTypes.object.isRequired
    };

    (0, _factory.registerControl)(function (schema) {
        var type = schema.type,
            items = schema.items;


        if (type === 'array' && Array.isArray(items)) {
            return Tuple;
        }
    });
});
//# sourceMappingURL=Tuple.js.map
