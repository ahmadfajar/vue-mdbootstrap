export default {
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: Boolean
    },
    data: (vm) => ({
        isActive: vm.value
    }),
    watch: {
        value(value) {
            this.isActive = value;
        },
        isActive(value) {
            value === this.value && this.$emit('input', value);
        }
    }
}