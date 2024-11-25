import { BsRipple } from '@/components/Animation';
import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi';
import { BsButton } from '@/components/Button';
import { BsIcon } from '@/components/Icon';
import { cssPrefix, useRenderSlotDefault, useRenderSlotWithWrapper } from '@/mixins/CommonApi';
import type { TBsButton, TBsIcon, TBsRipple, TChipOptionProps, TRecord } from '@/types';
import Helper from '@/utils/Helper';
import type { ComputedRef, Prop, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';

export function useChipClassNames(props: Readonly<TChipOptionProps>, attrs: TRecord): TRecord {
    return {
        [`${cssPrefix}chip`]: true,
        [`${cssPrefix}chip-sm`]: props.size === 'sm',
        [`${cssPrefix}chip-lg`]: props.size === 'lg',
        [`${cssPrefix}chip-pill`]: props.pill,
        [`${cssPrefix}chip-clickable`]:
            (props.href || attrs.click || attrs.onclick || attrs.onClick) &&
            !props.disabled &&
            !props.readonly,
        [`${cssPrefix}chip-${props.color}`]:
            props.color && !props.outlined && (!props.activeClass || props.active === false),
        [`${cssPrefix}chip-outline-${props.color}`]:
            props.color && props.outlined && (!props.activeClass || props.active === false),
        [props.activeClass as string]:
            props.activeClass && props.active === true && !props.disabled,
        active: props.active === true && !props.disabled && !props.activeClass,
        disabled: props.disabled === true,
        readonly: props.readonly === true && !props.disabled,
    };
}

function getChipAvatarSize(chipSize: string | undefined, paddingOff?: boolean) {
    let imgSize: string;

    if (chipSize === 'sm') {
        imgSize = paddingOff ? '1.56rem' : '1.125rem';
    } else if (chipSize === 'lg') {
        imgSize = paddingOff ? '3rem' : '2.375rem';
    } else {
        imgSize = paddingOff ? '2rem' : '1.5rem';
    }

    return {
        height: imgSize,
        width: imgSize,
    };
}

function createChipAvatar(props: Readonly<TChipOptionProps>): VNode {
    const paddingOff = props.imgPadding === false || props.imgPaddingOff;

    return h(
        'div',
        {
            class: [`${cssPrefix}chip-avatar`, paddingOff ? `${cssPrefix}chip-avatar-bounded` : ''],
        },
        [
            h('img', {
                src: props.imgSrc,
                alt: 'Chip Avatar',
                class: props.imgCircle || props.pill ? 'rounded-circle' : undefined,
                style: getChipAvatarSize(props.size, paddingOff),
            }),
        ]
    );
}

function createCloseBtnAttr(
    props: Readonly<TChipOptionProps>,
    clickHandler: VoidFunction
): TBsButton {
    return <TBsButton>{
        // @ts-ignore
        flat: true as Prop<boolean>,
        mode: 'icon' as Prop<string>,
        icon: 'close' as Prop<string>,
        iconSize: (props.size === 'sm' ? 14 : props.size === 'lg' ? 22 : 20) as Prop<number>,
        size: (props.size === 'sm' ? 'xs' : 'sm') as Prop<string>,
        color: ['light', 'light-grey'].includes(props.color as string) ? 'dark' : props.color,
        onClick: clickHandler,
    };
}

export function useRenderChip(
    slots: Slots,
    props: Readonly<TChipOptionProps>,
    classNames: ComputedRef<TRecord>,
    tagName: string,
    rippleDisabled: boolean,
    dismissHandler: VoidFunction
): VNode {
    return h(
        tagName,
        {
            class: classNames.value,
            href:
                !Helper.isEmpty(props.href) && !props.disabled && !props.readonly
                    ? props.href
                    : undefined,
        },
        [
            h<TBsRipple>(
                BsRipple,
                {
                    // @ts-ignore
                    disabled: rippleDisabled as Prop<boolean>,
                    class: `${cssPrefix}chip-content`,
                },
                {
                    default: () => [
                        useRenderSlotWithWrapper(
                            slots,
                            'icon',
                            !Helper.isEmpty(props.icon) ? `key-${props.icon}` : Helper.uuid(true),
                            {
                                class: [
                                    `${cssPrefix}chip-icon`,
                                    Helper.isEmpty(props.icon) && !slots.icon
                                        ? `${cssPrefix}empty-icon`
                                        : '',
                                    props.iconPosition === 'right' ? 'order-1' : '',
                                ],
                                style: {
                                    width:
                                        !props.size && !Helper.isEmpty(props.icon)
                                            ? '18px'
                                            : undefined,
                                    height:
                                        !props.size && !Helper.isEmpty(props.icon)
                                            ? '18px'
                                            : undefined,
                                },
                            },
                            !Helper.isEmpty(props.icon)
                                ? // @ts-ignore
                                  h<TBsIcon>(BsIcon, {
                                      ...useCreateIconProps(props),
                                      size: (props.size === 'sm'
                                          ? 18
                                          : props.size === 'lg'
                                            ? 40
                                            : 22) as Prop<number>,
                                  })
                                : undefined
                        ),
                        props.imgSrc
                            ? createChipAvatar(props)
                            : createCommentVNode(' v-if-chip-avatar '),
                        useRenderSlotDefault('div', slots, [
                            `${cssPrefix}chip-text`,
                            'd-flex align-items-center',
                        ]),
                        props.dismissible
                            ? h<TBsButton>(BsButton, createCloseBtnAttr(props, dismissHandler))
                            : createCommentVNode(' v-if-chip-dismissible '),
                    ],
                }
            ),
        ]
    );
}
