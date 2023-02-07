import type {ComponentOptionsMixin, ComponentPublicInstance, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent, ref} from "vue";
import type {TBsDropdownMenu, TDropdownMenuOptionProps, TRecord} from "../../types";
import {useRenderDropdownMenu} from "./mixins/dropdownMenuApi";
import {booleanProp, booleanTrueProp, validStringOrNumberProp, whiteColorProp} from "../../mixins/CommonProps";
import {popoverDefaultTransitionProp, popoverPlacementProp} from "../Popover/mixins/popoverProps";

export default defineComponent<TBsDropdownMenu, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDropdownMenu",
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
        "update:open",
        /**
         * Fired when this Popover closed or hide.
         */
        "close",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TDropdownMenuOptionProps>;
        const activator = ref<Element | null>(null);
        const popupMenu = ref<ComponentPublicInstance | null>(null);
        const isActive = ref(<boolean>thisProps.open);
        const timer = ref<number>();

        return () =>
            useRenderDropdownMenu(props, slots, emit, activator, popupMenu, timer, isActive)
    }
});
