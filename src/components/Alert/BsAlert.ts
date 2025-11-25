import {
  useAlertClassNames,
  useAlertColor,
  useAlertIcon,
  useRenderAlert,
} from '@/components/Alert/mixins/alertApi.ts';
import { alertProps } from '@/components/Alert/mixins/alertProps.ts';
import type { TAlertOptionProps, TBsAlert } from '@/components/Alert/types';
import type { TBooleanRecord, TContextColor } from '@/types';
import { computed, defineComponent, nextTick, ref, watch } from 'vue';

export default defineComponent<TBsAlert>({
  name: 'BsAlert',
  props: alertProps,
  emits: ['close', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TAlertOptionProps>;
    const dismissed = ref<boolean>(false);
    const alertColor = computed<TContextColor>(() => useAlertColor(thisProps));
    const alertIcon = computed<string | undefined>(() => useAlertIcon(thisProps));
    const classNames = computed<TBooleanRecord>(() => useAlertClassNames(thisProps, alertColor));
    const show = computed(() => !dismissed.value && thisProps.modelValue);

    const dismissedAlert = async () => {
      dismissed.value = true;
      emit('update:model-value', false);
      await nextTick().then(() => emit('close'));
    };

    watch(
      () => thisProps.modelValue,
      (value) => {
        if (thisProps.dismissible) {
          dismissed.value = !(value === true);
        }
      }
    );

    return () =>
      useRenderAlert(slots, thisProps, show, classNames, alertColor, alertIcon, dismissedAlert);
  },
});
