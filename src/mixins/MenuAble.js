export default {
    props: {
        /**
         * Disabled popup menu and prevents it from displaying.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Popup menu state, show or hide.
         * @type {boolean|*}
         */
        open: {
            type: Boolean,
            default: false
        },
        /**
         * Triggers the popup menu to display when `mouseenter` and hide when `mouseleave`.
         * @type {boolean|*}
         */
        openOnHover: {
            type: Boolean,
            default: false
        }
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
