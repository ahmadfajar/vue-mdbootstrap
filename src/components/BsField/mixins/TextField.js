import Helper from "../../../utils/Helper";

export default {
    props: {
        /**
         * Sets browsers autocomplete predictions on/off.
         * @type {string|boolean|*}
         */
        autocomplete: {
            type: [String, Boolean],
            default: false
        },
        /**
         * Autofocus field when document is loaded.
         * @type {boolean|*}
         */
        autofocus: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with **flat** appearance, and removes the borders.
         * The component appearance will be styled like plain text.
         * @type {boolean|*}
         */
        flat: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with **filled** appearance.
         * See [Google Material Design](https://material.io/components/text-fields) spec.
         * @type {boolean|*}
         */
        filled: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with floating field label.
         * See [Google Material Design](https://material.io/components/text-fields) spec.
         * @type {boolean|*}
         */
        floatingLabel: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with **outlined** appearance.
         * See [Google Material Design](https://material.io/components/text-fields) spec.
         * @type {boolean|*}
         */
        outlined: {
            type: Boolean,
            default: false
        },
        /**
         * Sets auto show the clear button.
         * @type {boolean|*}
         */
        clearButton: {
            type: Boolean,
            default: false
        },
        /**
         * Keeps help text visible when the component is not focused.
         * @type {boolean|*}
         */
        persistentHelpText: {
            type: Boolean,
            default: true
        },
        /**
         * The value monitored by `v-model` to maintain field value.
         * @type {string|number|*}
         */
        value: {
            type: [String, Number],
            default: undefined
        },
        /**
         * Sets icon to display on inner right side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        appendIcon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets icon to display on outer right side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        appendIconOuter: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets icon to display on inner left side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        prependIcon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets icon to display on outer left side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        prependIconOuter: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets the field placeholder.
         * @type {string|*}
         */
        placeholder: {
            type: String,
            default: undefined
        }
    },
    data: (vm) => ({
        isFocused: false,
        localValue: vm.value,
        wasValidated: false,
    }),
    computed: {
        /**
         * Get input field computed binding's attributes.
         *
         * @returns {Object|*} Field binding's attributes
         */
        fieldAttrs() {
            return {
                'value': this.localValue,
                'autocomplete': this.autocomplete && Helper.isString(this.autocomplete)
                    ? this.autocomplete
                    : (this.autocomplete ? 'on' : Helper.uuid()),
                'autofocus': this.autofocus,
                'placeholder': this.placeholder && !this.readonly && !this.disabled ? this.placeholder : null,
                'aria-disabled': this.disabled,
                'aria-required': this.required,
                'aria-readonly': this.readonly,
                'aria-placeholder': this.placeholder && !this.readonly && !this.disabled ? this.placeholder : null
            }
        },
        /**
         * Get computed floating label's class names.
         *
         * @returns {Object|*} Floating label css classes
         */
        floatingLabelClass() {
            return {
                'md-active': this.hasValue || this.placeholder || this.isFocused,
                'md-focused': this.isFocused,
            }
        },
        /**
         * Check if feature clear button is enabled or not.
         *
         * @returns {boolean} TRUE if has clear button otherwise FALSE
         */
        hasClearButton() {
            return this.clearButton && this.hasValue && !this.readonly && !this.disabled;
        },
        /**
         * Check whether input field has value or not.
         *
         * @returns {boolean} `TRUE` if input field has value otherwise `FALSE`
         * @private
         */
        hasValue() {
            return !Helper.isEmpty(this.localValue);
        }
    },
    methods: {
        /**
         * Clear the input value.
         *
         * @returns {void}
         */
        clearValue() {
            this.localValue = null;
            this.$emit('input', '');
            this.$nextTick(() => {
                this.$emit('clear');
                this._updateLegend();
                // this._setFloatingLabelPosition();
            });
        },
        /**
         * Get input field value.
         *
         * @returns {string} The input field value
         */
        getValue() {
            return this.localValue;
        },
        /**
         * Set field value.
         *
         * @param {string} value The value to be set
         * @returns {void}
         */
        setValue(value) {
            this.localValue = value;
            this.$emit('input', value);
            this._nextTickChange(value);
        },
        /**
         * Fire ChangeEvent for the input field.
         *
         * @param {string|number} value The input field value
         * @returns {void}
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
         * @returns {void}
         * @private
         */
        _onBlur(e) {
            this.isFocused = false;
            this.$emit('blur', e);
            this._nextTickChange(this.localValue);
            this._updateLegend();
            // this._setFloatingLabelPosition();
        },
        /**
         * Handler when input field get focus.
         *
         * @param {FocusEvent} e The received event
         * @returns {void}
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
            this._updateLegend();
            // this._setFloatingLabelPosition();
        },
        /**
         * Handler when input field receive keypress.
         *
         * @param {KeyboardEvent} e The received event
         * @returns {void}
         * @private
         */
        _onKeyDown(e) {
            if (!this.$refs.input) {
                return;
            }
            if (e.key && e.key === 'Enter') {
                this.localValue = this.$refs.input.value;
                this.$emit('keydown', e);
                this._nextTickChange(this.localValue);
            } else {
                this.$emit('keydown', e);
            }
        },
        /**
         * Set attribute "for" for the given element.
         *
         * @param {Element} elm The DOM element
         * @returns {void}
         * @private
         */
        _setLabelFor(elm) {
            if (elm && !elm.hasAttribute('for')) {
                elm.setAttribute('for', this.id);
            }
        },
        /**
         * Adjust floating label position at the left side.
         *
         * @returns {void}
         * @private
         */
        _setFloatingLabelPosition() {
            if (this.prependIcon && this.floatingLabel && this.$refs.floatLabel) {
                if (this.hasValue || this.isFocused || this.placeholder) {
                    this.$refs.floatLabel.style.left = '-32px';
                } else {
                    this.$refs.floatLabel.style.left = null;
                }
            }
        },
        /**
         * Update label className and attributes.
         *
         * @returns {void}
         * @private
         */
        _updateLabel() {
            let label;
            if (this.floatingLabel && this.$refs.floatLabel.children) {
                const children = this.$refs.floatLabel.children;
                if (children.length > 0) {
                    label = this.$refs.floatLabel.children[0];
                    if (!Helper.isEmpty(label.classList) && !Helper.isEmpty(label.className)) {
                        label.className = 'md-empty-class';
                    }
                }
                label = this.$refs.floatLabel.querySelector('label');
                this._setLabelFor(label);
            } else if (this.$el && !this.floatingLabel) {
                label = this.$el.querySelector('label');
                this._setLabelFor(label);
            }
        },
        /**
         * Update fieldset legend style width.
         *
         * @param {string|number} [value] The input value
         * @returns {void}
         * @private
         */
        _updateLegend(value) {
            if (this.outlined && this.$refs.legend) {
                const label = this.floatingLabel
                    ? this.$refs.floatLabel
                    : this.$el.querySelector('label');
                const hasWidth = this.floatingLabel && (this.hasValue || this.isFocused || this.placeholder || value);

                if (hasWidth && label) {
                    const width = label.clientWidth < 80 ? label.clientWidth : label.clientWidth - 8;
                    this.$refs.legend.style.width = Helper.sizeUnit(width);
                } else {
                    this.$refs.legend.style.width = Helper.sizeUnit(0);
                }
            }
        },
        /**
         * Update input field value and fire input events.
         *
         * @param {string|number} value the input value
         * @returns {void}
         * @private
         */
        _updateValue(value) {
            this.localValue = value;
            this.$emit('input', value);
        }
    }
}
