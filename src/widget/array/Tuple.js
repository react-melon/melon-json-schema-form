/**
 * @file Tulpe
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import InputComponent from 'melon-core/InputComponent';
import {createClassName} from 'melon-core/classname/classname';
import shallowEqual from 'melon-core/util/shallowEqual';

import {registerWidget, getWidget} from '../../factory';
import resolveDefaults from '../../util/resolveDefaults';

export class ArrayTupleItem extends Component {

    constructor(...args) {
        super(...args);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props, nextProps);
    }

    onFieldChange(e) {

        const {
            target,
            value
        } = e;

        const {
            onChange,
            index
        } = this.props;

        onChange({
            type: 'change',
            target,
            value,
            index,
            pointer: this.pointer
        });

    }

    render() {

        const {
            level,
            schema,
            value,
            defaultValue,
            name,
            Field
        } = this.props;


        return (
            <Field
                level={level}
                schema={schema}
                value={value}
                defaultValue={defaultValue}
                name={name}
                onChange={this.onFieldChange} />
        );

    }

}

export default class ArrayTuple extends InputComponent {

    constructor(...args) {
        super(...args);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(e) {

        const tuple = this.state.value;

        const {
            index,
            value
        } = e;

        this.onChange({
            target: this,
            value: [
                ...tuple.slice(0, index),
                value,
                ...tuple.slice(index + 1)
            ]
        });

    }

    render() {

        const {props, pointer} = this;

        const {
            schema,
            value = [],
            level
        } = props;

        const {items, title} = schema;

        const titleClassName = createClassName(
            'ui-field-array-title',
            'ui-field-title',
            `variant-level-${level}`
        );

        return (
            <fieldset className="ui-field ui-field-array variant-tuple">
                <header className={titleClassName}>
                    {title}
                </header>
                <ol className="ui-field-content">
                    {items.map((item, index) => {

                        const Field = getWidget(item);

                        if (!Field) {
                            return null;
                        }

                        const recordPointer = `${pointer}/${index}`;

                        return (
                            <li key={recordPointer}>
                                <ArrayTupleItem
                                    Field={Field}
                                    level={level + 1}
                                    schema={item}
                                    value={value[index]}
                                    defaultValue={resolveDefaults(item)}
                                    index={index}
                                    name={index + ''}
                                    onChange={this.onFieldChange} />
                            </li>
                        );
                    })}
                </ol>
            </fieldset>
        );

    }

}

ArrayTuple.displayName = 'Tuple';

ArrayTuple.propTypes = {
    ...InputComponent.propTypes,
    value: PropTypes.array,
    schema: PropTypes.object,
    level: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

ArrayTuple.defaultProps = {
    ...InputComponent.defaultProps,
    value: []
};

registerWidget(function (schema) {

    const {
        type,
        items
    } = schema;

    if (type === 'array' && Array.isArray(items)) {
        return ArrayTuple;
    }

});
