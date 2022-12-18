import type {ComponentObjectPropsOptions, ComputedRef, ExtractPropTypes, Prop, Ref, ShallowRef, VNode} from "vue";
import {createCommentVNode, createTextVNode, h, toDisplayString} from "vue";
import {cssPrefix, useHasLink, useRenderRouter} from "../../../mixins/CommonApi";
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
    instance: ShallowRef<IListItem | undefined>,
): TRecord {
    return {
        [`${cssPrefix}nav-item`]: true,
        [`${cssPrefix}nav-parent`]: instance.value?.hasChild(),
        [`${cssPrefix}expanded`]: instance.value?.hasChild() && expanded.value,
        [`${cssPrefix}has-icon`]: !Helper.isEmpty(props.icon),
        "active": useHasLink(props) && !props.disabled && isActive.value,
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
        [`${props.activeClass}`]: useHasLink(props) && props.activeClass && !props.disabled && isActive.value,
        "active": useHasLink(props) && !props.disabled && isActive.value,
        "rounded": provider?.itemRounded === true && !props.roundedOff,
        "rounded-pill": provider?.itemRoundedPill === true && !props.pillOff,
        "disabled": props.disabled === true,
    };
}

function navItemContentStyles(props: Readonly<TListNavItemOptionProps>): TRecord {
    const indent = 16 + (props.depth ? (parseInt(<string>props.depth, 10) * 16) : 0);

    return {
        "padding-left": props.indent
            ? Helper.sizeUnit(props.indent)
            : (props.depth ? Helper.sizeUnit(indent, "px") : undefined)
    }
}

function renderNavItemContent(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    instance: ShallowRef<IListItem | undefined>,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h<TBsRipple>(BsRipple, {
        class: [
            "d-flex",
            provider?.itemRounded === true && !cmpProps.roundedOff ? "rounded" : "",
            provider?.itemRoundedPill === true && !cmpProps.pillOff ? "rounded-pill" : "",
        ],
        styles: navItemContentStyles(cmpProps),
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
            (instance.value?.hasChild()
                    ? h(BsIcon, {icon: "expand_more" as Prop<string>, class: "expand-more"})
                    : createCommentVNode(" v-if-hasChild ")
            ),
        ]
    })
}

function renderNavLink(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    classes: ComputedRef<TRecord>,
    isActive: Ref<boolean>,
    isExpanded: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h("a", {
        class: classes.value,
        href: !cmpProps.disabled ? cmpProps.url : undefined,
        onVnodeMounted: (vnode: VNode) => onVNodeMountedHandler(cmpProps, instance, <IVNode>vnode, emit, provider),
        onClick: (evt: Event) => onVNodeClickHandler(cmpProps, isActive, isExpanded, instance, evt, provider),
    }, [
        renderNavItemContent(props, instance, provider),
    ]);
}

function renderRouterLink(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    classes: ComputedRef<TRecord>,
    isActive: Ref<boolean>,
    isExpanded: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return useRenderRouter({
            class: classes.value,
            activeClass: props.activeClass,
            to: !cmpProps.disabled ? cmpProps.path : undefined,
            onVnodeMounted: (vnode: IVNode) => onVNodeMountedHandler(cmpProps, instance, vnode, emit, provider),
            onClick: (evt: Event) => onVNodeClickHandler(cmpProps, isActive, isExpanded, instance, evt, provider)
        },
        renderNavItemContent(props, instance, provider),
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
    instance.value = new ListItem(<string>props.id, "BsListNavItem", context, emit, context.parent);

    if (provider) {
        const item = provider.findItem(it => it.uid === context.parent?.props.id, true);
        item?.addChild(instance.value);
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
    if (!props.disabled) {
        if (provider) {
            if (!instance.value?.hasChild() && !isActive.value) {
                provider.activeItem = instance.value;
            } else if (instance.value?.hasChild()) {
                if (isExpanded.value) {
                    provider.collapse(instance.value);
                } else {
                    provider.expand(instance.value);
                }
            }
        }

        instance.value?.fireEvent("click", event, (instance.value ? instance.value.component.vnode.el : undefined));
    }
}

export function useRenderListNavItem(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<TListNavItemOptionProps>>>,
    classes: ComputedRef<TRecord>,
    innerClasses: ComputedRef<TRecord>,
    isActive: Ref<boolean>,
    isExpanded: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    emit: TEmitFn,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h("li", {
        id: props.id,
        class: classes.value,
    }, [
        useHasLink(cmpProps)
            ? renderNavLink(props, innerClasses, isActive, isExpanded, instance, emit, provider)
            : renderRouterLink(props, innerClasses, isActive, isExpanded, instance, emit, provider)
    ]);
}
