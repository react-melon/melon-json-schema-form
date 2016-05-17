/**
 * @file app
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import ei from 'ei';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.app = new ei.App({
            routes: this.props.routes
        });
    }

    getChildContext() {
        return {
            app: this.app
        };
    }

    render() {
        return (
            <div className="ui-app">{this.props.children}</div>
        );
    }

}

App.propTypes = {
    routes: PropTypes.array.isRequired
};

App.childContextTypes = {
    app: PropTypes.object.isRequired
};

module.exports = App;
