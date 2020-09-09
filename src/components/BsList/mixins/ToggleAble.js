export default {
    model: {
        prop: 'active',
        event: 'input'
    },
    props: {
        active: Boolean
    },
    data: (vm) => ({
        itemActive: vm.active,
    }),
    computed: {
        isActive() {
            return this.active || this.itemActive;
        }
    }
}
