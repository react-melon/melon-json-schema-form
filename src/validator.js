/**
 * @file 默认校验器
 * @author leon <ludafa@outlook.com>
 */

import Ajv from 'ajv';
import localize from 'ajv-i18n/localize/zh';

const validator = new Ajv({
    allErrors: true,
    v5: true,
    coerceTypes: false
});

validator.addFormat('color', /^#[0-9a-fA-F]{6}$/i);

validator.addFormat('date', {
    validate(value) {
        return /^\d\d\d\d-[01]\d-[0-3]\d$/.test(value);
    },
    compare(a, b) {

        if (a === b) {
            return 0;
        }

        if (!a && b) {
            return -1;
        }

        if (a && !b) {
            return 1;
        }

        return new Date(a) - new Date(b);
    }
});

validator.addFormat('numeric', {
    validate(value) {
        let type = typeof value;
        return (type === 'number' || type === 'string')
            && !isNaN(value - parseFloat(value));
    },
    compare(a, b) {
        return a - b;
    }
});

validator.addFormat(
    'date-time',
    /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d$/i
);

// 用于做出错排序
const KEYWORD_PRIORITY = {
    type: 1,
    format: 2,
    formatMinimum: 3,
    formatMaximum: 4
};

function shouldReplaceError(error1, error2) {
    return KEYWORD_PRIORITY[error1.keyword] - KEYWORD_PRIORITY[error2.keyword] > 0;
}

export default () => {

    let validate = null;
    let schema = null;

    return (state, props, origin) => {

        if (!validate || props.schema !== schema) {
            validate = validator.compile(props.schema);
            schema = props.schema;
        }

        let valid = validate(state.value);

        localize(validate.errors);

        return valid
            ? null
            : validate.errors.reduce((validity, error) => {

                let {
                    dataPath,
                    keyword,
                    params,
                    message
                } = error;

                if (keyword === 'required' && params.missingProperty) {
                    dataPath = `${dataPath}.${params.missingProperty}`;
                    message = '请填写此项';
                }

                if (dataPath[0] === '.') {
                    dataPath = dataPath.slice(1);
                }

                if (!validity[dataPath] || shouldReplaceError(validity[dataPath], error)) {
                    validity[dataPath] = {
                        ...error,
                        name: dataPath,
                        message
                    };
                }

                return validity;

            }, {});

    };

};
