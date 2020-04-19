export default {
    props: {
        size: {
            type: [String, Number],
            validator: v => !isNaN(parseInt(v, 10))
        },
        height: {
            type: [String, Number],
            default: 20,
            validator: v => !isNaN(parseInt(v, 10))
        },
        width: {
            type: [String, Number],
            default: 20,
            validator: v => !isNaN(parseInt(v, 10))
        }
    },
    computed: {
        szHeight() {
            return this.size && this.size > 0 ? this.size : this.height;
        },
        szWidth() {
            return this.size && this.size > 0 ? this.size : this.width;
        }
    }
}
