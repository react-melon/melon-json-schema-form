/**
 * @file Variable Array
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes, Component} from 'react';
import InputComponent from 'melon-core/InputComponent';
import {registerComponent, getComponent} from '../factory';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
import resolveDefaults from '../util/resolveDefaults';
import Validity from 'melon-core/Validity';
import shallowEqual from 'melon-core/util/shallowEqual';

export class VariableArrayItem extends Component {

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
        this.onUpward = this.onUpward.bind(this);
        this.onDownward = this.onDownward.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    onChange(e) {

        const {
            onChange,
            index
        } = this.props;

        onChange({
            value: e.value,
            index
        });

    }

    onUpward(e) {

        e.stopPropagation();

        const {
            index,
            onUpward
        } = this.props;

        onUpward(index);

    }

    onDownward(e) {

        e.stopPropagation();

        const {
            index,
            onDownward
        } = this.props;

        onDownward(index);

    }

    render() {

        const {
            schema,
            level,
            index,
            name,
            value,
            removable,
            downable
        } = this.props;

        const Field = getComponent(schema);

        if (!Field) {
            return null;
        }


        const upButton = index
            ? (
                <Button
                    type="button"
                    size="xxs"
                    variants={['info', 'icon']}
                    onClick={this.onUpward}>
                    <Icon icon="arrow-upward" />
                </Button>
            )
            : null;

        const downButton = downable
            ? (
                <Button
                    type="button"
                    size="xxs"
                    variants={['info', 'icon']}
                    onClick={this.onDownward}>
                    <Icon icon="arrow-downward" />
                </Button>
            )
            : null;

        const deleteButton = removable
            ? (
                <Button
                    size="xxs"
                    variants={['danger', 'icon']}
                    onClick={() => {

                    }}>
                    <Icon icon="delete" />
                </Button>
            )
            : null;

        const title = (
            <header className="ui-field-array-item-title">
                <label>{index + 1}.</label>
                {upButton}
                {downButton}
                {deleteButton}
            </header>
        );

        return (
            <li>
                {title}
                <Field
                    level={level}
                    name={name}
                    value={value}
                    schema={schema}
                    onChange={this.onChange} />
            </li>
        );
    }

}

VariableArrayItem.propTypes = {
    schema: PropTypes.object,
    level: PropTypes.number,
    index: PropTypes.number,
    removable: PropTypes.bool,
    downable: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onUpward: PropTypes.func,
    onDownward: PropTypes.func,
    onRemove: PropTypes.func
};

export default class VariableArray extends InputComponent {

    constructor(...args) {
        super(...args);
        this.onFieldUpward = this.onFieldUpward.bind(this);
        this.onFieldRemove = this.onFieldRemove.bind(this);
        this.onFieldDownward = this.onFieldDownward.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldUpward(index) {

        const value = this.state.value;

        this.onChange({
            type: 'change',
            target: this,
            value: [
                ...value.slice(0, index - 1),
                value[index],
                value[index - 1],
                ...value.slice(index + 1)
            ]
        });

    }

    onFieldRemove(index) {
        const value = this.state.value;

        this.onChange({
            type: 'change',
            target: this,
            value: [
                ...value.slice(0, index),
                ...value.slice(index + 1)
            ]
        });
    }

    onFieldDownward(index) {

        const value = this.state.value;

        this.onChange({
            type: 'change',
            target: this,
            value: [
                ...value.slice(0, index),
                value[index + 1],
                value[index],
                ...value.slice(index + 2)
            ]
        });

    }

    onFieldChange(e) {

        const thisValue = this.state.value;
        const {
            value,
            index
        } = e;

        this.onChange({
            type: 'change',
            target: this,
            value: [
                ...thisValue.slice(0, index),
                value,
                ...thisValue.slice(index + 1)
            ]
        });

    }

    render() {

        const {
            pointer,
            props
        } = this;

        let {
            schema,
            level,
            value
        } = props;

        const {
            items,
            title,
            minItems = 1,
            maxItems = Infinity
        } = schema;

        // 如果 value 没有任何一项，那这个时候数组空
        // 那么我先做一个默认值项出来
        if (!value || !value.length) {
            value = [
                resolveDefaults(items)
            ];
        }

        const addButton = maxItems > value.length
            ? (
                <Button
                    type="button"
                    size="xxs"
                    variants={['icon', 'info']}
                    onClick={() => {
                        this.onChange({
                            type: 'change',
                            target: this,
                            value: [
                                ...value,
                                resolveDefaults(schema)
                            ]
                        });
                    }}>
                    <Icon icon="add" />
                </Button>
            )
            : null;

        return (
            <fieldset className="ui-field ui-field-array variant-array">
                <header
                    className="ui-field-title ui-field-array-title variant-level-4">
                    <label>{title}</label>
                    {addButton}
                </header>
                <ul className="ui-field-content">
                    {value.map((record, index, arr) => (
                        <VariableArrayItem
                            key={`${pointer}/${index}`}
                            schema={items}
                            removable={minItems < arr.length}
                            downable={index < arr.length - 1}
                            level={level + 1}
                            index={index}
                            name={index + ''}
                            value={record}
                            onChange={this.onFieldChange}
                            onUpward={this.onFieldUpward}
                            onDownward={this.onFieldDownward} />
                    ))}
                </ul>
                <Validity validity={this.state.validity} />
            </fieldset>
        );

    }

}

VariableArray.displayName = 'VariableArray';

VariableArray.defaultProps = {
    ...InputComponent.defaultProps,
    onChange: PropTypes.func.isRequired,
    value: []
};

registerComponent(function (schema) {

    const {
        type,
        items
    } = schema;

    if (type === 'array' && !Array.isArray(items)) {
        return VariableArray;
    }

});
