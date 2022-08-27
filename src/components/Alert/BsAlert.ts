import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    createCommentVNode,
    defineComponent,
    EmitsOptions,
    ref,
    watch
} from "vue";
import {useRenderTransition} from "../../mixins/CommonApi";
import {useAlertClassNames, useAlertColorName, useAlertIconName, useRenderAlert} from "./mixins/alertApi";
import {alertProps} from "./mixins/alertProps";
import {TBsAlert} from "./types";

export default defineComponent<TBsAlert, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsAlert",
    props: alertProps,
    emits: [
        /**
         * Callback fired when this component's value is updated.
         */
        'update:modelValue'
    ],
    setup(props, {emit, slots}) {
        const dismiss = ref<boolean>(false);
        const colorName = computed<string | undefined>(
            () => useAlertColorName(props)
        );
        const alertIconName = computed<string | undefined>(
            () => useAlertIconName(props)
        );
        const classNames = computed<Record<string, boolean>>(
            () => useAlertClassNames(props, colorName)
        );
        const show = computed(() => !dismiss.value && props.modelValue);
        const dismissedAlert = () => {
            dismiss.value = true;
            emit("update:modelValue", false);
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
                {name: props.transition},
                show.value
                    ? useRenderAlert(slots, props, classNames, alertIconName, dismissedAlert)
                    : createCommentVNode(" BsAlert ", true)
            )
    }
});
