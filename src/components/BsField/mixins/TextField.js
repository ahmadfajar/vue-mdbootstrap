import Helper from "../../../utils/Helper";

export default {
    props: {
        autofocus: Boolean,
        autocomplete: Boolean,
        flat: Boolean,
        floatingLabel: Boolean,
        value: [String, Number],
        appendIcon: [String, Array],
        prependIcon: [String, Array],
        controlCls: [String, Array],
        placeholder: String,
        clearButton: Boolean,
        persistentHelpText: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        isFocused: false,
        wasValidated: false
    }),
    computed: {
        /**
         * Get input field computed binding's attributes.
         *
         * @return {Object} Field binding's attributes
         */
        fieldAttrs() {
            return {
                'value': this.value,
                'autocomplete': this.autocomplete ? 'on' : Helper.uuid(),
                'autofocus': this.autofocus,
                'placeholder': this.placeholder,
                'aria-autocomplete': this.autocomplete ? 'both' : 'none',
                'aria-disabled': this.disabled,
                'aria-required': this.required,
                'aria-readonly': this.readonly,
                'aria-placeholder': this.placeholder
            }
        },
        /**
         * Get computed floating label's class names.
         *
         * @return {Object} Floating label css classes
         */
        floatingLabelClass() {
            return {
                'md-active': this.hasValue || this.placeholder || this.isFocused,
                'md-after-icon': this.prependIcon
            }
        },
        /**
         * Check if feature clear button is enabled or not.
         *
         * @return {boolean} TRUE if has clear button otherwise FALSE
         */
        hasClearButton() {
            return this.clearButton && !this.readonly && !this.disabled && this.hasValue;
        }
    },
    methods: {
        /**
         * Clear the input value.
         *
         * @return {void}
         */
        clearValue() {
            this.$emit('input', '');
            this.$nextTick(() => {
                this.$emit('clear');
            });
        },
        /**
         * Get input field value.
         *
         * @return {string} The input field value
         */
        getValue() {
            return this.value;
        },
        /**
         * Set field value.
         *
         * @param {string} value The value to be set
         * @return {void}
         */
        setValue(value) {
            this.$emit('input', value);
            this._nextTickChange(value);
        },
        /**
         * Fire ChangeEvent for the input field.
         *
         * @param {String|Number} value The input field value
         * @return {void}
         * @private
         */
        _nextTickChange(value) {
            this.$nextTick(() => {
                this.$emit('change', value);
            });
        },
        /**
         * Handler when input field lost focus.
         *
         * @param {FocusEvent} e The received event
         * @return {void}
         * @private
         */
        _onBlur(e) {
            this.isFocused = false;
            this.$emit('blur', e);
        },
        /**
         * Handler when input field get focus.
         *
         * @param {FocusEvent} e The received event
         * @return {void}
         * @private
         */
        _onFocus(e) {
            if (!this.$refs.input) {
                return;
            }
            if (document.activeElement !== this.$refs.input) {
                this.$refs.input.focus();
            }
            this.isFocused = true;
            this.$emit('focus', e);
        },
        /**
         * Handler when input field receive keypress.
         *
         * @param {KeyboardEvent} e The received event
         * @return {void}
         * @private
         */
        _onKeyDown(e) {
            if (!this.$refs.input) {
                return;
            }
            if (e.key && e.key.toLowerCase() === 'enter') {
                this.$emit('keydown', e);
                this._nextTickChange(this.value);
            } else {
                this.$emit('keydown', e);
            }
        },
        /**
         * Set attribute "for" for the given element.
         *
         * @param {Element} elm The DOM element
         * @return {void}
         * @private
         */
        _setLabelFor(elm) {
            if (elm && !elm.hasAttribute('for')) {
                elm.setAttribute('for', this.id);
            }
        },
        /**
         * Update label className and attributes.
         *
         * @return {void}
         * @private
         */
        _updateLabel() {
            let label;
            if (this.floatingLabel && this.$refs.floatlabel.children) {
                const children = this.$refs.floatlabel.children;
                if (children.length > 0) {
                    label = this.$refs.floatlabel.children[0];
                    if (!Helper.isEmpty(label.classList) && !Helper.isEmpty(label.className)) {
                        label.className = 'md-empty-class';
                    }
                }
                label = this.$refs.floatlabel.querySelector('label');
                this._setLabelFor(label);
            } else if (this.$el && !this.floatingLabel) {
                label = this.$el.querySelector('label');
                this._setLabelFor(label);
            }
        },
        /**
         * Update input field value and fire input events.
         *
         * @param {String|Number} value the input value
         * @return {void}
         * @private
         */
        _updateValue(value) {
            this.$emit('input', value);
            this._nextTickChange(value);
        }
    }
}
