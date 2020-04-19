import Helper from "../utils/Helper";

export default {
    props: {
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        },
        name: [String, Number],
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        value: [String, Boolean, Number, Object, Array]
    },
    computed: {
        cmpAttrs() {
            const attrs = {
                id: this.id,
                name: this.name,
                disabled: this.disabled,
                readonly: this.readonly,
                required: this.required
            };

            if (this.hasValue) {
                if (this.value === null || !Array.isArray(this.value) || (typeof this.value !== 'object')) {
                    attrs.value = (this.value === null || this.value === undefined) ? '' : String(this.value);
                }
            }
            return attrs;
        },
        cmpAttrClasses() {
            return {
                'md-disabled': this.disabled,
                'md-readonly': this.readonly,
                'md-required': this.required
            }
        },
        hasValue() {
            return this.$options.propsData.hasOwnProperty('value') && !Helper.isEmpty(this.value);
        }
    }
}
