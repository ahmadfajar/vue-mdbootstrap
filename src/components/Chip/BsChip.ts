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
import {TBsChip, TChipOptionProps} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsChip, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsChip",
    props: chipProps,
    emits: [
        /**
         * Fired when this component is dismissed (hide).
         */
        "close",
        /**
         * Fired when this component state is updated.
         */
        "update:active",
        /**
         * Fired when this component's value is updated.
         */
        "update:modelValue",
    ],
    setup(props, {emit, attrs, slots}) {
        const cmpProps = props as Readonly<TChipOptionProps>;
        const dismiss = ref<boolean>(false);
        const classNames = computed<TRecord>(
            () => useChipClassNames(cmpProps, attrs)
        );
        const tagName = computed<string>(
            () => cmpProps.href && !cmpProps.disabled ? 'a' : 'div'
        );
        const rippleDisabled = computed<boolean>(
            () => {
                return (
                    cmpProps.rippleOff || cmpProps.disabled ||
                    (!attrs.click && !attrs.onclick && !attrs.onClick && !props.href)
                );
            }
        )
        const show = computed(() => !dismiss.value && props.modelValue);
        const dismissedChip = () => {
            dismiss.value = true;
            emit("update:active", false);
            emit("update:modelValue", false);
            nextTick().then(() => emit("close"))
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
                        cmpProps, classNames, dismissedChip,
                    )
                    : createCommentVNode(" BsChip ", true)
            )
    }
});