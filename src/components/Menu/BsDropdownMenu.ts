import type { ComponentPublicInstance } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import {
    booleanProp,
    booleanTrueProp,
    validStringOrNumberProp,
    whiteColorProp,
} from '../../mixins/CommonProps';
import { popoverDefaultTransitionProp, popoverPlacementProp } from '../Popover/mixins/popoverProps';
import { useRenderDropdownMenu } from './mixins/dropdownMenuApi';
import type { TBsDropdownMenu, TDropdownMenuOptionProps } from './types';

export default defineComponent<TBsDropdownMenu>({
    name: 'BsDropdownMenu',
    props: {
        cover: booleanProp,
        disabled: booleanProp,
        open: booleanProp,
        openOnHover: booleanProp,
        contentClickClose: booleanTrueProp,
        color: whiteColorProp,
        space: validStringOrNumberProp,
        placement: popoverPlacementProp,
        transition: popoverDefaultTransitionProp,
    },
    emits: [
        /**
         * Fired when this Popover state is updated.
         */
        'update:open',
        /**
         * Fired when this Popover closed or hide.
         */
        'close',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TDropdownMenuOptionProps>;
        const activator = ref<Element | null>(null);
        const popupMenu = ref<ComponentPublicInstance | null>(null);
        const isActive = ref(<boolean>thisProps.open);
        const timer = ref<number>();

        watch(
            () => thisProps.open as boolean,
            (value) => {
                isActive.value = value;
            }
        );

        return () =>
            useRenderDropdownMenu(props, slots, emit, activator, popupMenu, timer, isActive);
    },
});
