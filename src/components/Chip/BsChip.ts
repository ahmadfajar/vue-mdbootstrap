/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useChipClassNames, useRenderChip } from '@/components/Chip/mixins/chipApi.ts';
import { chipProps } from '@/components/Chip/mixins/chipProps.ts';
import type { TBsChip, TChipOptionProps } from '@/components/Chip/types';
import { useRenderTransition } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type {
  ClosableVoidEventProps,
  ClosableVoidEventPublic,
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import { computed, createCommentVNode, defineComponent, nextTick, ref, watch } from 'vue';

export default defineComponent<TBsChip>({
  name: 'BsChip',
  props: chipProps,
  emits: ['close', 'update:active', 'update:model-value'],
  setup(props, { emit, attrs, slots }) {
    const thisProps = props as Readonly<TChipOptionProps>;
    const dismissed = ref<boolean>(false);
    const show = computed(() => !dismissed.value && props.modelValue);
    const classNames = computed<TRecord>(() => useChipClassNames(thisProps, attrs));
    const tagName = computed<string>(() =>
      !Helper.isEmpty(thisProps.href) && !thisProps.disabled && !thisProps.readonly ? 'a' : 'div'
    );

    const rippleDisabled = computed<boolean>(() => {
      return (
        thisProps.rippleOff ||
        thisProps.disabled ||
        thisProps.readonly ||
        (!attrs.click && !attrs.onclick && !attrs.onClick && !props.href)
      );
    });

    const dismissHandler = async () => {
      dismissed.value = true;
      emit('update:active', false);
      emit('update:model-value', false);
      await nextTick().then(() => emit('close'));
    };

    watch(
      () => thisProps.modelValue,
      (value) => {
        if (props.dismissible) {
          dismissed.value = !(value === true);
        }
      }
    );

    return () =>
      useRenderTransition(
        { name: 'fade' },
        show.value
          ? useRenderChip(
              slots,
              thisProps,
              classNames,
              tagName.value,
              rippleDisabled.value,
              dismissHandler
            )
          : createCommentVNode(' BsChip ')
      );
  },
}) as DefineComponent<
  TBsChip,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ChipEventProps,
  string,
  PublicProps,
  Readonly<TChipOptionProps> & Readonly<ChipEventPublic>,
  ExtractDefaultPropTypes<TBsChip>,
  SlotsType<ChipSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type ChipEventProps = ClosableVoidEventProps &
  UpdateModelValueEventProps<boolean> & {
    /**
     * Fired when the Chip's component state is updated.
     */
    'update:active'?: (active: boolean) => void;
  };

declare interface ChipEventPublic
  extends ClosableVoidEventPublic, UpdateModelValueEventPublic<boolean> {
  /**
   * Fired when the Chip's component state is updated.
   */
  'onUpdate:active'?: (active: boolean) => void;

  /**
   * Fired when the Chip's component state is updated.
   */
  '@update:active'?: (active: boolean) => void;
}

declare interface ChipSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place the custom icon of the Chip component.
   */
  icon?: () => VNode[] | VNode;
}
