import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    createCommentVNode,
    defineComponent,
    EmitsOptions,
    nextTick,
    ref,
    watch
} from "vue";
import {useRenderTransition} from "../../mixins/CommonApi";
import {useChipClassNames, useRenderChip} from "./mixins/chipApi";
import {chipProps} from "./mixins/chipProps";
import {TBsChip} from "./types";

export default defineComponent<TBsChip, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsChip",
    props: chipProps,
    emits: [
        /**
         * Callback fired when this component is clicked.
         */
        "click",
        /**
         * Callback fired when this component is dismissed (hide).
         */
        "close",
        /**
         * Callback fired when this component state is updated.
         */
        "update:active",
        /**
         * Callback fired when this component's value is updated.
         */
        "update:modelValue",
    ],
    setup(props, {emit, attrs, slots}) {
        const dismiss = ref<boolean>(false);
        const classNames = computed<Record<string, boolean>>(
            () => useChipClassNames(props, attrs)
        );
        const tagName = computed<string>(
            () => props.href && !props.disabled ? 'a' : 'div'
        );
        const rippleDisabled = computed<boolean>(
            () => (
                props.rippleOff || props.disabled ||
                (!attrs.click && !attrs.onclick && !attrs.onClick && !props.href)
            )
        )
        const show = computed(() => !dismiss.value && props.modelValue);
        const dismissedChip = () => {
            dismiss.value = true;
            emit("update:active", false);
            emit("update:modelValue", false);
            nextTick().then(() => emit("close"))
        }
        const clickHandler = (event: MouseEvent | TouchEvent) => {
            if (!props.disabled) {
                emit('update:active', !props.active);
            }
            nextTick().then(() => emit("click", event))
        }
        watch(
            () => props.modelValue,
            (value) => {
                if (props.dismissible) {
                    dismiss.value = !(value === true);
                }
            }
        );

        return () =>
            useRenderTransition(
                {name: "fade"},
                show.value
                    ? useRenderChip(
                        tagName.value, rippleDisabled.value, slots, attrs,
                        props, classNames, clickHandler, dismissedChip,
                    )
                    : createCommentVNode(" BsChip ", true)
            )
    }
});
