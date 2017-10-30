/**
 * @file Variable Array
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
import shallowEqual from 'melon-core/util/shallowEqual';
import Field from '../../Field';
import Control from '../Control';
import {registerControl} from '../../../factory';
import {format} from '../../../util/field';
import ValidityLabel from '../../ValidityLabel';
import {fill} from '../../../util/schema';
import createStateClassName from '../../../util/createStateClassName';

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
            uiSchema,
            name,
            removable,
            downable,
            index,
            disabled,
            readOnly
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
            <header className="ui-control-variable-array-item-title">
                <label>{index + 1}.</label>
                {upButton}
                {downButton}
                {deleteButton}
            </header>
        );

        return (
            <div className="ui-control-variable-array-item">
                {title}
                <div className="ui-control-variable-array-item-content">
                    <Field
                        disabled={disabled}
                        readOnly={readOnly}
                        name={name}
                        schema={schema}
                        uiSchema={uiSchema}
                        control={Control}
                        format={format} />
                </div>
            </div>
        );
    }

}

VariableArrayItem.propTypes = {
    schema: PropTypes.object,
    index: PropTypes.number,
    removable: PropTypes.bool,
    downable: PropTypes.bool,
    upable: PropTypes.bool,
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

        actions.arrayPush(name, fill(void 0, schema.items));
        actions.validate(name);

    }

    onFieldUpward(index) {

        const {
            actions,
            name
        } = this.props;

        actions.arraySwap(name, index, index - 1);
        actions.validate(name);

    }

    onFieldDownward(index) {

        const {
            actions,
            name
        } = this.props;

        actions.arraySwap(name, index, index + 1);
        actions.validate(name);

    }

    onFieldRemove(index) {

        const {
            actions,
            name
        } = this.props;

        actions.arraySplice(name, index, 1);
        actions.validate(name);

    }

    render() {

        let {
            name,
            schema,
            value,
            uiSchema,
            meta,
            disabled,
            readOnly
        } = this.props;

        const {
            items,
            minItems = 1,
            maxItems = Number.MAX_VALUE,
            title,
            description
        } = schema;

        if (!Array.isArray(value)) {
            value = [];
        }

        const addButton = !readOnly && maxItems > value.length
            ? (
                <Button
                    disabled={disabled}
                    type="button"
                    size="xxs"
                    variants={['icon', 'info']}
                    onClick={this.onFieldAdd}>
                    <Icon icon="add" />
                </Button>
            )
            : null;

        const fields = value.length
            ? value.map((record, index, arr) => {
                const key = `${name}[${index}]`;
                return (
                    <VariableArrayItem
                        key={key}
                        name={key}
                        schema={items}
                        uiSchema={uiSchema && uiSchema.$items}
                        index={index}
                        disabled={disabled}
                        readOnly={readOnly}
                        removable={!disabled && !readOnly && minItems < arr.length}
                        downable={!disabled && !readOnly && index < arr.length - 1}
                        upable={!disabled && !readOnly && index > 1}
                        onUpward={this.onFieldUpward}
                        onDownward={this.onFieldDownward}
                        onRemove={this.onFieldRemove} />
                );
            })
            : (
                <p className="ui-control-variable-array-empty-list">
                    <Button
                        disabled={disabled || readOnly}
                        type="button"
                        size="xs"
                        variants={['info']}
                        onClick={this.onFieldAdd}>暂无条目，点击添加</Button>
                </p>
            );

        const className = createStateClassName(
            'ui-control-variable-array',
            this.props
        );

        return (
            <div className={className}>
                <header className="ui-control-variable-array-title">
                    {title}
                    {addButton}
                </header>
                {
                    description
                        ? (
                            <p className="ui-control-variable-array-description">
                                {description}
                            </p>
                        )
                        : null
                }
                <ValidityLabel {...meta} />
                <ul className="ui-control-variable-array-list">
                    {fields}
                </ul>
            </div>
        );

    }

}

VariableArray.displayName = 'VariableArray';

VariableArray.propTypes = {
    name: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    actions: PropTypes.object.isRequired,
    value: PropTypes.array
};

registerControl(function (schema) {

    const {
        type,
        items
    } = schema;

    if (type === 'array' && !Array.isArray(items)) {
        return VariableArray;
    }

});
