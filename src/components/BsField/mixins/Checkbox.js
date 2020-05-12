export default {
    props: {
        color: {
            type: String,
            default: 'default'
        },
        value: {
            type: [String, Boolean, Number, Object],
            default: undefined
        },
        checked: {
            type: [String, Boolean, Number, Object, Array, Event],
            default: undefined
        },
        name: {
            type: [String, Number],
            default: undefined
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
        trueValue: {
            type: Boolean,
            default: true
        },
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
                'md-required': this.required,
                'md-indeterminate': this.indeterminate
            }
        },
        hasValue() {
            return this.$options.propsData.hasOwnProperty('value');
        }
    },
    methods: {
        removeItemFromModel(newModel) {
            const index = newModel.indexOf(this.value);

            if (index !== -1) {
                newModel.splice(index, 1);
            }
        },
        handleArrayCheckbox() {
            const newModel = this.checked;

            if (!this.isSelected) {
                newModel.push(this.value);
            } else {
                this.removeItemFromModel(newModel);
            }

            this.$emit('change', newModel);
        },
        handleSingleSelectCheckbox() {
            this.$emit('change', this.isSelected ? null : this.value);
        },
        handleSimpleCheckbox() {
            this.$emit('change', this.isSelected ? this.falseValue : this.trueValue);
        },
        toggleCheck() {
            if (!this.disabled) {
                this.rippleActive = true;

                if (Array.isArray(this.checked)) {
                    this.handleArrayCheckbox();
                } else if (this.hasValue) {
                    this.handleSingleSelectCheckbox();
                } else {
                    this.handleSimpleCheckbox();
                }
            }
        }
    }
}
