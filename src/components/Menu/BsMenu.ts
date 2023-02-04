import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, PropType} from "vue";
import {defineComponent, h, ref} from "vue";
import {menuProps} from "./mixins/menuProps";
import type {TBsMenu, TBsPopover, TMenuOptionProps, TRecord} from "../../types";
import {cssPrefix} from "../../mixins/CommonApi";
import {BsPopover} from "../Popover";

export default defineComponent<TBsMenu, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsMenu",
    props: menuProps,
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TMenuOptionProps>;
        const activator = ref<Element | null>(null);
        const popupMenu = ref(null);
        const isActive = ref(<boolean>thisProps.open);

        return () =>
            h("div", {
                class: [`${cssPrefix}menu`]
            }, [
                h("div", {
                    ref: activator,
                    class: [`${cssPrefix}menu-activator`],
                    onClick: () => {
                        return;
                    },
                    onMouseenter: () => {
                        return;
                    },
                    onMouseleave: () => {
                        return;
                    },
                }, slots.default && slots.default()),
                // @ts-ignore
                h<TBsPopover>(BsPopover, {
                    ref: popupMenu,
                    class: [`${cssPrefix}menu-popover`, `${cssPrefix}shadow-1`],
                    color: props.color,
                    cover: props.cover,
                    // @ts-ignore
                    open: <PropType<boolean>>isActive.value,
                    placement: props.placement,
                    transition: props.transition,
                    trigger: activator.value,
                    onClick: () => {
                        return;
                    },
                    onMouseenter: () => {
                        return;
                    },
                    onMouseleave: () => {
                        return;
                    },
                    "onUpdate:open": (value: boolean) => {
                        isActive.value = value
                    },
                }, slots.content && slots.content())
            ])
    }
});
