import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions, Prop} from "vue";
import {
    computed,
    createCommentVNode,
    defineComponent,
    Fragment,
    getCurrentInstance,
    h,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    Teleport,
    toDisplayString,
    watch,
    withDirectives
} from "vue";
import {booleanProp, stringOrNumberProp, stringProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import {cssPrefix, useRenderTransition} from "../../mixins/CommonApi";
import {useAddTooltipListener, useRemoveTooltipListener, useSetTooltipPosition} from "./mixins/tooltipApi";
import type {TBsTooltip, TPositionType, TRecord, TTooltipOptionProps} from "../../types";
import resize from "../../directives/Resize";
import scroll from "../../directives/Scroll";
import Helper from "../../utils/Helper";

export default defineComponent<TBsTooltip, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsTooltip",
    props: {
        content: stringProp,
        disabled: booleanProp,
        show: booleanProp,
        placement: {
            type: String,
            default: "bottom",
            validator: (v: string) => ["top", "bottom", "left", "right"].includes(v)
        } as Prop<TPositionType>,
        width: stringOrNumberProp,
        maxWidth: validStringOrNumberProp,
        zIndex: {
            type: [String, Number],
            default: 2000,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        }
    },
    emits: [
        /**
         * Fired when this Tooltip state is updated.
         */
        "update:show",
    ],
    setup(props, {slots}) {
        const thisProps = props as Readonly<TTooltipOptionProps>;
        const tooltip = ref<Element | null>(null);
        const active = ref<boolean>(false);
        const isActive = computed(() => active.value || thisProps.show);
        const setPosition = () => {
            nextTick().then(() => useSetTooltipPosition(tooltip, instance, thisProps.placement, isActive.value));
        }
        const transitionName = computed(() => `${cssPrefix}tooltip-${thisProps.placement}`);
        const classNames = computed(() => [`${cssPrefix}tooltip`, transitionName.value]);
        const styles = computed(() => ({
            "width": thisProps.width === "auto" ? undefined : Helper.cssUnit(thisProps.width),
            "max-width": Helper.cssUnit(thisProps.maxWidth),
            "z-index": thisProps.zIndex
        }));
        let instance: ComponentInternalInstance | null;

        watch(
            () => isActive.value,
            (value) => {
                nextTick().then(() => useSetTooltipPosition(tooltip, instance, thisProps.placement, value));
            }
        )
        onMounted(() => {
            instance = getCurrentInstance();
            useAddTooltipListener(instance, active);
            useSetTooltipPosition(tooltip, instance, thisProps.placement, isActive.value);
        });
        onBeforeUnmount(() => useRemoveTooltipListener(instance));

        return () =>
            h(Fragment, null, [
                h(Teleport,
                    {to: "body"},
                    useRenderTransition({name: transitionName.value}, [
                        isActive.value
                            ? withDirectives(
                                h("div", {
                                    class: classNames.value,
                                    style: styles.value,
                                    ref: tooltip,
                                    role: "tooltip"
                                }, [
                                    h("div", {class: "tooltip-arrow"}),
                                    h("div", {class: `${cssPrefix}tooltip-inner`}, toDisplayString(thisProps.content)),
                                ]), [
                                    [resize, setPosition], [scroll, setPosition]
                                ]
                            ) : createCommentVNode(" BsTooltip ", true),
                    ])
                ),
                slots.default && slots.default(),
            ]);
    }
});
