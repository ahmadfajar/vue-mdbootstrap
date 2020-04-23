export default {
    model: {
        prop: 'active',
        event: 'input'
    },
    props: {
        active: Boolean
    },
    computed: {
        isActive() {
            return this.active;
        }
    },
    watch: {
        active(value) {
            this.$emit('input', value);
        }
    }
}
