/**
 * @file Variable Array
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes, Component} from 'react';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
import shallowEqual from 'melon-core/util/shallowEqual';
import Field from '../../Field';
import {registerWidget} from '../../../factory';
import {resolveDefaults} from '../../../util/resolveDefaults';

export class VariableArrayItem extends Component {

    constructor(...args) {
        super(...args);
        this.onRemove = this.onRemove.bind(this);
        this.onUpward = this.onUpward.bind(this);
        this.onDownward = this.onDownward.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
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

    onRemove() {

        const {
            index,
            onRemove
        } = this.props;

        onRemove(index);

    }

    render() {

        const {
            schema,
            name,
            removable,
            downable,
            index
        } = this.props;

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
                    type="button"
                    size="xxs"
                    variants={['danger', 'icon']}
                    onClick={this.onRemove}>
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
                <Field name={name} schema={schema} />
            </li>
        );
    }

}

VariableArrayItem.propTypes = {
    schema: PropTypes.object,
    index: PropTypes.number,
    removable: PropTypes.bool,
    downable: PropTypes.bool,
    onUpward: PropTypes.func,
    onDownward: PropTypes.func,
    onRemove: PropTypes.func
};

export default class VariableArray extends Component {

    constructor(...args) {
        super(...args);
        this.onFieldUpward = this.onFieldUpward.bind(this);
        this.onFieldDownward = this.onFieldDownward.bind(this);
        this.onFieldRemove = this.onFieldRemove.bind(this);
        this.onFieldAdd = this.onFieldAdd.bind(this);
    }

    onFieldAdd() {

        const {
            actions,
            name,
            schema
        } = this.props;

        actions.arrayPush(name, resolveDefaults(schema.items));

    }

    onFieldUpward(index) {

        const {
            actions,
            name
        } = this.props;

        actions.arraySwap(name, index, index - 1);

    }

    onFieldDownward(index) {

        const {
            actions,
            name
        } = this.props;

        actions.arraySwap(name, index, index + 1);

    }

    onFieldRemove(index) {

        const {
            actions,
            name
        } = this.props;

        actions.arraySplice(name, index, 1);

    }

    render() {

        let {
            name,
            schema,
            value
            // meta,
            // validity
        } = this.props;

        const {
            items,
            minItems = 1,
            maxItems = Number.MAX_VALUE
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
                    onClick={this.onFieldAdd}>
                    <Icon icon="add" />
                </Button>
            )
            : null;

        const fields = value.map((record, index, arr) => {
            const key = `${name}[${index}]`;
            return (
                <VariableArrayItem
                    key={key}
                    name={key}
                    schema={items}
                    index={index}
                    removable={minItems < arr.length}
                    downable={index < arr.length - 1}
                    onUpward={this.onFieldUpward}
                    onDownward={this.onFieldDownward}
                    onRemove={this.onFieldRemove} />
            );
        });

        return (
            <fieldset className="ui-field ui-field-array variant-array">
                <header>{addButton}</header>
                <ul>{fields}</ul>
            </fieldset>
        );

    }

}

VariableArray.displayName = 'VariableArray';

VariableArray.propTypes = {
    name: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    actions: PropTypes.object.isRequired
};

registerWidget(function (schema) {

    const {
        type,
        items
    } = schema;

    if (type === 'array' && !Array.isArray(items)) {
        return VariableArray;
    }

});
