import { computed, defineComponent, nextTick, ref } from 'vue';
import { useCheckSelected } from '../Radio/mixins/radioApi';
import { useRenderSwitch, useSwitchClasses } from './mixins/switchApi';
import { switchProps } from './mixins/switchProps';
import type { TBsSwitch, TSwitchOptionProps } from './types';

export default defineComponent<TBsSwitch>({
    name: 'BsSwitch',
    props: switchProps,
    emits: [
        /**
         * Fired when this component's state is changed.
         */
        'checked',
        /**
         * Fired when this component's checked value is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TSwitchOptionProps>;
        const rippleActive = ref<boolean>(false);
        const switchClasses = computed(() => useSwitchClasses(thisProps));
        const toggleCheckHandler = () => {
            if (!thisProps.disabled && !thisProps.readonly) {
                const checked = useCheckSelected(thisProps);
                rippleActive.value = true;

                if (Array.isArray(thisProps.modelValue)) {
                    const idx = thisProps.modelValue.indexOf(thisProps.value);
                    if (checked) {
                        thisProps.modelValue.splice(idx, 1);
                    } else {
                        thisProps.modelValue.push(thisProps.value);
                    }
                    emit('update:model-value', thisProps.modelValue);
                } else {
                    emit('update:model-value', checked ? null : thisProps.value);
                }

                nextTick().then(() => {
                    emit('checked', !checked);
                });
            }
        };

        return () => useRenderSwitch(slots, props, switchClasses, rippleActive, toggleCheckHandler);
    },
});
