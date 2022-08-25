import {computed, createCommentVNode, defineComponent, h, ref, Transition, watch} from "vue";
import {booleanProp, booleanTrueProp, defaultTransitionProp, stringProp} from "../../mixins/CommonProps";
import {iconProps} from "../Avatar/mixins/avatarProps";
import {iconVariant} from "../Icon/mixins/SvgProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {useAlertColorName, useRenderAlert} from "./mixins/alertApi";
import {TAlertOptionProps} from "./types";

export default defineComponent({
    name: "BsAlert",
    props: {
        /**
         * Alert color
         * @type {string}
         */
        color: stringProp,
        /**
         * When sets, display the close button to dismiss/hide the component.
         * @type {boolean}
         */
        dismissible: booleanProp,
        /**
         * Use predefined icon style to create contextual alert.
         * @type {string}
         */
        iconVariant,
        /**
         * Deprecated, use `variant` property instead.
         * @type {string}
         */
        iconType: {
            type: String,
            default: undefined,
            validator: (value: string): boolean => ['success', 'info', 'warning', 'danger', 'help'].includes(value)
        },
        /**
         * Use predefined icon to create contextual alert.
         * @type {string}
         */
        variant: {
            type: String,
            default: undefined,
            validator: (value: string): boolean => ['success', 'info', 'warning', 'danger', 'help'].includes(value)
        },
        /**
         * Create outlined alert style.
         * @type {boolean}
         */
        outlined: booleanProp,
        /**
         * Create alert with solid fill style.
         * @type {boolean}
         */
        filled: booleanProp,
        /**
         * Deprecated, use `filled` property instead.
         * @type {boolean}
         */
        solidFill: booleanProp,
        /**
         * The component animation transition to display/hide.
         * @type {string}
         */
        transition: defaultTransitionProp,
        /**
         * The value monitored by `v-model` to display or hide the alert component.
         * @type {boolean}
         */
        modelValue: booleanTrueProp,
        ...iconProps,
    },
    emits: ['update:modelValue'],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TAlertOptionProps>;
        const dismiss = ref<boolean>(false);
        const classNames = computed<Record<string, unknown>>(() => {
            const solid = props.filled || props.solidFill;
            const colorName = useAlertColorName(cmpProps);
            return {
                'alert d-flex': true,
                'align-items-center': true,
                'alert-dismissible': props.dismissible,
                [`alert-${colorName.value}`]: colorName.value && !props.outlined && !solid,
                [`${cssPrefix}alert-outline-${colorName.value}`]: props.outlined,
                [`${cssPrefix}alert-solid-${colorName.value}`]: colorName.value && solid && !props.outlined,
            }
        });
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

        return () => {
            return h(Transition, {
                name: props.transition
            }, {
                default: () => show.value
                    ? useRenderAlert(slots, cmpProps, classNames, dismissedAlert)
                    : createCommentVNode(" v-if-alert ", true)
            });
        }
    }
});
