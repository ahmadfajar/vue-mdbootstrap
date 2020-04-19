export default {
    props: {
        disabled: Boolean,
        open: Boolean,
        openOnHover: Boolean
    },
    data: (vm) => ({
        active: vm.open,
        listIndex: -1,
        timer: undefined
    }),
    watch: {
        active(value) {
            if (!value) {
                this.listIndex = -1;
                this.$emit('close');
            }
            this.$emit('open', value);
        },
        open(value) {
            this.active = value;
        }
    },
    methods: {
        activatorClick() {
            if (!this.openOnHover) {
                if (this.active) {
                    this.hideMenu();
                } else {
                    this.showMenu();
                }
            }
        },
        onMouseEnter() {
            if (this.openOnHover && !this.disabled) {
                this.showMenu();
            }
        },
        onMouseLeave() {
            if (this.openOnHover) {
                this.hideMenu();
            }
        },
        showMenu() {
            if (!this.disabled && !this.readonly) {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.active = true;
            }
        },
        hideMenu() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.active = false;
            }, 100);
        }
    }
}
