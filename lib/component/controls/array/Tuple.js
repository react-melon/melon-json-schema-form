(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../Control', '../../../factory', '../../../util/field', '../../Field', 'classnames', '../../ValidityLabel'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../Control'), require('../../../factory'), require('../../../util/field'), require('../../Field'), require('classnames'), require('../../ValidityLabel'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Control, global.factory, global.field, global.Field, global.classnames, global.ValidityLabel);
        global.Tuple = mod.exports;
    }
})(this, function (exports, _react, _Control, _factory, _field, _Field, _classnames, _ValidityLabel) {
    'use strict';

    exports.__esModule = true;
    exports.default = Tuple;

    var _react2 = _interopRequireDefault(_react);

    var _Control2 = _interopRequireDefault(_Control);

    var _Field2 = _interopRequireDefault(_Field);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _ValidityLabel2 = _interopRequireDefault(_ValidityLabel);

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
        var name = props.name;
        var schema = props.schema;
        var uiSchema = props.uiSchema;
        var meta = props.meta;
        var items = schema.items;
        var title = schema.title;
        var description = schema.description;
        var touched = meta.touched;
        var error = meta.error;


        var invalid = touched && error && error.message;

        var className = (0, _classnames2['default'])('ui-control-tuple', {
            'state-valid': !invalid,
            'state-invalid': invalid
        });

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
                            format: _field.format })
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
        var type = schema.type;
        var items = schema.items;


        if (type === 'array' && Array.isArray(items)) {
            return Tuple;
        }
    });
});
//# sourceMappingURL=Tuple.js.map
