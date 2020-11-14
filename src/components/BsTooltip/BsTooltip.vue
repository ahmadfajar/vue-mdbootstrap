<script>
import Vue from "vue";
import BsTooltipContent from "./BsTooltipContent";
import { firstComponentChild } from "../../utils/DomHelper";

export default {
    name: "BsTooltip",
    components: {BsTooltipContent},
    props: {
        /**
         * The tooltip content.
         * @type {string|*}
         */
        content: {
            type: String,
            default: undefined
        },
        /**
         * Put the component into disable state.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The tooltip display placement.
         * @type {string|*}
         */
        placement: {
            type: String,
            default: BsTooltipContent.props.placement.default,
            validator: v => ['top', 'bottom', 'left', 'right'].indexOf(v) > -1
        },
        /**
         * The tooltip width.
         * @type {number|string|*}
         */
        width: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * The tooltip maximum width.
         * @type {number|string|*}
         */
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
        const vNode = firstComponentChild(this.$slots.default);

        if (!vNode) {
            return vNode;
        }
        if (this.tooltipVM) {
            this.tooltipVM.$slots.default = [this.content];

            vNode.data = vNode.data || {};
            const on = vNode.data.on = vNode.data.on || {};
            const nativeOn = vNode.data.nativeOn = vNode.data.nativeOn || {};

            nativeOn.mouseenter = on.mouseenter = this._addEventListener(on.mouseenter, this._showTooltip);
            nativeOn.mouseleave = on.mouseleave = this._addEventListener(on.mouseleave, this._hideTooltip);
        }

        return vNode;
    },
    watch: {
        active(value) {
            if (this.tooltipVM) {
                this.$set(this.tooltipVM, 'open', value);
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
         * @returns {void}
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
         * @returns {void}
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
