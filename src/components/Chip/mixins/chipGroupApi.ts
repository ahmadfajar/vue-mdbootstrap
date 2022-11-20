import {createCommentVNode, h, Prop, Ref, Slots, VNode} from "vue";
import {cssPrefix} from "../../../mixins/CommonApi";
import {BsButton} from "../../Button";
import {
    TBsButton,
    TBsChip,
    TChipContainer,
    TChipGroupOptionProps,
    TChipOptionItem,
    TChipValue,
    TRecord
} from "../../../types";
import BsChip from "../BsChip";
import Helper from "../../../utils/Helper";

export function useSetSliderSize(slider: TChipContainer): void {
    const contentEl = document.getElementById(slider.contentId);
    const wrapperEl = document.getElementById(slider.wrapperId);

    slider.wrapperWidth = wrapperEl?.clientWidth || 0;
    slider.contentWidth = contentEl?.clientWidth || 0;
}

export function useChipIsSelected(
    item: TChipOptionItem,
    modelValue?: TChipValue | Array<TChipValue>,
): boolean {
    if (modelValue && Array.isArray(modelValue)) {
        return modelValue.find(it => it.text === item.text) !== undefined
    } else if (modelValue) {
        return (<TChipValue>modelValue).text === item.text
    }

    return false
}

function getNewOffset(
    slider: TChipContainer,
    direction: string,
    currentScrollOffset: number,
): number {
    const newOffset = currentScrollOffset + (direction === 'prev' ? -1 : 1) * slider.wrapperWidth;

    return Math.max(
        Math.min(newOffset, (slider.contentWidth - slider.wrapperWidth)), 0
    );
}

function scrollTo(
    direction: string,
    scrollOffset: Ref<number>,
    slider: TChipContainer,
): void {
    useSetSliderSize(slider);
    scrollOffset.value = getNewOffset(slider, direction, scrollOffset.value);
}

function createSliderArrow(
    direction: string,
    canScroll: boolean,
    props: Readonly<TChipGroupOptionProps>,
    scrollOffset: Ref<number>,
    slider: TChipContainer,
): VNode {
    return h('div', {
        class: [`${cssPrefix}chip-slide-${direction}`]
    }, [
        h<TBsButton>(BsButton, {
            mode: 'icon' as Prop<string>,
            // @ts-ignore
            flat: true as Prop<boolean>,
            color: <Prop<string>>props.sliderButtonColor,
            icon: <Prop<string>>(direction === 'prev' ? 'navigate_before' : 'navigate_next'),
            iconSize: 24 as Prop<number>,
            // @ts-ignore
            disabled: <Prop<boolean>>(!canScroll),
            onClick: () => scrollTo(direction, scrollOffset, slider),
        }),
    ]);
}

function createChipAttrs(
    props: Readonly<TChipGroupOptionProps>,
    item: TChipOptionItem,
): TRecord {
    const selected = useChipIsSelected(item, props.modelValue);
    // if (!item.id) {
    //     item.id = useGenerateId();
    // }

    const attrs: TRecord = {
        ...item,
        active: selected,
        color: props.color,
        size: props.size,
        pill: props.pill,
        outlined: props.outlined,
        activeClass: props.activeClass,
        imgCircle: props.imgCircle,
        imgPadding: props.imgPadding,
    }

    delete attrs['value'];
    delete attrs['text'];

    if (props.checkedIcon && selected) {
        attrs['icon'] = 'done';
    }

    return attrs;
}

function createChipElement(
    slots: Slots,
    props: Readonly<TChipGroupOptionProps>,
    item: TChipOptionItem,
    index: number,
    clickHandler: (item: TChipOptionItem) => void,
    closeHandler: (item: TChipOptionItem) => void,
): VNode {
    const itemAttrs = createChipAttrs(props, item);

    if (Helper.isEmpty(<string>itemAttrs.icon) && slots.chipIcon) {
        return h<TBsChip>(BsChip, {
            key: `chip-${index}`,
            ...itemAttrs,
            onClick: () => clickHandler(item),
            onClose: () => closeHandler(item),
        }, {
            chipIcon: () => slots.chipIcon && slots.chipIcon(item),
            default: () => slots.chipText ? slots.chipText(item) : item.text,
        });
    } else {
        return h<TBsChip>(BsChip, {
            key: `chip-${index}`,
            ...itemAttrs,
            onClick: () => clickHandler(item),
            onClose: () => closeHandler(item),
        }, {
            default: () => slots.chipText ? slots.chipText(item) : item.text
        });
    }
}

export function useRenderChipGroup(
    slots: Slots,
    props: Readonly<TChipGroupOptionProps>,
    scrollOffset: Ref<number>,
    slider: TChipContainer,
    showSliderButton: boolean | undefined,
    hasPrev: boolean,
    hasNext: boolean,
    clickHandler: (item: TChipOptionItem) => void,
    closeHandler: (item: TChipOptionItem) => void,
): VNode {
    return h('div', {
        class: [
            `${cssPrefix}chip-group`,
            props.column ? `${cssPrefix}chip-group-column` : '',
        ]
    }, [
        (showSliderButton
                ? createSliderArrow('prev', hasPrev, props, scrollOffset, slider)
                : createCommentVNode('v-if-chip-group-arrow')
        ),
        h('div', {
            id: slider.wrapperId,
            class: [`${cssPrefix}chip-group-slider`],
        }, [
            h(
                'div', {
                    id: slider.contentId,
                    class: [`${cssPrefix}chip-group-content`],
                },
                props.items.map((item, idx) => {
                    return createChipElement(
                        slots, props, item, idx,
                        clickHandler, closeHandler,
                    );
                }),
            ),
        ]),
        (showSliderButton
                ? createSliderArrow('next', hasNext, props, scrollOffset, slider)
                : createCommentVNode('v-if-chip-group-arrow')
        ),
    ]);
}
