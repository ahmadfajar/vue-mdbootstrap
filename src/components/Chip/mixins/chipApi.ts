import type { ComputedRef, Prop, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';
import {
    cssPrefix,
    useRenderSlotDefault,
    useRenderSlotWithWrapper,
    useRenderTransition
} from '../../../mixins/CommonApi';
import type { TBsButton, TBsIcon, TBsRipple, TChipOptionProps, TRecord } from '../../../types';
import Helper from '../../../utils/Helper';
import { BsRipple } from '../../Animation';
import { useCreateIconProps } from '../../Avatar/mixins/avatarApi';
import { BsButton } from '../../Button';
import { BsIcon } from '../../Icon';

export function useChipClassNames(
    props: Readonly<TChipOptionProps>,
    attrs: TRecord,
): TRecord {
    return {
        [`${cssPrefix}chip`]: true,
        [`${cssPrefix}chip-sm`]: props.size === 'sm',
        [`${cssPrefix}chip-lg`]: props.size === 'lg',
        [`${cssPrefix}chip-pill`]: props.pill,
        [`${cssPrefix}chip-clickable`]: (
            (props.href || attrs.click || attrs.onclick || attrs.onClick) && !props.disabled
        ),
        [`${cssPrefix}chip-${props.color}`]: (
            props.color && !props.outlined &&
            (!props.activeClass || props.active === false)
        ),
        [`${cssPrefix}chip-outline-${props.color}`]: (
            props.color && props.outlined &&
            (!props.activeClass || props.active === false)
        ),
        [<string>props.activeClass]: props.activeClass && (props.active === true) && !props.disabled,
        'active': (props.active === true) && !props.disabled && !props.activeClass,
        'disabled': props.disabled === true,
    }
}

function getChipAvatarSize(
    chipSize: string | undefined,
    hasPadding: boolean | undefined,
) {
    let imgSize: string;

    if (chipSize === 'sm') {
        imgSize = hasPadding ? '1.125rem' : '1.56rem';
    } else if (chipSize === 'lg') {
        imgSize = hasPadding ? '2.375rem' : '3rem';
    } else {
        imgSize = hasPadding ? '1.5rem' : '2rem';
    }

    return {
        height: imgSize,
        width: imgSize
    }
}

function createChipAvatar(props: Readonly<TChipOptionProps>): VNode {
    return h('div', {
        class: [
            `${cssPrefix}chip-avatar`,
            props.imgPadding === false ? `${cssPrefix}chip-avatar-bounded` : '',
        ]
    }, [
        h('img', {
            src: props.imgSrc,
            alt: 'Chip Avatar',
            class: [
                props.imgCircle || props.pill ? 'rounded-circle' : 'rounded'
            ],
            style: getChipAvatarSize(props.size, props.imgPadding)
        })
    ]);
}

function createCloseBtnAttr(
    props: Readonly<TChipOptionProps>,
    clickHandler: VoidFunction,
): TBsButton {
    return <TBsButton>{
        // @ts-ignore
        flat: true as Prop<boolean>,
        mode: 'icon' as Prop<string>,
        icon: 'close' as Prop<string>,
        iconSize: <Prop<number>>(
            props.size === 'sm' ? 14 : props.size === 'lg' ? 22 : 20
        ),
        size: <Prop<string | undefined>>(props.size === 'sm' ? 'xs' : 'sm'),
        color: ['light', 'light-grey'].includes(<string>props.color) ? 'dark' : props.color,
        onClick: clickHandler,
    }
}

export function useRenderChip(
    tagName: string,
    rippleDisabled: boolean,
    slots: Slots,
    attrs: TRecord,
    props: Readonly<TChipOptionProps>,
    classNames: ComputedRef<TRecord>,
    dismissHandler: VoidFunction,
): VNode {
    return h(tagName, {
        class: classNames.value,
        href: (props.href && !props.disabled) ? props.href : undefined
    }, [
        h<TBsRipple>(BsRipple, {
            // @ts-ignore
            disabled: rippleDisabled as Prop<boolean>,
            class: `${cssPrefix}chip-content`
        }, {
            default: () => [
                useRenderTransition(
                    {name: 'scale'},
                    useRenderSlotWithWrapper(
                        slots, 'icon', Helper.uuid(true),
                        {
                            class: [`${cssPrefix}chip-icon`, Helper.isEmpty(props.icon) ? `${cssPrefix}empty-icon` : ''],
                        },
                        (
                            !Helper.isEmpty(props.icon)
                                ? h<TBsIcon>(BsIcon, {
                                    ...useCreateIconProps(props),
                                    icon: <Prop<string>>(`${props.icon}_${props.iconVariant}`),
                                    size: <Prop<string | number>>(
                                        props.size === 'sm' ? 18 : (props.size === 'lg' ? 40 : 24)
                                    ),
                                })
                                : undefined
                        )
                    )
                ),
                props.imgSrc
                    ? createChipAvatar(props)
                    : createCommentVNode(' v-if-chip-avatar '),
                useRenderSlotDefault('div', slots, `${cssPrefix}chip-text`),
                props.dismissible
                    ? h<TBsButton>(BsButton, createCloseBtnAttr(props, dismissHandler))
                    : createCommentVNode(' v-if-chip-dismissible '),
            ]
        }),
    ]);
}
