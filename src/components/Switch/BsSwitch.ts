/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useToggleChecked } from '@/components/Checkbox/mixins/checkboxApi.ts';
import { useRenderSwitch, useSwitchClasses } from '@/components/Switch/mixins/switchApi.ts';
import { switchProps } from '@/components/Switch/mixins/switchProps.ts';
import type { TBsSwitch, TSwitchOptionProps } from '@/components/Switch/types';
import type { Numberish, TRecord } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
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
  {},
  {},
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
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type SwitchEventProps = UpdateModelValueEventProps<Numberish | boolean> & {
  /**
   * Fired when this Switch component's checked state is changed.
   */
  checked?: (checked: boolean) => void;
};

declare interface SwitchEventPublic extends UpdateModelValueEventPublic<Numberish | boolean> {
  /**
   * Fired when this Switch component's checked state is changed.
   */
  onChecked?: (checked: boolean) => void;

  /**
   * Fired when this Switch component's checked state is changed.
   */
  '@checked'?: (checked: boolean) => void;
}
