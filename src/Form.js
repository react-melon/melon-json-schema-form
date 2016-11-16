/**
 * @file melon json schema form
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Component} from 'react';
import Field from './Field';
import {createStore, applyMiddleware} from 'redux';
import validator from './validator';
import createReducer from './reducer';
import {isValid, getValue} from './selector';
import {actionToEvent} from './middleware';
import {bindActionCreators} from './util/bindActionCreators';

import {
    loadForm,
    mergeForm,
    validateForm,
    blurField,
    focusField,
    spliceArrayField,
    changeField
} from './action';

export default class JSONSchemaForm extends Component {

    constructor(props, context) {

        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);

        const reducer = createReducer(this);
        const middlewares = [actionToEvent(this)];

        if (process.env.NODE_ENV === 'dev') {
            const createLogger = require('redux-logger');
            const logger = createLogger({
                collapsed: true,
                logErrors: false
            });
            middlewares.push(logger);
        }

        this.store = createStore(reducer, applyMiddleware(...middlewares));

        this.fieldActions = bindActionCreators(
            this.store.dispatch,
            {
                blurField,
                focusField,
                spliceArrayField,
                changeField
            }
        );

    }

    componentWillMount() {

        const {
            value,
            schema,
            validator
        } = this.props;

        this.store.dispatch(loadForm(value, schema, validator));

    }

    componentWillReceiveProps(nextProps) {
        const {
            value,
            schema,
            validator
        } = nextProps;
        this.store.dispatch(mergeForm(value, schema, validator));
    }

    getChildContext() {
        return {
            store: this.store,
            actions: this.fieldActions
        };
    }

    getValue() {
        return getValue(this.store.getState());
    }

    validate() {

        const store = this.store;

        store.dispatch(validateForm());

        return isValid(store.getState());

    }

    onSubmit(e) {

        const {
            noValidate,
            onSubmit
        } = this.props;

        if (!noValidate) {
            if (!this.validate()) {
                e.preventDefault();
                return;
            }
        }

        if (onSubmit) {
            e.data = this.getValue();
            onSubmit(e);
        }

    }

    render() {

        const {
            schema,
            uiSchema,
            children,
            ...rest
        } = this.props;

        return (
            <form {...rest} onSubmit={this.onSubmit} value={null}>
                <Field schema={schema} uiSchema={uiSchema} pointer={''} />
                {children}
            </form>
        );

    }

}

JSONSchemaForm.displayName = 'JSONSchemaForm';

JSONSchemaForm.defaultProps = {
    validator,
    uiSchema: {}
};

JSONSchemaForm.childContextTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

JSONSchemaForm.propTypes = {
    schema: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func,
    onSubmit: PropTypes.func
};
