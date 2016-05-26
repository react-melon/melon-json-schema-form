/**
 * @file Field
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Component} from 'react';
import * as factory from './factory';

export default class Field extends Component {

    render() {

        const schema = this.props.schema;
        const type = schema.type;
        const AcutualComponent = factory.getComponent(type);

        return (
            <AcutualComponent {...this.props} />
        );

    }

}

Field.propTypes = {
    schema: PropTypes.object.isRequired,
    pointer: PropTypes.string.isRequired
};

Field.defaultProps = {
    pointer: ''
};
