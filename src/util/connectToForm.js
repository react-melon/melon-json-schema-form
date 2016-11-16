/**
 * @file FormConnector
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';

import {getFieldData} from '../selector';
import {
    focusField,
    changeField,
    blurField,
    addField,
    removeField
} from '../action';
import {bindActionCreators} from './bindActionCreators';
import shallowEqual from 'shallow-equal/objects';

export function connectToForm(Field) {

    class FormConnector extends Component {

        constructor(props, context) {
            super(props, context);
            this.state = getFieldData(
                context.store.getState(),
                props.pointer
            );
        }

        componentWillMount() {
            this.actions = bindActionCreators(
                this.context.store.dispatch,
                {
                    focusField,
                    changeField,
                    blurField,
                    addField,
                    removeField
                }
            );
        }

        componentDidMount() {

            const store = this.context.store;

            this.unsubscribe = store.subscribe(() => {

                const nextFieldData = getFieldData(
                    store.getState(),
                    this.props.pointer
                );

                if (nextFieldData !== this.state) {
                    this.setState(nextFieldData);
                }

            });

        }

        componentWillUnmount() {
            this.unsubscribe();
            this.unsubscribe = null;
        }

        shouldComponentUpdate(nextProps, nextState) {
            return !shallowEqual(nextState, this.state);
        }

        render() {

            return (
                <Field
                    {...this.props}
                    {...this.state}
                    actions={this.context.actions} />
            );
        }

    }

    FormConnector.displayName = `FormConnector(${Field.displayName || Field.name})`;

    FormConnector.contextTypes = {
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    return FormConnector;

}
