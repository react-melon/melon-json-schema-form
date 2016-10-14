/**
 * @file Field
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Component} from 'react';
import * as factory from './factory';

export default class Field extends Component {

    render() {

        const AcutualComponent = factory.getComponent(this.props.schema);

        return AcutualComponent
            ? <AcutualComponent {...this.props} />
            : null;

    }

}

Field.propTypes = {
    schema: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired
};

Field.defaultProps = {
    level: 0
};
