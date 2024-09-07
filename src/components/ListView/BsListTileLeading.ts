import type { Prop } from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';
import { cssPrefix, useRenderSlot } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import Helper from '../../utils/Helper';
import { BsAvatar } from '../Avatar';
import { useCreateIconProps } from '../Avatar/mixins/avatarApi';
import { iconProps, imageProps } from '../Avatar/mixins/avatarProps';
import { BsIcon } from '../Icon';
import { useGetCalcSize, useSizeStyles } from '../Icon/mixins/iconApi';
import type { TBsListTileLeading, TListTileLeadingOptionProps } from './types';

export default defineComponent<TBsListTileLeading>({
    name: 'BsListTileLeading',
    props: {
        ...iconProps,
        ...imageProps,
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
                          ? h(BsIcon, {
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
