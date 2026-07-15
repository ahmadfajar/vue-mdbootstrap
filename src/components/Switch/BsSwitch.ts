import { useToggleChecked } from '@/components/Checkbox/mixins/checkboxApi.ts';
import { useRenderSwitch, useSwitchClasses } from '@/components/Switch/mixins/switchApi.ts';
import { switchProps } from '@/components/Switch/mixins/switchProps.ts';
import type {
  SwitchEventProps,
  SwitchEventPublic,
  TBsSwitch,
  TSwitchOptionProps,
} from '@/components/Switch/types';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsSwitch>({
  name: 'BsSwitch',
  props: switchProps,
  emits: ['checked', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TSwitchOptionProps>;
    const rippleActive = ref<boolean>(false);
    const switchClasses = computed(() => useSwitchClasses(thisProps));

    const toggleCheckHandler = () => useToggleChecked(emit, thisProps, rippleActive);

    return () => useRenderSwitch(slots, thisProps, switchClasses, rippleActive, toggleCheckHandler);
  },
}) as DefineComponent<
  TBsSwitch,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  SwitchEventProps,
  string,
  PublicProps,
  Readonly<TSwitchOptionProps> & Readonly<SwitchEventPublic>,
  ExtractDefaultPropTypes<TBsSwitch>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
