<script>
import Vue from "vue";
import BsTooltipContent from "./BsTooltipContent";
import { firstComponentChild } from "../../utils/DomHelper";

export default {
    name: "BsTooltip",
    components: {BsTooltipContent},
    props: {
        content: {
            type: String,
            default: undefined
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: BsTooltipContent.props.placement.default
        },
        tooltipClass: {
            type: [String, Object, Array],
            default: undefined
        },
        width: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        maxWidth: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        }
    },
    data: () => ({
        active: false,
        timer: undefined,
        trigger: null
    }),
    created() {
        if (this.$isServer) {
            return;
        }

        const TooltipCmp = Vue.extend(BsTooltipContent);
        this.tooltipVM = new TooltipCmp({
            propsData: {
                placement: this.placement,
                maxWidth: this.maxWidth,
                width: this.width,
                open: this.active,
                trigger: this.trigger
            }
        });
    },
    beforeDestroy() {
        if (this.tooltipVM) {
            this.tooltipVM.$destroy();
            this.tooltipVM = null;
        }
    },
    mounted() {
        this.trigger = this.$el;
        if (this.tooltipVM) {
            this.tooltipVM.trigger = this.trigger;
            this.tooltipVM.$mount();
        }
    },
    render() {
        const vnode = firstComponentChild(this.$slots.default);

        if (!vnode) {
            return vnode;
        }
        if (this.tooltipVM) {
            this.tooltipVM.$slots.default = [this.content];

            vnode.data = vnode.data || {};
            const on = vnode.data.on = vnode.data.on || {};
            const nativeOn = vnode.data.nativeOn = vnode.data.nativeOn || {};

            nativeOn.mouseenter = on.mouseenter = this._addEventListener(on.mouseenter, this._showTooltip);
            nativeOn.mouseleave = on.mouseleave = this._addEventListener(on.mouseleave, this._hideTooltip);
        }

        return vnode;
    },
    watch: {
        active(value) {
            if (this.tooltipVM) {
                this.$set(this.tooltipVM, 'open', value);
                // console.log('open:', this.tooltipVM.open);
            }
        }
    },
    methods: {
        _addEventListener(old, fn) {
            if (!old) {
                return fn;
            } else if (Array.isArray(old)) {
                return old.indexOf(fn) > -1 ? old : old.concat(fn);
            } else {
                return old === fn ? old : [old, fn];
            }
        },
        /**
         * Hide tooltip.
         *
         * @return {void}
         * @private
         */
        _hideTooltip() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.active = false;
        },
        /**
         * Display tooltip.
         *
         * @return {void}
         * @private
         */
        _showTooltip() {
            if (!this.disabled) {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.active = true;
                }, 200);
            }
        }
    }
}
</script>
