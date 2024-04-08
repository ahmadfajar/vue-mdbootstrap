import type {
    ComponentInternalInstance,
    ComputedRef,
    Prop,
    Ref,
    ShallowRef,
    Slots,
    VNode,
} from 'vue';
import { createCommentVNode, h, normalizeClass, toDisplayString, withDirectives } from 'vue';
import { Touch } from '../../../directives';
import {
    cssPrefix,
    useHasLink,
    useHasRouter,
    useMergeClass,
    useRenderRouter,
} from '../../../mixins/CommonApi';
import type {
    IVNode,
    TBsIcon,
    TBsTabItem,
    TIconProps,
    TOrientation,
    TRecord,
    TRouterLinkProps,
    TTabItemOptionProps,
    TTabLabelOptionProps,
    TTabsOptionProps,
} from '../../../types';
import Helper from '../../../utils/Helper';
import { useCreateIconProps } from '../../Avatar/mixins/avatarApi';
import { BsIcon } from '../../Icon';
import BsTabItem from '../BsTabItem';
import BsTabLabel from '../BsTabLabel';
import TabsProvider from './TabsProvider';

export function useTabViewClassNames(
    props: Readonly<TTabsOptionProps>,
    orientation: ComputedRef<string>
): Array<string> {
    let cssClasses = [
        'nav',
        `nav-${props.variant}`,
        props.alignment === 'justified' && orientation.value === 'horizontal'
            ? props.flex
                ? 'flex-column flex-lg-row'
                : 'nav-fill'
            : orientation.value === 'vertical'
            ? 'flex-column h-100'
            : '',
        props.alignment === 'center' && ['left', 'right'].includes(props.tabPosition as string)
            ? 'justify-content-center'
            : ['right', 'end'].includes(props.alignment as string) &&
              ['left', 'right'].includes(props.tabPosition as string)
            ? 'justify-content-end'
            : '',
        props.tabPosition === 'top'
            ? `${cssPrefix}tab-top`
            : props.tabPosition === 'bottom'
            ? `${cssPrefix}tab-bottom order-last`
            : props.tabPosition === 'right'
            ? `${cssPrefix}tab-right`
            : `${cssPrefix}tab-left`,
        ['material', 'modern'].includes(<string>props.variant) && props.color
            ? `bg-${props.color}`
            : '',
    ];

    if (Helper.isString(props.innerClass) && !Helper.isEmpty(props.innerClass)) {
        cssClasses.push(props.innerClass);
    } else if (!Helper.isEmpty(props.innerClass)) {
        cssClasses = cssClasses.concat(<string | string[]>props.innerClass);
    }

    return cssClasses;
}

export function useTabItemClassNames(
    props: Readonly<TTabItemOptionProps>,
    tagName: ComputedRef<string>,
    tabs?: TabsProvider
): TRecord {
    return {
        'nav-item': true,
        'nav-link': tagName.value !== 'li',
        'text-center': tagName.value !== 'li',
        'flex-fill': tabs?.alignment === 'justified',
        disabled: props.disabled === true,
        [<string>props.activeClass]:
            props.activeClass &&
            props.active === true &&
            tagName.value !== 'li' &&
            !useHasRouter(props),
        [normalizeClass(tabs?.tabClass)]: !Helper.isEmpty(tabs?.tabClass) && !props.active,
    };
}

export function useItemLinkClassNames(
    props: Readonly<TTabItemOptionProps>,
    tabs?: TabsProvider
): TRecord {
    const classes = {
        'nav-link': true,
        'text-center': true,
        disabled: props.disabled === true,
        'flex-fill': tabs?.alignment === 'justified',
        [<string>props.activeClass]: props.activeClass && props.active === true, // && !useHasRouter(props),
    };
    if (!Helper.isEmpty(tabs?.tabClass)) {
        classes[normalizeClass(tabs?.tabClass)] = tabs?.tabClass && !props.active; // && !useHasRouter(props);
    }

    return classes;
}

function renderTabIconWithCondition(
    condition: boolean,
    props: Readonly<TIconProps>,
    iconSize?: string | number,
    unMatchCondition?: VNode
): VNode {
    if (condition) {
        return h<TBsIcon>(BsIcon, {
            size: iconSize as Prop<string | number>,
            ...useCreateIconProps(props),
        });
    } else {
        return unMatchCondition ?? createCommentVNode(' BsIcon ', true);
    }
}

function tabItemAttrs(props: Readonly<TTabItemOptionProps>): TRecord {
    return {
        id: props.id,
        role: 'tab',
        'aria-controls': props.ariaLabel,
        'aria-selected': props.active === true,
    };
}

function tabLabelAttrs(props: Readonly<TTabItemOptionProps>, provider?: TabsProvider): TRecord {
    return {
        label: props.label,
        icon: props.icon,
        iconFlip: props.iconFlip,
        iconPulse: props.iconPulse,
        iconSpin: props.iconSpin,
        iconRotation: props.iconRotation,
        iconSize: provider?.iconSize,
        iconPosition: provider?.iconPosition,
        tabPosition: provider?.tabPosition,
        rippleOff: props.disabled,
    };
}

function tabItemOnClick(
    props: Readonly<TTabItemOptionProps>,
    provider?: TabsProvider,
    tabIndex?: number,
    event?: Event
): void {
    if (useHasLink(props) && props.url?.startsWith('#') && event) {
        event.preventDefault();
    }
    if (!props.active && !props.disabled) {
        provider?.setActiveTab(tabIndex);
    }
}

function createTabItemLink(
    props: Readonly<TTabItemOptionProps>,
    itemClasses: ComputedRef<TRecord>,
    tabIndex: Ref<number | undefined>,
    provider?: TabsProvider,
    mountedEvent = false
): VNode {
    const thisProps: TRouterLinkProps = {
        ...tabItemAttrs(props),
        class: itemClasses.value,
        href: !props.disabled ? props.url : undefined,
        // onClick: (e: Event) => tabItemOnClick(props, provider, tabIndex.value, e),
    };
    if (mountedEvent) {
        thisProps.onVnodeBeforeMount = (vnode: VNode) => {
            const vm = (vnode as IVNode).ctx;
            if (vm && provider) {
                tabIndex.value = provider.registerTabItem(vm) - 1;
            }
        };
    }

    return h('a', thisProps, [
        h(BsTabLabel, {
            ...tabLabelAttrs(props, provider),
        }),
    ]);
}

function createTabItemRouter(
    props: Readonly<TTabItemOptionProps>,
    itemClasses: ComputedRef<TRecord>,
    tabIndex: Ref<number | undefined>,
    provider?: TabsProvider,
    mountedEvent = false
): VNode {
    const thisProps: TRouterLinkProps = {
        ...tabItemAttrs(props),
        class: itemClasses.value,
        activeClass: props.activeClass,
        to: !props.disabled ? props.path : undefined,
        // onClick: (e: Event) => tabItemOnClick(props, provider, tabIndex.value, e),
    };
    if (mountedEvent) {
        thisProps.onVnodeBeforeMount = (vnode: VNode) => {
            const vm = (vnode as IVNode).ctx;
            if (vm && provider) {
                tabIndex.value = provider.registerTabItem(vm) - 1;
            }
        };
    }

    return useRenderRouter(thisProps, [
        h(BsTabLabel, {
            ...tabLabelAttrs(props, provider),
        }),
    ]);
}

export function useRenderTabItem(
    props: Readonly<TTabItemOptionProps>,
    tabItemClasses: ComputedRef<TRecord>,
    itemLinkClasses: ComputedRef<TRecord>,
    tagName: ComputedRef<string>,
    tabIndex: Ref<number | undefined>,
    provider?: TabsProvider
): VNode {
    if (tagName.value === 'li') {
        return h(
            'li',
            {
                class: tabItemClasses.value,
                role: 'presentation',
                onVnodeBeforeMount: (vnode) => {
                    const vm = (<IVNode>vnode).ctx;
                    if (vm && provider) {
                        tabIndex.value = provider.registerTabItem(vm) - 1;
                    }
                },
            },
            [
                useHasRouter(props)
                    ? createTabItemRouter(props, itemLinkClasses, tabIndex, provider)
                    : createTabItemLink(props, itemLinkClasses, tabIndex, provider),
            ]
        );
    } else if (useHasRouter(props)) {
        return createTabItemRouter(props, tabItemClasses, tabIndex, provider, true);
    } else {
        return createTabItemLink(props, tabItemClasses, tabIndex, provider, true);
    }
}

export function useRenderTabLabel(
    props: Readonly<TTabLabelOptionProps>,
    orientation: ComputedRef<TOrientation>
): Array<VNode> {
    return [
        renderTabIconWithCondition(
            !Helper.isEmpty(props.icon) && ['left', 'top'].includes(<string>props.iconPosition),
            props,
            props.iconSize
        ),
        props.label
            ? h(
                  ['left', 'right'].includes(<string>props.iconPosition) ? 'span' : 'div',
                  {
                      class: {
                          'ms-2':
                              props.iconPosition === 'left' && orientation.value === 'horizontal',
                          'me-2':
                              props.iconPosition === 'right' && orientation.value === 'horizontal',
                          'ms-3': props.iconPosition === 'left' && orientation.value === 'vertical',
                          'me-3':
                              props.iconPosition === 'right' && orientation.value === 'vertical',
                          'd-flex': orientation.value === 'vertical',
                          'flex-fill': orientation.value === 'vertical',
                          'mt-1': props.iconPosition === 'top',
                          'mb-1': props.iconPosition === 'bottom',
                      },
                  },
                  toDisplayString(props.label)
              )
            : createCommentVNode(' BsTabLabel ', true),
        renderTabIconWithCondition(
            !Helper.isEmpty(props.icon) && ['right', 'bottom'].includes(<string>props.iconPosition),
            props,
            props.iconSize
        ),
    ];
}

function createTabItemProps(
    props: Readonly<TTabsOptionProps>,
    tabPane: Readonly<TTabItemOptionProps>,
    provider: TabsProvider,
    index: number
): TRecord {
    return {
        id: tabPane.id ? `tabItem-${tabPane.id}` : undefined,
        icon: tabPane.icon,
        label: tabPane.label,
        path: tabPane.path,
        url: tabPane.url,
        disabled: tabPane.disabled,
        ariaLabel: tabPane.ariaLabel,
        active: tabPane.active || props.modelValue === tabPane.id || props.modelValue === index,
        activeClass: tabPane.activeClass || props.activeClass,
        onClick: (e: Event) => !tabPane.disabled && tabItemOnClick(props, provider, index, e),
    };
}

function renderVerticalTabView(
    slots: Slots,
    props: Readonly<TTabsOptionProps>,
    tagName: ComputedRef<string>,
    tabClasses: ComputedRef<string[]>,
    tabItems: ShallowRef<ComponentInternalInstance[]>,
    provider: TabsProvider
): VNode {
    return h(
        'div',
        {
            class: [`${cssPrefix}tabs`, 'row', 'mx-0 px-0', 'flex-fill'],
            onVnodeBeforeUnmount: () => provider.unRegisterAll(),
        },
        [
            h(
                'div',
                {
                    class: { 'col-auto px-0': true, 'order-last': props.tabPosition === 'right' },
                },
                [
                    h(
                        tagName.value,
                        {
                            class: tabClasses.value,
                            role: 'tablist',
                            'aria-orientation': 'vertical',
                        },
                        tabItems.value.map((it, idx) => {
                            return h<TBsTabItem>(BsTabItem, {
                                key: `tab-item-${idx}`,
                                ...createTabItemProps(
                                    props,
                                    <Readonly<TTabItemOptionProps>>it.props,
                                    provider,
                                    idx
                                ),
                            });
                        })
                    ),
                ]
            ),
            h(
                'div',
                {
                    class: useMergeClass('col tab-content', <string>props.contentClass),
                },
                slots.default && slots.default()
            ),
        ]
    );
}

function tabOnSlidingHandler(
    scrollOffset: Ref<number>,
    deltaX: number,
    target?: HTMLElement
): void {
    const parent = target?.parentElement;

    if (target && parent) {
        const styles = getComputedStyle(parent);
        const borderW = parseFloat(styles.borderLeftWidth) + parseFloat(styles.borderRightWidth);
        const paddingW = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
        const parentWidth = parent.clientWidth - paddingW - borderW;
        const contentWidth = target.clientWidth ?? parent.clientWidth;

        if (contentWidth > parentWidth) {
            const newOffset = scrollOffset.value + deltaX;
            const deltaW = contentWidth - parentWidth + parseFloat(styles.paddingRight) / 2;
            const deltaW1 = deltaW + 200;
            scrollOffset.value =
                newOffset > 200 ? 200 : Math.abs(newOffset) > deltaW1 ? -deltaW1 : newOffset;
            target.style.transform = `translateX(${scrollOffset.value}px)`;

            if (scrollOffset.value > 0 || scrollOffset.value < -deltaW) {
                window.requestAnimationFrame(() => {
                    if (scrollOffset.value > 0) {
                        scrollOffset.value = 0;
                        target.style.transform = `translateX(${scrollOffset.value}px)`;
                    } else if (scrollOffset.value < -deltaW) {
                        scrollOffset.value = -deltaW;
                        target.style.transform = `translateX(${scrollOffset.value}px)`;
                    }
                });
            }
        }
    }
}

function tabOnWheel(scrollOffset: Ref<number>, event: WheelEvent, target?: HTMLElement): void {
    (event.deltaX < 0 || event.deltaX > 0) && event.preventDefault();
    window.requestAnimationFrame(() =>
        tabOnSlidingHandler(scrollOffset, event.deltaX * -1, target)
    );
}

function renderHorizontalTabView(
    slots: Slots,
    props: Readonly<TTabsOptionProps>,
    tagName: ComputedRef<string>,
    tabClasses: ComputedRef<string[]>,
    tabItems: ShallowRef<ComponentInternalInstance[]>,
    sliderRef: Ref<HTMLElement | undefined>,
    scrollOffset: Ref<number>,
    provider: TabsProvider
): VNode {
    return h(
        'div',
        {
            class: [`${cssPrefix}tabs`, 'd-flex', 'flex-column', 'flex-fill'],
            onVnodeBeforeUnmount: () => provider.unRegisterAll(),
        },
        [
            withDirectives(
                h(
                    tagName.value,
                    {
                        class: tabClasses.value,
                        role: 'tablist',
                        'aria-orientation': 'horizontal',
                        onWheel: (evt: WheelEvent) =>
                            tabOnWheel(scrollOffset, evt, sliderRef.value),
                    },
                    [
                        h(
                            'div',
                            {
                                ref: sliderRef,
                                class: [
                                    'tab-sliding',
                                    props.alignment === 'center'
                                        ? 'justify-content-center'
                                        : ['right', 'end'].includes(props.alignment as string)
                                        ? 'justify-content-end'
                                        : '',
                                ],
                            },
                            tabItems.value.map((it, idx) =>
                                h<TBsTabItem>(BsTabItem, {
                                    key: `tab-item-${idx}`,
                                    ...createTabItemProps(
                                        props,
                                        <Readonly<TTabItemOptionProps>>it.props,
                                        provider,
                                        idx
                                    ),
                                })
                            )
                        ),
                    ]
                ),
                [
                    [
                        Touch,
                        {
                            left: (evt: WheelEvent) =>
                                tabOnSlidingHandler(scrollOffset, evt.deltaX, sliderRef.value),
                            right: (evt: WheelEvent) =>
                                tabOnSlidingHandler(scrollOffset, evt.deltaX, sliderRef.value),
                        },
                    ],
                ]
            ),
            h(
                'div',
                {
                    class: useMergeClass(['tab-content'], <string>props.contentClass),
                },
                slots.default && slots.default()
            ),
        ]
    );
}

export function useRenderTabView(
    slots: Slots,
    props: Readonly<TTabsOptionProps>,
    orientation: ComputedRef<TOrientation>,
    tagName: ComputedRef<string>,
    tabClasses: ComputedRef<string[]>,
    tabItems: ShallowRef<ComponentInternalInstance[]>,
    sliderRef: Ref<HTMLElement | undefined>,
    scrollOffset: Ref<number>,
    provider: TabsProvider
): VNode {
    if (orientation.value === 'vertical') {
        return renderVerticalTabView(slots, props, tagName, tabClasses, tabItems, provider);
    } else {
        return renderHorizontalTabView(
            slots,
            props,
            tagName,
            tabClasses,
            tabItems,
            sliderRef,
            scrollOffset,
            provider
        );
    }
}
