/**
 * @file App
 * @author leon <ludafa@outlook.com>
 */

import Form from './Form';
import schema from './schema';
import Button from 'melon/Button';
import React from 'react';
import Switcher from './Switcher';

export default () => (
    <div className="ui-app">
        <Switcher />
        <Form schema={schema}>
            <footer>
                <Button variants={['raised', 'info']}>Submit</Button>
            </footer>
        </Form>
    </div>
);
