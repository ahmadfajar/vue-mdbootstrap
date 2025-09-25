import { BsAvatar } from '@/components/Avatar';
import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi.ts';
import { iconBaseProps, imageBaseProps } from '@/components/Avatar/mixins/avatarProps.ts';
import { BsIcon } from '@/components/Icon';
import { useGetCalcSize, useSizeStyles } from '@/components/Icon/mixins/iconApi.ts';
import type { TBsListTileLeading, TListTileLeadingOptionProps } from '@/components/ListView/types';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { Numberish } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { Prop } from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';

export default defineComponent<TBsListTileLeading>({
  name: 'BsListTileLeading',
  props: {
    ...iconBaseProps,
    ...imageBaseProps,
    center: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TListTileLeadingOptionProps>;
    const styles = computed(() => {
      if (thisProps.icon && (!thisProps.size || useGetCalcSize(thisProps) === 48)) {
        return {
          height: '24px',
          width: '24px',
        };
      } else {
        return useSizeStyles(thisProps);
      }
    });

    return () =>
      h(
        'div',
        {
          class: {
            [`${cssPrefix}list-tile-leading`]: true,
            'flex self-center': thisProps.center === true,
            'has-icon': !Helper.isEmpty(thisProps.icon),
          },
          style: styles.value,
        },
        useRenderSlot(
          slots,
          'default',
          { key: Helper.uuid(true) },
          !Helper.isEmpty(thisProps.imgSrc)
            ? h(BsAvatar, {
                imgSrc: props.imgSrc,
                size: props.size,
                rounded: props.rounded,
                circle: props.circle,
              })
            : !Helper.isEmpty(thisProps.icon)
              ? h(BsIcon, {
                  size: (!thisProps.size || useGetCalcSize(thisProps) === 48
                    ? 24
                    : useGetCalcSize(thisProps)) as Prop<Numberish>,
                  ...useCreateIconProps(thisProps),
                })
              : createCommentVNode(' v-if-BsIcon ')
        )
      );
  },
});
