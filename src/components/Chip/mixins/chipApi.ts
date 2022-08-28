import {ComputedRef, createCommentVNode, h, Prop, Slots, VNode} from "vue";
import {cssPrefix, useRenderSlotWithWrapper} from "../../../mixins/CommonApi";
import {BsRipple} from "../../Animation";
import {BsButton} from "../../Button";
import {BsIcon} from "../../Icon";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {useSimpleRenderWithSlots} from "../../Card/mixins/cardApi";
import {TChipOptionProps} from "../types";
import {TRecord} from "../../../types";
import Helper from "../../../utils/Helper";
import {TBsButton} from "../../Button/types";
import {TBsIcon} from "../../Icon/types";
import {TBsRipple} from "../../Animation/types";

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
        [`${cssPrefix}chip-${props.color}`]: props.color && !props.outlined,
        [`${cssPrefix}chip-outline-${props.color}`]: props.color && props.outlined,
        'disabled': props.disabled === true,
        'active': (props.active === true) && !props.disabled,
        [(props.activeClass as string)]: props.activeClass && (props.active === true) && !props.disabled,
    }
}

function getChipAvatarSize(chipSize: string | undefined, hasPadding: boolean | undefined) {
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

function renderChipAvatar(props: Readonly<TChipOptionProps>): VNode {
    return h("div", {
        class: [
            `${cssPrefix}chip-avatar`,
            props.imgPadding === false ? `${cssPrefix}chip-avatar-bounded` : '',
        ]
    }, [
        h("img", {
            src: props.imgSrc,
            alt: 'Chip Avatar',
            class: [
                props.imgCircle || props.pill ? 'rounded-circle' : 'rounded'
            ],
            style: getChipAvatarSize(props.size, props.imgPadding)
        })
    ]);
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
    const btnCloseAttr = {
        flat: true as Prop<boolean>,
        mode: 'icon' as Prop<string>,
        icon: 'close' as Prop<string>,
        iconSize: (
            props.size === 'sm' ? 14 : props.size === 'lg' ? 24 : 20
        ) as Prop<number>,
        size: (
            props.size === 'sm'
                ? 'xs'
                : (props.size === 'lg' ? undefined : 'sm')
        ) as Prop<string | undefined>,
        color: (props.outlined
            ? props.color
            : ['light', 'light-grey'].includes(props.color as string)
                ? 'dark' : 'light text-white') as Prop<string>,
        onClick: (): void => dismissHandler(),
    } as TBsButton;

    return h(tagName, {
        class: classNames.value,
        href: (props.href && !props.disabled) ? props.href : undefined
    }, [
        h<TBsRipple>(BsRipple, {
            disabled: rippleDisabled as Prop<boolean>,
            class: `${cssPrefix}chip-content`
        }, {
            default: () => [
                props.imgSrc
                    ? renderChipAvatar(props)
                    : useRenderSlotWithWrapper(
                        slots, 'chipIcon', Helper.uuid(), "div",
                        {class: `${cssPrefix}chip-icon`},
                        !Helper.isEmpty(props.icon)
                            ? h<TBsIcon>(BsIcon, {
                                ...useCreateIconProps(props),
                                icon: `${props.icon}_${props.iconVariant}` as Prop<string>,
                                size: (props.size === 'sm' ? 18 : (props.size === 'lg' ? 40 : 24)) as Prop<string | number>,
                            })
                            : undefined, // createCommentVNode(" v-if-chip-icon ", true),
                    ),
                useSimpleRenderWithSlots("div", slots, `${cssPrefix}chip-text`),
                props.dismissible
                    ? h<TBsButton>(BsButton, btnCloseAttr)
                    : createCommentVNode(" v-if-chip-dismissible ", true),
            ]
        }),
    ]);
}
