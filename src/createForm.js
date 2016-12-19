/**
 * @file create form
 * @author leon <ludafa@outlook.com>
 */

import {createForm} from 'melon-form';
import createGetActions from './util/createGetActions';
import validator from './validator';

export default function (options) {

    const {
        model,
        upload,
        getActions
    } = options;

    return createForm({
        model,
        validate: validator(),
        getActions: createGetActions(getActions, upload)
    });

}
