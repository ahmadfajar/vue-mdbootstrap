import { BsPopover } from '@/components/Popover';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TBsDropdownMenu, TBsPopover, TDropdownMenuOptionProps, TEmitFn } from '@/types';
import type { ComponentPublicInstance, ExtractPropTypes, Prop, Ref, Slots, VNode } from 'vue';
import { h } from 'vue';

function hideDropdownMenu(isActive: Ref<boolean>, timer: Ref<number | undefined>, emit: TEmitFn) {
    if (timer.value) {
        window.clearTimeout(timer.value);
    }

    timer.value = window.setTimeout(() => {
        isActive.value = false;
        emit('update:open', false);
        emit('close');
    }, 100);
}

function showDropdownMenu(
    props: Readonly<TDropdownMenuOptionProps>,
    isActive: Ref<boolean>,
    timer: Ref<number | undefined>,
    emit: TEmitFn
) {
    if (!props.disabled) {
        if (timer.value) {
            window.clearTimeout(timer.value);
        }

        isActive.value = true;
        emit('update:open', true);
    }
}

export function useRenderDropdownMenu(
    props: Readonly<ExtractPropTypes<TBsDropdownMenu>>,
    slots: Slots,
    emit: TEmitFn,
    activator: Ref<Element | null>,
    popupMenu: Ref<ComponentPublicInstance | null>,
    timer: Ref<number | undefined>,
    isActive: Ref<boolean>
): VNode {
    const thisProps = props as Readonly<TDropdownMenuOptionProps>;
    const thisOnMouseEnter = () => {
        if (thisProps.openOnHover) {
            showDropdownMenu(thisProps, isActive, timer, emit);
        }
    };
    const thisOnMouseLeave = () => {
        if (thisProps.openOnHover) {
            hideDropdownMenu(isActive, timer, emit);
        }
    };

    return h(
        'div',
        {
            class: [`${cssPrefix}dropdown-menu`],
        },
        [
            h(
                'div',
                {
                    ref: activator,
                    class: [`${cssPrefix}dropdown-menu-activator`],
                    onClick: () => {
                        if (!thisProps.openOnHover) {
                            isActive.value
                                ? hideDropdownMenu(isActive, timer, emit)
                                : showDropdownMenu(thisProps, isActive, timer, emit);
                        }
                    },
                    onMouseenter: thisOnMouseEnter,
                    onMouseleave: thisOnMouseLeave,
                },
                slots.default && slots.default()
            ),
            h<TBsPopover>(
                BsPopover,
                {
                    ref: popupMenu,
                    class: [`${cssPrefix}popover-dropdown-menu`, `${cssPrefix}shadow-1`],
                    color: props.color,
                    cover: props.cover,
                    // @ts-ignore
                    open: isActive.value as Prop<boolean>,
                    placement: props.placement,
                    space: props.space,
                    transition: props.transition,
                    trigger: activator.value as Prop<HTMLElement>,
                    onClick: () => {
                        if (thisProps.contentClickClose) {
                            hideDropdownMenu(isActive, timer, emit);
                        }
                    },
                    onMouseenter: thisOnMouseEnter,
                    onMouseleave: thisOnMouseLeave,
                    'onUpdate:open': (value: boolean) => {
                        isActive.value = value;
                        emit('update:open', value);
                    },
                },
                {
                    default: () => slots.content && slots.content(),
                }
            ),
        ]
    );
}
