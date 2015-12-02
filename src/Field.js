/**
 * @file Field
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const main = require('./factory');

const Field = React.createClass({

    render() {

        const {schema, value, name} = this.props;
        const {type} = schema;
        const AcutualComponent = main.getComponent(type);

        return (
            <AcutualComponent
                name={name}
                schema={schema}
                value={value} />
        );

    }

});

const {PropTypes} = React;

Field.propTypes = {
    schema: PropTypes.object.isRequired,
    pointer: PropTypes.string.isRequired
};

Field.defaultProps = {
    pointer: ''
};

module.exports = Field;
