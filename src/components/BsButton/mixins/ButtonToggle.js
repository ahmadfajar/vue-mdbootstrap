export default {
    props: {
        color: {
            type: String,
            default: 'info'
        },
        flat: {
            type: Boolean,
            default: false
        },
        iconPosition: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right'].indexOf(value) !== -1;
            }
        },
        multiple: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        raised: {
            type: Boolean,
            default: false
        },
        toggleColor: {
            type: String,
            default: 'primary'
        },
        value: [String, Number, Boolean, Array],
        items: Array,
        size: String
    }
}