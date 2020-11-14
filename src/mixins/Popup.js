import PopupManager from "../utils/PopupManager";

let zIndex             = 2000;
export const getZIndex = () => zIndex++;

export default {
    props: {
        open: Boolean,
        appendBody: {
            type: Boolean,
            default: true
        },
        escClose: {
            type: Boolean,
            default: true
        },
        overlay: {
            type: Boolean,
            default: true
        },
        overlayClose: {
            type: Boolean,
            default: true
        },
        overlayColor: {
            type: String,
            default: '#000'
        },
        overlayOpacity: {
            type: Number,
            default: 0.4
        }
    },
    data: () => ({
        appended: false,
        overlayZIndex: getZIndex(),
        zIndex: getZIndex()
    }),
    watch: {
        open(value) {
            if (value) {
                this.setZIndex();
                PopupManager.open(this);
                this.appendElToBody();
            } else {
                PopupManager.close(this);
            }
        }
    },
    mounted() {
        if (this.open) {
            PopupManager.open(this);
            this.appendElToBody();
        }
    },
    beforeDestroy() {
        PopupManager.close(this);
        if (this.appendBody) {
            const popupEl = this.popupEl();
            if (!popupEl) {
                return;
            }
            if (popupEl.parentNode) {
                popupEl.parentNode.removeChild(popupEl);
            }
        }
    },
    methods: {
        appendElToBody() {
            if (!this.$el || !this.appendBody || this.appended) {
                return;
            }

            this.$nextTick(() => {
                document.body.appendChild(this.$el);
                this.appended = true;
            });
        },
        escPress() {
            if (!this.escClose) {
                return;
            }

            this.$emit('update:open', false);
            this.$emit('close', 'ESC Pressed');
        },
        overlayClick() {
            if (!this.overlay || !this.overlayClose || !this.open) {
                return;
            }
            this.$emit('update:open', false);
            this.$emit('close', 'Overlay clicked');
        },
        popupEl() {
            return this.$el;
        },
        setZIndex() {
            if (!this.zIndex) {
                this.zIndex = getZIndex();
            }
            if (!this.overlayZIndex) {
                this.overlayZIndex = getZIndex();
            }
        },
    }
}
