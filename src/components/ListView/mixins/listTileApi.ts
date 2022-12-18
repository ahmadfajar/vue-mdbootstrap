import type {ComputedRef, Prop, Ref, ShallowRef, Slots, VNode} from "vue";
import {h} from "vue";
import {BsRipple} from "../../Animation";
import {cssPrefix, useHasLink, useHasRouter, useRenderRouter} from "../../../mixins/CommonApi";
import type {
    IListItem,
    IListViewProvider,
    IVNode,
    TBsRipple,
    TEmitFn,
    TListTileOptionProps,
    TRecord
} from "../../../types";
import ListItem from "./ListItem";


export function useListTileClassNames(
    tagName: string,
    props: Readonly<TListTileOptionProps>,
    isActive: Ref<boolean | undefined>,
    provider?: IListViewProvider,
): TRecord {
    return {
        [`${cssPrefix}list-tile d-flex`]: true,
        [`${cssPrefix}link`]: tagName === "a" && !props.disabled,
        [`${cssPrefix}tile-border-${provider?.itemBorderVariant}`]: provider?.itemBorderVariant && !props.borderOff
        && ["left", "right", "left-right", "top", "bottom", "top-bottom"].includes(provider.itemBorderVariant),
        [`${cssPrefix}tile-space-${provider?.spaceAround}`]: provider?.spaceAround && ["both", "left", "right"].includes(provider.spaceAround),
        [`${props.activeClass}`]: (useHasLink(props) || props.navigable) && props.activeClass && !props.disabled && isActive.value === true,
        "active": (useHasLink(props) || props.navigable) && !props.disabled && isActive.value === true,
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
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    return h(tagName, {
        id: props.id,
        class: classes.value,
        href: tagName === "a" ? props.url : undefined,
        onVnodeMounted: (vnode: VNode) => {
            instance.value = new ListItem(<string>props.id, "BsListTile", (<IVNode>vnode).ctx, emit);
            provider?.addItem(instance.value);
        },
        onVnodeBeforeUnmount: () => instance.value && provider?.removeItem(instance.value),
        onClick: (e: Event) => {
            // console.log("tile-instance", instance.value);
            if (tagName === "a") {
                if (provider) {
                    provider.activeItem = instance.value;
                }
                if (!provider || provider.config.individualState === true) {
                    emit("update:active", !props.active);
                }
            }
            emit("click", e, (instance.value ? instance.value.component.vnode.el : undefined));
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
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    return useRenderRouter({
            id: props.id,
            class: classes.value,
            activeClass: props.activeClass,
            to: !props.disabled ? props.path : undefined,
            onVnodeMounted: (vnode: IVNode) => {
                instance.value = new ListItem(<string>props.id, "BsListTile", vnode.ctx, emit);
                provider?.addItem(instance.value);
            },
            onVnodeBeforeUnmount: () => instance.value && provider?.removeItem(instance.value),
            onClick: (e: Event) => {
                if (provider) {
                    provider.activeItem = instance.value;
                }
                if (!provider || provider.config.individualState === true) {
                    emit("update:active", !props.active);
                }
                emit("click", e, (instance.value ? instance.value.component.vnode.el : undefined));
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
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    if (useHasRouter(props)) {
        return createListTileRouterVnode(slots, props, classes, instance, emit, provider);
    } else {
        return createListTileVnode(tagName, slots, props, classes, instance, emit, provider);
    }
}
