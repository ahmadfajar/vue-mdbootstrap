import {booleanTrueProp, stringProp} from "../../../mixins/CommonProps";

const validator = {
    type: Object,
    validator: (v: object): boolean =>
        v.hasOwnProperty('validators') &&
        v.hasOwnProperty('messages') &&
        v.hasOwnProperty('hasError')
}

export const validationProps = {
    /**
     * The help text to display below the field component.
     * @type {string}
     */
    helpText: stringProp,
    /**
     * Show persistent help text or not.
     * @type {boolean}
     */
    persistentHelpText: booleanTrueProp,
    /**
     * The external validator plugin to be used to validate this field value.
     * @type {Object}
     */
    validator,
    /**
     * Deprecated, use `validator` property instead.
     * @type {Object}
     */
    externalValidator: validator,
}
