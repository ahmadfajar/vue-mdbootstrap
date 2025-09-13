import { BsAvatar } from '@/components/Avatar';
import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi';
import { iconBaseProps, imageBaseProps } from '@/components/Avatar/mixins/avatarProps';
import { BsIcon } from '@/components/Icon';
import { useGetCalcSize, useSizeStyles } from '@/components/Icon/mixins/iconApi';
import type { TBsListTileLeading, TListTileLeadingOptionProps } from '@/components/ListView/types';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi';
import { booleanProp } from '@/mixins/CommonProps';
import Helper from '@/utils/Helper';
import type { Prop } from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';

export default defineComponent<TBsListTileLeading>({
    name: 'BsListTileLeading',
    props: {
        ...iconBaseProps,
        ...imageBaseProps,
        /**
         * Center item inside it vertically.
         * @type {boolean}
         */
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
                    class: [
                        `${cssPrefix}list-tile-leading`,
                        thisProps.center === true ? 'd-flex align-self-center' : '',
                        !Helper.isEmpty(thisProps.icon) ? `${cssPrefix}has-icon` : '',
                    ],
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
                          ? // @ts-ignore
                            h(BsIcon, {
                                size: (!thisProps.size || useGetCalcSize(thisProps) === 48
                                    ? 24
                                    : useGetCalcSize(thisProps)) as Prop<string | number>,
                                ...useCreateIconProps(thisProps),
                            })
                          : createCommentVNode(' v-if-BsIcon ')
                )
            );
    },
});
