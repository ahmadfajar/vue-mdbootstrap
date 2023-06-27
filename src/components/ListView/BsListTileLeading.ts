import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';
import { cssPrefix, useRenderSlot } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TBsListTileLeading, TListTileLeadingOptionProps, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import { BsAvatar } from '../Avatar';
import { useCreateIconProps } from '../Avatar/mixins/avatarApi';
import { iconProps, imageProps } from '../Avatar/mixins/avatarProps';
import { BsIcon } from '../Icon';
import { useGetCalcSize, useSizeStyles } from '../Icon/mixins/iconApi';

export default defineComponent<TBsListTileLeading, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
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
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TListTileLeadingOptionProps>;
        const styles = computed(
            () => {
                if (cmpProps.icon && (!cmpProps.size || useGetCalcSize(cmpProps) === 48)) {
                    return {
                        height: '24px',
                        width: '24px'
                    }
                } else {
                    return useSizeStyles(cmpProps);
                }
            }
        );

        return () =>
            h('div', {
                    class: [
                        `${cssPrefix}list-tile-leading`,
                        cmpProps.center === true ? 'd-flex align-self-center' : '',
                        !Helper.isEmpty(cmpProps.icon) ? `${cssPrefix}has-icon` : '',
                    ],
                    style: styles.value,
                },
                useRenderSlot(
                    slots, 'default', {key: Helper.uuid()},
                    !Helper.isEmpty(cmpProps.imgSrc)
                        ? h(BsAvatar, {
                            imgSrc: props.imgSrc,
                            size: props.size,
                            rounded: props.rounded,
                            circle: props.circle,
                        })
                        : (
                            !Helper.isEmpty(cmpProps.icon)
                                ? h(BsIcon, {
                                    size: ((!cmpProps.size || useGetCalcSize(cmpProps) === 48) ? 24 : useGetCalcSize(cmpProps)) as Prop<string | number>,
                                    ...useCreateIconProps(cmpProps),
                                })
                                : createCommentVNode(' v-if-BsIcon ')
                        )
                )
            )
    }
});
