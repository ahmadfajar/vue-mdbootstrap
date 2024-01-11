import type {
    ComponentInternalInstance,
    ComputedRef,
    ExtractPropTypes,
    Prop,
    Ref,
    ShallowRef,
    Slots,
    VNode
} from 'vue';
import { createCommentVNode, createTextVNode, h, toDisplayString } from 'vue';
import { cssPrefix, useHasRouter, useRenderRouter } from '../../../mixins/CommonApi';
import type {
    IListItem,
    IListViewProvider,
    TBsListNavItem,
    TBsRipple,
    TListNavItemOptionProps,
    TRecord
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsRipple } from '../../Animation';
import { useCreateIconProps } from '../../Avatar/mixins/avatarApi';
import { BsBadge } from '../../Badge';
import { BsIcon } from '../../Icon';


export function useListNavItemClasses(
    props: Readonly<TListNavItemOptionProps>,
    isActive: Ref<boolean | undefined>,
    expanded: Ref<boolean>,
    hasChild: Ref<boolean>,
): TRecord {
    return {
        [`${cssPrefix}nav-item`]: true,
        [`${cssPrefix}nav-parent`]: hasChild.value,
        [`${cssPrefix}expanded`]: hasChild.value && expanded.value,
        [`${cssPrefix}has-icon`]: !Helper.isEmpty(props.icon),
        'active': !props.disabled && isActive.value,
        'disabled': props.disabled === true,
    };
}

export function useListNavItemInnerClasses(
    props: Readonly<TListNavItemOptionProps>,
    isActive: Ref<boolean | undefined>,
    hasRouter: Ref<boolean>,
    provider?: IListViewProvider,
): TRecord {
    return {
        [`${cssPrefix}nav-item-inner`]: true,
        [`${cssPrefix}tile-border-${provider?.itemBorderVariant}`]: (
            provider?.itemBorderVariant && !props.borderOff &&
            ['left', 'right', 'left-right', 'top', 'bottom', 'top-bottom'].includes(provider.itemBorderVariant)
        ),
        [`${cssPrefix}tile-space-${provider?.spaceAround}`]: (
            provider?.spaceAround &&
            ['both', 'left', 'right'].includes(provider.spaceAround)
        ),
        [`${props.activeClass}`]: hasRouter.value && props.activeClass && !props.disabled && isActive.value,
        'active': !hasRouter.value && !props.disabled && isActive.value,
        'rounded': provider?.itemRounded === true && !props.roundedOff,
        'rounded-pill': provider?.itemRoundedPill === true && !props.pillOff,
        'disabled': props.disabled === true,
    };
}

export function useNavItemContentStyles(props: Readonly<TListNavItemOptionProps>): string[] {
    const indent = 16 + (props.depth ? (parseInt(<string>props.depth, 10) * 20) : 0);
    const padding = props.indent
        ? Helper.cssUnit(props.indent)
        : (props.depth ? Helper.cssUnit(indent, 'px') : undefined);

    return padding ? [`padding-left: ${padding}`] : [];
}

function renderNavItemContent(
    props: Readonly<ExtractPropTypes<TBsListNavItem>>,
    innerStyles: ComputedRef<string[]>,
    hasChild: Ref<boolean>,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h<TBsRipple>(BsRipple, {
        class: [
            'd-flex',
            provider?.itemRounded === true && !cmpProps.roundedOff ? 'rounded' : '',
            provider?.itemRoundedPill === true && !cmpProps.pillOff ? 'rounded-pill' : '',
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
                    : createCommentVNode(' v-if-BsIcon ')
            ),
            h('span', {
                    class: [`${cssPrefix}nav-text`]
                },
                createTextVNode(toDisplayString(cmpProps.label))
            ),
            (!Helper.isEmpty(cmpProps.badge)
                    ? h(BsBadge, {
                        class: [hasChild.value ? 'me-3' : ''],
                        color: props.badgeColor,
                        type: props.badgeType,
                        variant: props.badgeVariant,
                    }, {
                        default: () => createTextVNode(toDisplayString(cmpProps.badge))
                    })
                    : createCommentVNode(' v-if-BsBadge ')
            ),
            (hasChild.value
                    ? h(BsIcon, {icon: 'expand_more' as Prop<string>, class: 'expand-more'})
                    : createCommentVNode(' v-if-arrow ')
            ),
        ]
    })
}

function renderNavLink(
    props: Readonly<ExtractPropTypes<TBsListNavItem>>,
    classes: ComputedRef<TRecord>,
    innerStyles: ComputedRef<string[]>,
    isActive: Ref<boolean | undefined>,
    isExpanded: Ref<boolean>,
    hasChild: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h(!cmpProps.disabled ? 'a' : 'div', {
        class: classes.value,
        href: !cmpProps.disabled ? cmpProps.url : undefined,
        onClick: (evt: Event) => onVNodeClickHandler(cmpProps, isActive, isExpanded, instance, evt, provider),
    }, [
        renderNavItemContent(props, innerStyles, hasChild, provider),
    ]);
}

function renderRouterLink(
    props: Readonly<ExtractPropTypes<TBsListNavItem>>,
    classes: ComputedRef<TRecord>,
    innerStyles: ComputedRef<string[]>,
    isActive: Ref<boolean | undefined>,
    isExpanded: Ref<boolean>,
    hasChild: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return useRenderRouter({
            class: classes.value,
            activeClass: props.activeClass || 'active',
            to: cmpProps.path,
            onClick: (evt: Event) => onVNodeClickHandler(cmpProps, isActive, isExpanded, instance, evt, provider)
        },
        renderNavItemContent(props, innerStyles, hasChild, provider),
    );
}

function onVNodeClickHandler(
    props: Readonly<TListNavItemOptionProps>,
    isActive: Ref<boolean | undefined>,
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

        instance.value.fireEvent('click', event, instance.value.component.vnode.el);
    }
}

export async function useAddChild(
    listViewProvider: IListViewProvider,
    parent?: ComponentInternalInstance | null,
    child?: IListItem,
): Promise<void> {
    await listViewProvider.execAction((it) => {
        if (parent && child && it.uid === parent.props.id) {
            child.parent = it;
            it.addChild(child);

            return it;
        }
    }, true, true);
}

export function useRenderListNavItem(
    slots: Slots,
    props: Readonly<ExtractPropTypes<TBsListNavItem>>,
    classes: ComputedRef<TRecord>,
    innerClasses: ComputedRef<TRecord>,
    innerStyles: ComputedRef<string[]>,
    isActive: Ref<boolean | undefined>,
    isExpanded: Ref<boolean>,
    hasChild: Ref<boolean>,
    instance: ShallowRef<IListItem | undefined>,
    provider?: IListViewProvider,
): VNode {
    const cmpProps = props as Readonly<TListNavItemOptionProps>;

    return h('li', {
        id: props.id,
        class: classes.value,
    }, [
        (useHasRouter(cmpProps) && !props.disabled
                ? renderRouterLink(props, innerClasses, innerStyles, isActive, isExpanded, hasChild, instance, provider)
                : renderNavLink(props, innerClasses, innerStyles, isActive, isExpanded, hasChild, instance, provider)
        ),
        slots.default && slots.default(),
    ]);
}
