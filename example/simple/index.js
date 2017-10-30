/**
 * @file SimpleDemo
 * @author leon <ludafa@outlook.com>
 */

import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import {AppContainer} from 'react-hot-loader'

function render() {
    ReactDOM.render(
        <AppContainer><App/></AppContainer>,
        document.querySelector('#app')
    );
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => render(App))
}
