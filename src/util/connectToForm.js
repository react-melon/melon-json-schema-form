/**
 * @file FormConnector
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';

import {getFieldData} from '../selector';
import shallowEqual from 'shallow-equal/objects';

export function connectToForm(Field) {

    class FormConnector extends Component {

        constructor(props, context) {
            super(props, context);
            this.state = {
                data: getFieldData(
                    context.store.getState(),
                    props.name
                )
            };
        }

        componentDidMount() {

            const store = this.context.store;

            this.unsubscribe = store.subscribe(() => {

                const nextFieldData = getFieldData(
                    store.getState(),
                    this.props.name
                );

                if (nextFieldData !== this.state) {
                    this.setState({data: nextFieldData});
                }

            });

        }

        shouldComponentUpdate(nextProps, nextState) {
            return !shallowEqual(nextState, this.state);
        }

        componentWillUnmount() {
            this.unsubscribe();
            this.unsubscribe = null;
        }

        render() {

            return (
                <Field
                    {...this.props}
                    {...this.state.data}
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
