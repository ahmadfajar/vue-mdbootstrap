export default {
    props: {
        /**
         * The field component color appearance.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'default'
        },
        /**
         * The `<input>` element `value` attribute.
         * @type {string|boolean|number|Object|*}
         */
        value: {
            type: [String, Boolean, Number, Object],
            default: undefined
        },
        /**
         * The field component value monitored by `v-model` to maintain its state.
         * @type {string|boolean|number|Array|Object|*}
         */
        checked: {
            type: [String, Boolean, Number, Object, Array, Event],
            default: undefined
        },
        /**
         * Sets the `<input>` element `name` attribute.
         * @type {string|number|*}
         */
        name: {
            type: [String, Number],
            default: undefined
        },
        /**
         * Put the field component in readonly state and sets the `<input>` element `readonly` attribute.
         * @type {boolean|*}
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * Sets the `<input>` element `required` attribute.
         * @type {boolean|*}
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * Enable/disable the component and the `<input>` element.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Sets an indeterminate state for the field component.
         * @type {boolean|*}
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Sets value for truthy state of the field component.
         * @type {boolean|*}
         */
        trueValue: {
            type: Boolean,
            default: true
        },
        /**
         * Sets value for falsy state of the field component.
         * @type {boolean|*}
         */
        falseValue: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    data: () => ({
        rippleActive: false
    }),
    computed: {
        attrs() {
            const attrs = {
                id: this.id,
                name: this.name,
                disabled: this.disabled,
                required: this.required,
                readonly: this.readonly,
                'true-value': this.trueValue,
                'false-value': this.falseValue
            };

            if (this.hasValue) {
                if (this.value === null || typeof this.value !== 'object') {
                    attrs.value = (this.value === null || this.value === undefined) ? '' : String(this.value);
                }
            }

            return attrs;
        },
        isSelected() {
            if (Array.isArray(this.checked)) {
                return this.checked.includes(this.value);
            }

            if (this.hasValue) {
                return this.checked === this.value;
            }

            return this.checked === this.trueValue;
        },
        checkClassname() {
            return {
                'md-checked': this.isSelected,
                'md-disabled': this.disabled,
                'md-readonly': this.readonly,
                'md-required': this.required,
                'md-indeterminate': this.indeterminate
            }
        },
        hasValue() {
            return this.$options.propsData.hasOwnProperty('value');
        }
    },
    methods: {
        _removeItemFromModel(newModel) {
            const index = newModel.indexOf(this.value);

            if (index !== -1) {
                newModel.splice(index, 1);
            }
        },
        _handleArrayCheckbox() {
            const newModel = this.checked;

            if (!this.isSelected) {
                newModel.push(this.value);
            } else {
                this._removeItemFromModel(newModel);
            }

            this.$emit('change', newModel);
        },
        _handleSingleSelectCheckbox() {
            this.$emit('change', this.isSelected ? null : this.value);
        },
        _handleSimpleCheckbox() {
            this.$emit('change', this.isSelected ? this.falseValue : this.trueValue);
        },
        toggleCheck() {
            if (!this.disabled && !this.readonly) {
                this.rippleActive = true;

                if (Array.isArray(this.checked)) {
                    this._handleArrayCheckbox();
                } else if (this.hasValue) {
                    this._handleSingleSelectCheckbox();
                } else {
                    this._handleSimpleCheckbox();
                }
            }
        }
    }
}
