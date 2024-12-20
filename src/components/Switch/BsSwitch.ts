import { useToggleChecked } from '@/components/Checkbox/mixins/checkboxApi.ts';
import { useRenderSwitch, useSwitchClasses } from '@/components/Switch/mixins/switchApi.ts';
import { switchProps } from '@/components/Switch/mixins/switchProps.ts';
import type { TBsSwitch, TSwitchOptionProps } from '@/components/Switch/types';
import { computed, defineComponent, ref } from 'vue';

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

        const toggleCheckHandler = () => useToggleChecked(thisProps, emit, rippleActive);

        return () => useRenderSwitch(slots, props, switchClasses, rippleActive, toggleCheckHandler);
    },
});
