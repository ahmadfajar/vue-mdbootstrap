import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi.ts';
import { BsIcon } from '@/components/Icon';
import BsTabItem from '@/components/Tabs/BsTabItem.ts';
import BsTabLabel from '@/components/Tabs/BsTabLabel.ts';
import TabsProvider from '@/components/Tabs/mixins/TabsProvider.ts';
import { Touch } from '@/directives';
import {
  cssPrefix,
  useHasLink,
  useHasRouter,
  useMergeClass,
  useRenderRouter,
} from '@/mixins/CommonApi.ts';
import type {
  IVNode,
  Numberish,
  TAllowedIconProps,
  TBsIcon,
  TBsTabItem,
  TOrientation,
  TRecord,
  TRouterLinkProps,
  TTabItemOptionProps,
  TTabLabelOptionProps,
  TTabsOptionProps,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComputedRef, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h, normalizeClass, toDisplayString, withDirectives } from 'vue';

export function useTabViewClassNames(
  props: Readonly<TTabsOptionProps>,
  orientation: ComputedRef<TOrientation>
): string[] {
  let cssClasses = [
    `${cssPrefix}tabs-${props.variant}`,
    `${cssPrefix}tab-items`,
    'flex',
    props.alignment === 'justified' && orientation.value === 'horizontal'
      ? props.flex
        ? 'flex-col flex-lg-row lg:flex-row'
        : 'tab-justified'
      : orientation.value === 'vertical'
        ? 'flex-col h-full'
        : '',
    props.alignment === 'center' && ['left', 'right'].includes(props.tabPosition as string)
      ? 'justify-center'
      : ['right', 'end'].includes(props.alignment as string) &&
          ['left', 'right'].includes(props.tabPosition as string)
        ? 'justify-end'
        : '',
    props.tabPosition === 'top'
      ? `${cssPrefix}tab-top`
      : props.tabPosition === 'bottom'
        ? `${cssPrefix}tab-bottom`
        : props.tabPosition === 'right'
          ? `${cssPrefix}tab-right`
          : `${cssPrefix}tab-left`,
    ['material', 'modern'].includes(props.variant as string) && props.color ? props.color : '',
  ];

  if (Helper.isString(props.innerClass) && !Helper.isEmpty(props.innerClass)) {
    cssClasses.push(props.innerClass);
  } else if (!Helper.isEmpty(props.innerClass)) {
    cssClasses = cssClasses.concat(props.innerClass as string | string[]);
  }

  return cssClasses;
}

export function useTabItemClassNames(
  props: Readonly<TTabItemOptionProps>,
  tabs?: TabsProvider
): TRecord {
  return {
    'tab-item': true,
    'tab-item-link': true,
    'text-center': true,
    'flex-fill': tabs?.alignment === 'justified',
    disabled: props.disabled === true,
    [`${props.activeClass}`]: props.activeClass && props.active === true && !useHasRouter(props),
    [normalizeClass(tabs?.tabClass)]: !Helper.isEmpty(tabs?.tabClass) && !props.active,
  };
}

// export function useItemLinkClassNames(
//   props: Readonly<TTabItemOptionProps>,
//   tabs?: TabsProvider
// ): TRecord {
//   return {
//     'tab-item-link': true,
//     'text-center': true,
//     'flex-fill': tabs?.alignment === 'justified',
//     disabled: props.disabled === true,
//     [`${props.activeClass}`]: props.activeClass && props.active === true, // && !useHasRouter(props),
//     [normalizeClass(tabs?.tabClass)]: !Helper.isEmpty(tabs?.tabClass) && !props.active,
//   };
// }

function renderTabIconWithCondition(
  condition: boolean,
  props: Readonly<TAllowedIconProps>,
  iconSize?: Numberish,
  unMatchCondition?: VNode
): VNode {
  if (condition) {
    return h<TBsIcon>(BsIcon, {
      size: iconSize as Prop<Numberish>,
      ...useCreateIconProps(props),
    });
  } else {
    return unMatchCondition ?? createCommentVNode(' v-if-Icon ');
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
    iconVariant: props.iconVariant,
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
  };
  if (mountedEvent) {
    thisProps.onVnodeBeforeMount = (vnode: VNode) => {
      const vm = (vnode as IVNode).ctx;
      if (vm && provider) {
        tabIndex.value = provider.registerTabItem(vm) - 1;
      }
    };
  }

  return h(props.url ? 'a' : 'div', thisProps, [
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
    to: !props.disabled
      ? (props.location ?? (props.pathName ? { name: props.pathName } : props.path))
      : undefined,
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
  tabIndex: Ref<number | undefined>,
  provider?: TabsProvider
): VNode {
  if (useHasRouter(props)) {
    return createTabItemRouter(props, tabItemClasses, tabIndex, provider, true);
  } else {
    return createTabItemLink(props, tabItemClasses, tabIndex, provider, true);
  }
}

export function useRenderTabLabel(
  props: Readonly<TTabLabelOptionProps>,
  orientation: ComputedRef<TOrientation>
): VNode[] {
  return [
    renderTabIconWithCondition(
      !Helper.isEmpty(props.icon) && ['left', 'top'].includes(props.iconPosition as string),
      props,
      props.iconSize
    ),
    props.label
      ? h(
          ['left', 'right'].includes(props.iconPosition as string) ? 'span' : 'div',
          {
            class: {
              'tab-text': true,
              flex: orientation.value === 'vertical',
              'flex-fill': orientation.value === 'vertical',
              'ms-2': props.iconPosition === 'left' && orientation.value === 'horizontal',
              'me-2': props.iconPosition === 'right' && orientation.value === 'horizontal',
              'ms-3': props.iconPosition === 'left' && orientation.value === 'vertical',
              'me-3': props.iconPosition === 'right' && orientation.value === 'vertical',
              'mt-1': props.iconPosition === 'top',
              'mb-1': props.iconPosition === 'bottom',
            },
          },
          toDisplayString(props.label)
        )
      : createCommentVNode(' v-if-TabLabel '),
    renderTabIconWithCondition(
      !Helper.isEmpty(props.icon) && ['right', 'bottom'].includes(props.iconPosition as string),
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
    iconFlip: tabPane.iconFlip,
    iconRotation: tabPane.iconRotation,
    iconPulse: tabPane.iconPulse,
    iconSpin: tabPane.iconSpin,
    iconVariant: tabPane.iconVariant,
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
  tabClasses: ComputedRef<string[]>,
  provider: TabsProvider
): VNode {
  return h(
    'div',
    {
      class: [`${cssPrefix}tabs`, 'row', 'flex-fill', 'mx-0 px-0'],
      onVnodeBeforeUnmount: () => provider.unRegisterAll(),
    },
    [
      h(
        'div',
        {
          class: ['col-auto px-0'],
          style: props.tabPosition === 'right' ? { order: 2 } : null,
        },
        [
          h(
            'div',
            {
              class: tabClasses.value,
              role: 'tablist',
              'aria-orientation': 'vertical',
            },
            [
              ...provider.tabPanels.map((it, idx) => {
                return h<TBsTabItem>(BsTabItem, {
                  key: `tab-item-${idx}`,
                  ...createTabItemProps(
                    props,
                    it.props as Readonly<TTabItemOptionProps>,
                    provider,
                    idx
                  ),
                });
              }),
              slots['append-header'] && slots['append-header'](),
            ]
          ),
        ]
      ),
      h(
        'div',
        {
          class: useMergeClass(
            ['col', `${cssPrefix}tab-content`, 'overflow-hidden', 'relative'],
            props.contentClass as string | string[]
          ),
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
  window.requestAnimationFrame(() => tabOnSlidingHandler(scrollOffset, event.deltaX * -1, target));
}

function renderHorizontalTabView(
  slots: Slots,
  props: Readonly<TTabsOptionProps>,
  tabClasses: ComputedRef<string[]>,
  sliderRef: Ref<HTMLElement | undefined>,
  scrollOffset: Ref<number>,
  provider: TabsProvider
): VNode {
  return h(
    'div',
    {
      class: [`${cssPrefix}tabs`, 'flex', 'flex-col', 'flex-fill'],
      onVnodeBeforeUnmount: () => provider.unRegisterAll(),
    },
    [
      withDirectives(
        h(
          'div',
          {
            class: tabClasses.value,
            role: 'tablist',
            'aria-orientation': 'horizontal',
            style: props.tabPosition === 'bottom' ? { order: 2 } : null,
            onWheel: (evt: WheelEvent) => tabOnWheel(scrollOffset, evt, sliderRef.value),
          },
          [
            h(
              'div',
              {
                ref: sliderRef,
                class: [
                  'tab-sliding',
                  props.alignment === 'center'
                    ? 'justify-center'
                    : ['right', 'end'].includes(props.alignment as string)
                      ? 'justify-end'
                      : '',
                ],
              },
              provider.tabPanels.map((it, idx) =>
                h<TBsTabItem>(BsTabItem, {
                  key: `tab-item-${idx}`,
                  ...createTabItemProps(
                    props,
                    it.props as Readonly<TTabItemOptionProps>,
                    provider,
                    idx
                  ),
                })
              )
            ),
            slots['append-header'] && slots['append-header'](),
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
          class: useMergeClass(
            [`${cssPrefix}tab-content`, 'overflow-hidden', 'relative'],
            props.contentClass as string | string[]
          ),
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
  tabClasses: ComputedRef<string[]>,
  sliderRef: Ref<HTMLElement | undefined>,
  scrollOffset: Ref<number>,
  provider: TabsProvider
): VNode {
  if (orientation.value === 'vertical') {
    return renderVerticalTabView(slots, props, tabClasses, provider);
  } else {
    return renderHorizontalTabView(slots, props, tabClasses, sliderRef, scrollOffset, provider);
  }
}
