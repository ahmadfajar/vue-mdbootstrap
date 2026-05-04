/* eslint-disable @typescript-eslint/no-empty-object-type */
import BsButtonInner from '@/components/Button/BsButtonInner.ts';
import {
  useMakeButtonProps,
  useRenderButtonContent,
} from '@/components/Button/mixins/buttonApi.ts';
import { buttonProps } from '@/components/Button/mixins/buttonProps.ts';
import type { TBsButton, TButtonOptionProps } from '@/components/Button/types';
import { useGenerateId } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
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
import { computed, defineComponent, h } from 'vue';

export default defineComponent<TBsButton>({
  name: 'BsButton',
  props: buttonProps,
  setup(props, { slots }) {
    const thisProps = props as Readonly<TButtonOptionProps>;
    const iconId = useGenerateId();

    const hasIcon = computed<boolean>((): boolean => {
      return !Helper.isEmpty(props.icon) || slots.icon != null;
    });
    const isDisabled = computed<boolean>(
      () => thisProps.disabled === true && Helper.isEmpty(props.href)
    );
    const rippleOff = computed<boolean>(
      () => thisProps.rippleOff === true || isDisabled.value || thisProps.readonly === true
    );
    const tagName = computed<string>(() =>
      !Helper.isEmpty(thisProps.href) && !thisProps.disabled && !thisProps.readonly
        ? 'a'
        : (thisProps.type as string) === 'div'
          ? 'div'
          : 'button'
    );

    return () => {
      return h(
        tagName.value,
        {
          ...useMakeButtonProps(thisProps, isDisabled.value),
        },
        [
          h(
            BsButtonInner,
            {
              class: { 'empty-text': !slots.default && thisProps.dropdownToggle },
              dropdownToggle: thisProps.dropdownToggle,
              iconMode: thisProps.mode === 'icon',
              hasIcon: hasIcon.value,
              rippleOff: rippleOff.value,
            },
            {
              default: () => useRenderButtonContent(slots, thisProps, iconId),
            }
          ),
        ]
      );
    };
  },
}) as DefineComponent<
  TBsButton,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TButtonOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsButton>,
  SlotsType<ButtonSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface ButtonSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place the custom button icon.
   */
  icon?: () => VNode[] | VNode;
}
