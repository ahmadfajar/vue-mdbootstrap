import type {ComponentInternalInstance, ComputedRef, Prop, Ref, ShallowRef, Slots, VNode} from "vue";
import {h} from "vue";
import {BsRipple} from "../../Animation";
import {cssPrefix, useHasLink, useHasRouter, useRenderRouter} from "../../../mixins/CommonApi";
import type {IVNode, TBsRipple, TEmitFn, TListTileOptionProps, TRecord} from "../../../types";
import ListViewProvider from "./ListViewProvider";


export function useListTileClassNames(
    props: Readonly<TListTileOptionProps>,
    isActive: Ref<boolean | undefined>,
    tagName: string,
    provider?: ListViewProvider,
): TRecord {
    return {
        [`${cssPrefix}list-tile d-flex`]: true,
        [`${cssPrefix}link`]: tagName === "a" && !props.disabled,
        [`${cssPrefix}tile-border-${provider?.itemBorderVariant}`]: provider?.itemBorderVariant && !props.borderOff
        && ["left", "right", "left-right", "top", "bottom", "top-bottom"].includes(provider.itemBorderVariant),
        [`${cssPrefix}tile-space-${provider?.spaceAround}`]: provider?.spaceAround && ["both", "left", "right"].includes(provider.spaceAround),
        [`active ${props.activeClass}`]: (useHasLink(props) || props.navigable)
        && !props.disabled && isActive.value === true,
        "rounded": provider?.itemRounded === true && !props.roundedOff,
        "rounded-pill": provider?.itemRoundedPill === true && !props.pillOff,
        "disabled": props.disabled === true,
    };
}

function createListTileVnode(
    tagName: string,
    slots: Slots,
    props: Readonly<TListTileOptionProps>,
    classes: ComputedRef<TRecord>,
    emitter: TEmitFn,
    instance: ShallowRef<ComponentInternalInstance | undefined | null>,
    provider?: ListViewProvider,
): VNode {
    return h(tagName, {
        id: props.id,
        class: classes.value,
        href: tagName === "a" ? props.url : undefined,
        onVnodeMounted: (vnode: VNode) => {
            instance.value = (<IVNode>vnode).ctx;
            provider?.addItem((<IVNode>vnode).ctx);
        },
        onVnodeBeforeUnmount: (vnode: VNode) => provider?.removeItem((<IVNode>vnode).ctx),
        onClick: (e: Event) => {
            // console.log("tile-instance", instance.value);
            if (tagName === "a") {
                emitter("update:active", !props.active);
                if (instance.value && provider) {
                    provider.activeItem = instance.value;
                }
            }
            emitter("click", e, (instance.value ? instance.value.vnode.el : undefined));
        },
    }, [
        h<TBsRipple>(BsRipple, {
            class: [
                "d-flex",
                provider?.itemRounded === true && !props.roundedOff ? "rounded" : "",
                provider?.itemRoundedPill === true && !props.pillOff ? "rounded-pill" : "",
            ],
            // @ts-ignore
            disabled: (props.rippleOff || props.disabled || tagName !== "a") as Prop<boolean>,
        }, {
            default: () => slots.default && slots.default()
        })
    ]);
}

function createListTileRouterVnode(
    slots: Slots,
    props: Readonly<TListTileOptionProps>,
    classes: ComputedRef<TRecord>,
    emitter: TEmitFn,
    instance: ShallowRef<ComponentInternalInstance | undefined | null>,
    provider?: ListViewProvider,
): VNode {
    return useRenderRouter({
            id: props.id,
            class: classes.value,
            activeClass: props.activeClass,
            to: !props.disabled ? props.path : undefined,
            onVnodeMounted: (vnode: IVNode) => {
                instance.value = vnode.ctx;
                provider?.addItem(vnode.ctx);
            },
            onVnodeBeforeUnmount: (vnode: IVNode) => provider?.removeItem(vnode.ctx),
            onClick: (e: Event) => {
                if (instance.value && provider) {
                    emitter("update:active", !props.active);
                    provider.activeItem = instance.value;
                }
                emitter("click", e, (instance.value ? instance.value.vnode.el : undefined));
            }
        },
        h<TBsRipple>(BsRipple, {
            class: [
                "d-flex",
                provider?.itemRounded === true && !props.roundedOff ? "rounded" : "",
                provider?.itemRoundedPill === true && !props.pillOff ? "rounded-pill" : "",
            ],
            // @ts-ignore
            disabled: (props.rippleOff || props.disabled) as Prop<boolean>,
        }, {
            default: () => slots.default && slots.default()
        })
    );
}

export function useRenderListTile(
    tagName: string,
    slots: Slots,
    props: Readonly<TListTileOptionProps>,
    classes: ComputedRef<TRecord>,
    emitter: TEmitFn,
    instance: ShallowRef<ComponentInternalInstance | undefined | null>,
    provider?: ListViewProvider,
): VNode {
    if (useHasRouter(props)) {
        return createListTileRouterVnode(slots, props, classes, emitter, instance, provider);
    } else {
        return createListTileVnode(tagName, slots, props, classes, emitter, instance, provider);
    }
}
