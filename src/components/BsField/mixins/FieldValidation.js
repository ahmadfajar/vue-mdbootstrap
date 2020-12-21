export default {
    props: {
        /**
         * The help text to display below the field component.
         * @type {string|*}
         */
        helpText: {
            type: String,
            default: undefined
        },
        /**
         * The external validator plugin to be used to validate the field value.
         * @type {Object|*}
         */
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
         * Check if this field has been validated by external validator or not.
         *
         * @returns {boolean} TRUE has validated otherwise FALSE
         */
        hasValidated() {
            if (this.externalValidator && (typeof this.externalValidator.dirty !== 'undefined')) {
                return this.externalValidator.dirty;
            }

            return this.wasValidated;
        },
        /**
         * Check if this field has been validated and has error.
         *
         * @returns {boolean} TRUE jika ada satu atau lebih element yg invalid
         */
        hasValidationError() {
            return this.externalValidator && this.externalValidator.hasError;
        },
        /**
         * Check if validation error message will be shown or not.
         *
         * @returns {boolean} TRUE to show validation error message otherwise FALSE
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
         * @returns {boolean} TRUE to show help text otherwise FALSE
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
         * @returns {Object} The validators to be used
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
         * @returns {string} The validation message
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
