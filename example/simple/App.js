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

export default () => (
    <div className="ui-app">
        <Form schema={schema} uiSchema={uiSchema}>
            <footer>
                <Button variants={['raised', 'info']}>Submit</Button>
            </footer>
        </Form>
        <ValuePanel />
    </div>
);
