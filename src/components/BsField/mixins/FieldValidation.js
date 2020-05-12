export default {
    props: {
        helpText: {
            type: String,
            default: undefined
        },
        externalValidator: {
            type: Object,
            validator: v => v.hasOwnProperty('validators') && v.hasOwnProperty('messages') && v.hasOwnProperty('hasError')
        }
    },
    data: () => ({
        wasValidated: false
    }),
    computed: {
        errorItems() {
            if (this.validators) {
                return Object.keys(this.validators).filter((name) => {
                    return this.validators[name] === false;
                });
            }

            return null;
        },
        /**
         * Check if this field has been validated and has error.
         *
         * @return {boolean} TRUE jika ada satu atau lebih element yg invalid
         */
        hasValidationError() {
            return this.externalValidator && this.externalValidator.hasError;
        },
        /**
         * Check if validation error message will be shown or not.
         *
         * @return {boolean} TRUE to show validation error message otherwise FALSE
         */
        showErrorValidation() {
            return this.externalValidator &&
                this.externalValidator.hasError &&
                this.externalValidator.validators &&
                this.externalValidator.messages;
        },
        /**
         * Check if helpText will be shown or not.
         *
         * @return {boolean} TRUE to show help text otherwise FALSE
         */
        showHelpText() {
            if (this.externalValidator && this.externalValidator.hasError && !this.wasValidated) {
                this.wasValidated = true;
            }
            if (this.helpText && (this.persistentHelpText || this.isFocused)) {
                return true;
            }
            // if (this.externalValidator && this.externalValidator.hasError && this.externalValidator.validators
            //     && this.externalValidator.messages) {
            //     return false;
            // } else if (this.helpText && (this.persistentHelpText || this.isFocused)) {
            //     return true;
            // }

            return false;
        },
        /**
         * Get external validator.
         *
         * @return {Object} The validators to be used
         */
        validators() {
            if (this.externalValidator && this.externalValidator.validators) {
                return this.externalValidator.validators;
            }

            return null;
        }
    },
    methods: {
        /**
         * Get validation message for an element.
         *
         * @param {string} fld The element name
         * @return {string} The validation message
         * @private
         */
        _validationMessage(fld) {
            if (this.externalValidator && this.externalValidator.messages) {
                return this.externalValidator.messages[fld];
            }

            return '';
        }
    }
}
