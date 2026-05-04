/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useRenderDropdownMenu } from '@/components/Menu/mixins/dropdownMenuApi.ts';
import type { TBsDropdownMenu, TDropdownMenuOptionProps } from '@/components/Menu/types';
import {
  popoverDefaultTransitionProp,
  popoverPlacementProp,
} from '@/components/Popover/mixins/popoverProps.ts';
import {
  booleanProp,
  booleanTrueProp,
  stringProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import type {
  ClosableVoidEventProps,
  ClosableVoidEventPublic,
  UpdateOpenEventProps,
  UpdateOpenEventPublic,
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
  VNode,
} from 'vue';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsDropdownMenu>({
  name: 'BsDropdownMenu',
  props: {
    cover: booleanProp,
    disabled: booleanProp,
    open: booleanProp,
    openOnHover: booleanProp,
    contentClickClose: booleanTrueProp,
    color: stringProp,
    space: validStringOrNumberProp,
    placement: popoverPlacementProp,
    transition: popoverDefaultTransitionProp,
  },
  emits: ['close', 'update:open'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TDropdownMenuOptionProps>;
    const activator = ref<Element | null>(null);
    const isActive = ref(<boolean>thisProps.open);
    const timer = ref<number>();

    watch(
      () => thisProps.open as boolean,
      (value) => {
        isActive.value = value;
      }
    );

    return () => useRenderDropdownMenu(slots, emit, thisProps, activator, isActive, timer);
  },
}) as DefineComponent<
  TBsDropdownMenu,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  DropdownMenuEventProps,
  string,
  PublicProps,
  Readonly<TDropdownMenuOptionProps> & Readonly<DropdownMenuEventPublic>,
  ExtractDefaultPropTypes<TBsDropdownMenu>,
  SlotsType<DropdownMenuSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface DropdownMenuSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place the dropdown-menu content.
   */
  content?: () => VNode[] | VNode;
}

declare type DropdownMenuEventProps = ClosableVoidEventProps & UpdateOpenEventProps;

declare interface DropdownMenuEventPublic extends ClosableVoidEventPublic, UpdateOpenEventPublic {}
