import Helper from "../../../utils/Helper";

export default {
    props: {
        autofocus: {
            type: Boolean,
            default: false
        },
        autocomplete: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: false
        },
        floatingLabel: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number],
            default: undefined
        },
        appendIcon: {
            type: [String, Array],
            default: undefined
        },
        prependIcon: {
            type: [String, Array],
            default: undefined
        },
        controlCls: {
            type: [String, Array],
            default: undefined
        },
        placeholder: {
            type: String,
            default: undefined
        },
        clearButton: {
            type: Boolean,
            default: false
        },
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
         * @return {any} Field binding's attributes
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
         * @return {any} Floating label css classes
         */
        floatingLabelClass() {
            return {
                'md-active': this.hasValue || this.placeholder || this.isFocused,
                'md-focused': this.isFocused,
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
            this._updateLegend();
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
            this._updateLegend();
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
        _updateLegend(value) {
            if (this.outlined && this.$refs.legend) {
                let label = this.floatingLabel
                    ? this.$refs.floatlabel
                    : this.$el.querySelector('label');
                let hasWidth = this.floatingLabel && (this.hasValue || this.isFocused || this.placeholder || value);

                if (hasWidth && label) {
                    this.$refs.legend.style.width = Helper.sizeUnit(label.clientWidth);
                } else {
                    this.$refs.legend.style.width = Helper.sizeUnit(0);
                }
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
