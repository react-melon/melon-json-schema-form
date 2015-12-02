/**
 * @file Basic View
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const {connect} = require('ei');
const Editor = require('react-wysiwyg-editor');
const BasicView = React.createClass({

    getInitialState() {
        return {
            value: ''
        };
    },

    render() {

        // Customize your editor with css rules
        var editorStyle = {
            overflow: 'auto',
            width: 300,
            height: 100,
            maxHeight: 100
        };

        return (
            <div className="form-group">
                <label>Comment:</label>
                <Editor
                    style={editorStyle}
                    content={this.state.value}
                    onChange={({target}) => {
                        this.setState({
                            value: target.value
                        });
                    }} />
            </div>
        );

    }

});


module.exports = connect(
    BasicView,
    true
);
