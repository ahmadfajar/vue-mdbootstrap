import {ComputedRef, createCommentVNode, h, Slots, VNode} from "vue";
import {cssPrefix, useRenderSlotWithWrapper} from "../../../mixins/CommonApi";
import {BsRipple} from "../../Animation";
import {BsButton} from "../../Button";
import {BsIcon} from "../../Icon";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {useSimpleRenderWithSlots} from "../../Card/mixins/cardApi";
import {TChipOptionProps} from "../types";
import {TRecord} from "../../../types";
import Helper from "../../../utils/Helper";

export function useChipClassNames(
    props: Readonly<TChipOptionProps>,
    attrs: TRecord,
): Record<string, boolean> {
    return {
        [`${cssPrefix}chip`]: true,
        [`${cssPrefix}chip-sm`]: props.size === 'sm',
        [`${cssPrefix}chip-lg`]: props.size === 'lg',
        [`${cssPrefix}chip-pill`]: props.pill,
        // [`${cssPrefix}chip-outlined`]: props.outlined,
        [`${cssPrefix}chip-clickable`]: (
            (props.href || attrs.click || attrs.onclick || attrs.onClick) && !props.disabled
        ),
        [`${cssPrefix}chip-${props.color}`]: props.color && !props.outlined,
        [`${cssPrefix}chip-outline-${props.color}`]: props.color && props.outlined,
        'disabled': props.disabled,
        'active': props.active && !props.disabled,
        [props.activeClass]: props.activeClass && props.active && !props.disabled,
    }
}

function getChipAvatarSize(chipSize: string, hasPadding: boolean) {
    let imgSize: string;

    if (chipSize === 'sm') {
        imgSize = hasPadding ? '1.125rem' : '1.56rem';
    } else if (this.size === 'lg') {
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
                props.imgCircle || props.pill ? 'rounded-circle' : 'rounded-3'
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
    classNames: ComputedRef<Record<string, boolean>>,
    clickHandler: (event: (MouseEvent | TouchEvent)) => void,
    dismissHandler: VoidFunction,
): VNode {
    const btnCloseAttr = {
        flat: true,
        mode: 'icon',
        size: props.size === 'sm' ? 'xs' : '',
        color: props.outlined
            ? props.color
            : ['light', 'light-grey'].includes(props.color)
                ? 'grey' : 'light',
        onClick: (): void => dismissHandler(),
    }

    return h(tagName, {
        class: classNames.value,
        onMousedown: (event: MouseEvent) => clickHandler(event),
        onTouchstart: (event: TouchEvent) => clickHandler(event),
    }, [
        h(BsRipple, {
            disabled: rippleDisabled,
            class: `${cssPrefix}chip-content`
        }, {
            default: () => [
                props.imgSrc
                    ? renderChipAvatar(props)
                    : useRenderSlotWithWrapper(
                        slots, 'chipIcon', Helper.uuid(), "div",
                        {class: `${cssPrefix}chip-icon`},
                        props.icon
                            ? h(BsIcon, {
                                ...useCreateIconProps(props),
                                size: props.size === 'sm' ? 18 : (props.size === 'lg' ? 40 : 24),
                            })
                            : undefined, // createCommentVNode(" v-if-chip-icon ", true),
                    ),
                useSimpleRenderWithSlots("div", slots, `${cssPrefix}chip-text`),
                props.dismissible
                    ? h(BsButton, btnCloseAttr)
                    : createCommentVNode(" v-if-chip-dismissible ", true),
            ]
        }),
    ]);
}
