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
     */
    helpText: stringProp,
    /**
     * Show persistent help text or not.
     */
    persistentHelpText: booleanTrueProp,
    /**
     * The external validator plugin to be used to validate this field value.
     */
    validator,
    /**
     * Deprecated, use `validator` property instead.
     */
    externalValidator: validator,
}
