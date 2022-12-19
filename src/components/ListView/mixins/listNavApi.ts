import type {
    ComponentInternalInstance,
    ComponentObjectPropsOptions,
    ComputedRef,
    ExtractPropTypes,
    Prop,
    Ref,
    ShallowRef,
    Slots,
    VNode
} from "vue";
import {createCommentVNode, createTextVNode, h, nextTick, toDisplayString} from "vue";
import {cssPrefix, useHasRouter, useRenderRouter, useRenderSlot, useRenderTransition} from "../../../mixins/CommonApi";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {BsRipple} from "../../Animation";
import {BsBadge} from "../../Badge";
import {BsIcon} from "../../Icon";
import type {
    IListItem,
    IListViewProvider,
    IVNode,
    TBsRipple,
    TEmitFn,
    TListNavItemOptionProps,
    TRecord
} from "../../../types";
import Helper from "../../../utils/Helper";
import ListItem from "./ListItem";


export function useListNavItemClasses(
    props: Readonly<TListNavItemOptionProps>,
    isActive: Ref<boolean>,
    expanded: Ref<boolean>,
    hasChild: Ref<boolean>,
): TRecord {
    return {
        [`${cssPrefix}nav-item`]: true,
        [`${cssPrefix}nav-parent`]: hasChild.value,
        [`${cssPrefix}expanded`]: hasChild.value && expanded.value,
        [`${cssPrefix}has-icon`]: !Helper.isEmpty(props.icon),
        "active": !useHasRouter(props) && !props.disabled && isActive.value,
        "disabled": props.disabled === true,
    };
}

export function useListNavItemInnerClasses(
    props: Readonly<TListNavItemOptionProps>,
    isActive: Ref<boolean>,
    provider?: IListViewProvider,
): TRecord {
    return {
        [`${cssPrefix}nav-item-inner`]: true,
        [`${cssPrefix}tile-border-${provider?.itemBorderVariant}`]: provider?.itemBorderVariant && !props.borderOff
        && ["left", "right", "left-right", "top", "bottom", "top-bottom"].includes(provider.itemBorderVariant),
        [`${cssPrefix}tile-space-${provider?.spaceAround}`]: provider?.spaceAround && ["both", "left", "right"].includes(provider.spaceAround),
        [`${props.activeClass}`]: !useHasRouter(props) && props.activeClass && !props.disabled && isActive.value,
        "active": !useHasRouter(props) && !props.disabled && isActive.value,
        "rounded": provider?.itemRounded === true && !props.roundedOff,
        "rounded-pill": provider?.itemRoundedPill === true && !props.pillOff,
        "disabled": props.disabled === true,
    };
}

export function useNavItemContentStyles(props: Readonly<TListNavItemOptionProps>): string[] {
    const indent = 16 + (props.depth ? (parseInt(<string>props.depth, 10) * 20) : 0);
    const padding = props.indent
        ? Helper.sizeUnit(props.indent)
        : (props.depth ? Helper.sizeUnit(indent, "px") : undefined);

    return padding ? [`padding-left: ${padding}`] : [];
}

function renderNavItemContent(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    innerStyles: ComputedRef<string[]>,
    hasChild: Ref<boolean>,
    isExpanded: Ref<boolean>,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h<TBsRipple>(BsRipple, {
        class: [
            "d-flex",
            provider?.itemRounded === true && !cmpProps.roundedOff ? "rounded" : "",
            provider?.itemRoundedPill === true && !cmpProps.pillOff ? "rounded-pill" : "",
        ],
        style: innerStyles.value,
        disabled: (props.rippleOff || props.disabled),
    }, {
        default: () => [
            (!Helper.isEmpty(cmpProps.icon)
                    ? h(BsIcon, {
                        size: (cmpProps.iconSize ?? 24) as Prop<string | number>,
                        ...useCreateIconProps(cmpProps),
                    })
                    : createCommentVNode(" v-if-BsIcon ")
            ),
            h("span", {
                    class: [`${cssPrefix}nav-text`]
                },
                createTextVNode(toDisplayString(cmpProps.label))
            ),
            (!Helper.isEmpty(cmpProps.badge)
                    ? h(BsBadge, {
                        class: ["fw-normal me-3"],
                        color: props.badgeColor,
                        type: props.badgeType,
                        variant: props.badgeVariant,
                    }, {
                        default: () => createTextVNode(toDisplayString(cmpProps.badge))
                    })
                    : createCommentVNode(" v-if-BsBadge ")
            ),
            (hasChild.value
                    ? h(BsIcon, {icon: "expand_more" as Prop<string>, class: "expand-more"})
                    : createCommentVNode(" v-if-arrow ")
            ),
        ]
    })
}

function renderNavLink(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    classes: ComputedRef<TRecord>,
    innerStyles: ComputedRef<string[]>,
    isActive: Ref<boolean>,
    isExpanded: Ref<boolean>,
    hasChild: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h("a", {
        class: classes.value,
        href: !cmpProps.disabled ? cmpProps.url : undefined,
        onVnodeBeforeMount: (vnode: VNode) => onVNodeMountedHandler(cmpProps, instance, <IVNode>vnode, emit, provider),
        onClick: (evt: Event) => onVNodeClickHandler(cmpProps, isActive, isExpanded, instance, evt, provider),
    }, [
        renderNavItemContent(props, innerStyles, hasChild, isExpanded, provider),
    ]);
}

function renderRouterLink(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    classes: ComputedRef<TRecord>,
    innerStyles: ComputedRef<string[]>,
    isActive: Ref<boolean>,
    isExpanded: Ref<boolean>,
    hasChild: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return useRenderRouter({
            class: classes.value,
            activeClass: props.activeClass,
            to: !cmpProps.disabled ? cmpProps.path : undefined,
            onVnodeBeforeMount: (vnode: IVNode) => onVNodeMountedHandler(cmpProps, instance, vnode, emit, provider),
            onClick: (evt: Event) => onVNodeClickHandler(cmpProps, isActive, isExpanded, instance, evt, provider)
        },
        renderNavItemContent(props, innerStyles, hasChild, isExpanded, provider),
    );
}

function onVNodeMountedHandler(
    props: Readonly<TListNavItemOptionProps>,
    instance: ShallowRef<IListItem | undefined>,
    vnode: IVNode,
    emit: TEmitFn,
    provider?: IListViewProvider,
): void {
    const context = vnode.ctx;
    instance.value = new ListItem(<string>props.id, "BsListNavItem", context, emit);

    if (provider) {
        if (context.parent?.props.child === true) {
            Helper.defer(() => addChild(provider, context.parent, instance.value), 50);
        } else {
            nextTick().then(() => addChild(provider, context.parent, instance.value));
        }
    }
}

function addChild(
    listViewProvider: IListViewProvider,
    parent?: ComponentInternalInstance | null,
    child?: IListItem,
): void {
    const item = listViewProvider.findItem(it =>
            parent !== undefined && parent !== null
            && it.uid === parent.props.id,
        true
    );
    if (item && child) {
        child.parent = item;
        item.addChild(child);
    }
}

function onVNodeClickHandler(
    props: Readonly<TListNavItemOptionProps>,
    isActive: Ref<boolean>,
    isExpanded: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    event: Event,
    provider?: IListViewProvider,
): void {
    if (!props.disabled && instance.value) {
        if (provider) {
            if (!instance.value.hasChild() && !isActive.value) {
                provider.activeItem = instance.value;
                let parent = instance.value.parent;

                while (parent) {
                    parent.setActive(true);
                    parent = parent.parent;
                }
            } else if (instance.value.hasChild()) {
                if (isExpanded.value) {
                    provider.collapse(instance.value);
                } else {
                    provider.expand(instance.value);
                }
            }
        }

        instance.value.fireEvent("click", event, instance.value.component.vnode.el);
    }
}

export function useRenderListNavItem(
    slots: Slots,
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    classes: ComputedRef<TRecord>,
    innerClasses: ComputedRef<TRecord>,
    innerStyles: ComputedRef<string[]>,
    isActive: Ref<boolean>,
    isExpanded: Ref<boolean>,
    hasChild: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h("li", {
        id: props.id,
        class: classes.value,
    }, [
        (useHasRouter(cmpProps)
                ? renderRouterLink(props, innerClasses, innerStyles, isActive, isExpanded, hasChild, instance, emit, provider)
                : renderNavLink(props, innerClasses, innerStyles, isActive, isExpanded, hasChild, instance, emit, provider)
        ),
        slots.default && slots.default(),
        // useRenderTransition(
        //     {name: "fade"},
        //     hasChild.value && isExpanded.value
        //         ? useRenderSlot(slots, "default")
        //         : createCommentVNode(" BsAlert ", true)
        // ),
    ]);
}
