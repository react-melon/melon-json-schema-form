/**
 * @file App
 * @author leon <ludafa@outlook.com>
 */

import Form from './Form';
import ValuePanel from './ValuePanel';
import schema from './schema';
import uiSchema from './uiSchema';
import Button from 'melon/Button';
import React from 'react';
import {model} from './constants';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {fill, createReducer} from '../../src/index';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import './index.styl';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    combineReducers({
        [model]: createReducer(
            model,
            fill({flow: '1000', cost: '0'}, schema)
        )
    }),
    composeEnhancers(
        applyMiddleware(
            thunk,
            logger({
                collapsed: true,
                logErrors: false
            })
        )
    )
);

export default () => (
    <Provider store={store}>
        <div className="ui-app">
            <Form schema={schema} uiSchema={uiSchema} model={model}>
                <footer>
                    <Button variants={['raised', 'info']}>Submit</Button>
                </footer>
            </Form>
            <ValuePanel />
        </div>
    </Provider>
);
