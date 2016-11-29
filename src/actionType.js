/**
 * @file action types
 * @author leon <ludafa@outlook.com>
 */

const PREFIX = 'melon-json-schema-form';

export const FOCUS = `${PREFIX}/field/focus`;
export const CHANGE = `${PREFIX}/field/change`;
export const TOUCH = `${PREFIX}/field/touch`;
export const BLUR = `${PREFIX}/field/blur`;

export const ARRAY_SWAP = `${PREFIX}/array-swap`;
export const ARRAY_PUSH = `${PREFIX}/array-push`;
export const ARRAY_POP = `${PREFIX}/array-pop`;
export const ARRAY_SHIFT = `${PREFIX}/array-shift`;
export const ARRAY_UNSHIFT = `${PREFIX}/array-unshift`;
export const ARRAY_SPLICE = `${PREFIX}/array-splice`;

export const FORM_INIT = `${PREFIX}/form-init`;
export const FORM_RESET = `${PREFIX}/form-reset`;
export const FORM_VALIDATE = `${PREFIX}/form-validate`;
export const FORM_MERGE = `${PREFIX}/form/merge`;
