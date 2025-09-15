import BsButtonInner from '@/components/Button/BsButtonInner.ts';
import {
  useMakeButtonProps,
  useRenderButtonContent,
} from '@/components/Button/mixins/buttonApi.ts';
import { buttonProps } from '@/components/Button/mixins/buttonProps.ts';
import type { TBsButton, TBsButtonInner, TButtonOptionProps } from '@/components/Button/types';
import { useGenerateId } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, h, type Prop } from 'vue';

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
          h<TBsButtonInner>(
            BsButtonInner,
            {
              class: { 'empty-text': !slots.default && thisProps.dropdownToggle },
              dropdownToggle: props.dropdownToggle,
              iconMode: (thisProps.mode === 'icon') as unknown as Prop<boolean | undefined>,
              hasIcon: hasIcon.value as unknown as Prop<boolean | undefined>,
              rippleOff: rippleOff.value as unknown as Prop<boolean | undefined>,
            },
            {
              default: () => useRenderButtonContent(slots, thisProps, iconId),
            }
          ),
        ]
      );
    };
  },
});
