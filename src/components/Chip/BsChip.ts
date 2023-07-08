import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, createCommentVNode, defineComponent, nextTick, ref, watch } from 'vue';
import { useRenderTransition } from '../../mixins/CommonApi';
import type { TBsChip, TChipOptionProps, TRecord } from '../../types';
import { useChipClassNames, useRenderChip } from './mixins/chipApi';
import { chipProps } from './mixins/chipProps';

export default defineComponent<TBsChip, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsChip',
    props: chipProps,
    emits: [
        /**
         * Fired when this component is dismissed (hide).
         */
        'close',
        /**
         * Fired when this component state is updated.
         */
        'update:active',
        /**
         * Fired when this component's value is updated.
         */
        'update:model-value',
    ],
    setup(props, {emit, attrs, slots}) {
        const thisProps = props as Readonly<TChipOptionProps>;
        const dismiss = ref<boolean>(false);
        const classNames = computed<TRecord>(
            () => useChipClassNames(thisProps, attrs)
        );
        const tagName = computed<string>(
            () => thisProps.href && !thisProps.disabled && thisProps.readonly ? 'a' : 'div'
        );
        const rippleDisabled = computed<boolean>(
            () => {
                return (
                    thisProps.rippleOff || thisProps.disabled || thisProps.readonly ||
                    (!attrs.click && !attrs.onclick && !attrs.onClick && !props.href)
                );
            }
        )
        const show = computed(() => !dismiss.value && props.modelValue);
        const dismissedChip = () => {
            dismiss.value = true;
            emit('update:active', false);
            emit('update:model-value', false);
            nextTick().then(() => emit('close'));
        }
        watch(
            () => thisProps.modelValue,
            (value) => {
                if (props.dismissible) {
                    dismiss.value = !(value === true);
                }
            }
        );

        return () =>
            useRenderTransition(
                {name: 'fade'},
                show.value
                    ? useRenderChip(
                        tagName.value, rippleDisabled.value, slots, attrs,
                        thisProps, classNames, dismissedChip,
                    )
                    : createCommentVNode(' BsChip ')
            )
    }
});
