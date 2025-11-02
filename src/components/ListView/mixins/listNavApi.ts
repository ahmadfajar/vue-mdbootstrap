import { BsRipple } from '@/components/Animation';
import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi.ts';
import { BsBadge } from '@/components/Badge';
import { BsIcon } from '@/components/Icon';
import { cssPrefix, useHasRouter, useRenderRouter } from '@/mixins/CommonApi.ts';
import type {
  IListItem,
  IListViewProvider,
  Numberish,
  TBadgeType,
  TBadgeVariant,
  TBsRipple,
  TListNavItemOptionProps,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentInternalInstance,
  ComputedRef,
  Prop,
  Ref,
  ShallowRef,
  Slots,
  VNode,
} from 'vue';
import { createCommentVNode, createTextVNode, h, toDisplayString } from 'vue';

export function useListNavItemClasses(
  props: Readonly<TListNavItemOptionProps>,
  isActive: Ref<boolean | undefined>,
  expanded: Ref<boolean>,
  hasChild: Ref<boolean>
): TRecord {
  return {
    [`${cssPrefix}nav-item`]: true,
    [`${cssPrefix}nav-parent`]: hasChild.value,
    [`${cssPrefix}expanded`]: hasChild.value && expanded.value,
    'relative w-full': true,
    'has-icon': !Helper.isEmpty(props.icon),
    active: !props.disabled && isActive.value,
    disabled: props.disabled === true,
  };
}

export function useListNavItemInnerClasses(
  props: Readonly<TListNavItemOptionProps>,
  isActive: Ref<boolean | undefined>,
  hasRouter: Ref<boolean>,
  provider?: IListViewProvider
): TRecord {
  return {
    [`${cssPrefix}nav-item-inner`]: true,
    [`${cssPrefix}tile-border-${provider?.itemBorderVariant}`]:
      provider?.itemBorderVariant &&
      !props.borderOff &&
      ['left', 'right', 'left-right', 'top', 'bottom', 'top-bottom'].includes(
        provider.itemBorderVariant
      ),
    [`${cssPrefix}tile-space-${provider?.spaceAround}`]:
      provider?.spaceAround && ['both', 'left', 'right'].includes(provider.spaceAround),
    [`${cssPrefix}link`]: !props.disabled,
    'select-none': true,
    [`${props.activeClass}`]:
      hasRouter.value && props.activeClass && !props.disabled && isActive.value,
    active: !hasRouter.value && !props.disabled && isActive.value,
    rounded: provider?.itemRounded === true && !props.roundedOff,
    'rounded-pill': provider?.itemRoundedPill === true && !provider.itemRounded && !props.pillOff,
    disabled: props.disabled === true,
  };
}

export function useNavItemContentStyles(props: Readonly<TListNavItemOptionProps>): string[] {
  const indent = 16 + (props.depth ? parseInt(props.depth as string, 10) * 20 : 0);
  const padding = props.indent
    ? Helper.cssUnit(props.indent)
    : props.depth
      ? Helper.cssUnit(indent, 'px')
      : undefined;

  return padding ? [`padding-left: ${padding}`] : [];
}

function renderNavItemContent(
  props: Readonly<TListNavItemOptionProps>,
  innerStyles: ComputedRef<string[]>,
  hasChild: Ref<boolean>,
  provider?: IListViewProvider
): VNode {
  return h<TBsRipple>(
    BsRipple,
    {
      class: {
        flex: true,
        'items-center': true,
        rounded: provider?.itemRounded === true && !props.roundedOff,
        'rounded-pill':
          provider?.itemRoundedPill === true && !provider.itemRounded && !props.pillOff,
      },
      style: innerStyles.value,
      disabled: (props.rippleOff || props.disabled) as unknown as Prop<boolean>,
    },
    {
      default: () => [
        !Helper.isEmpty(props.icon)
          ? h(BsIcon, {
              size: (props.iconSize ?? 24) as Prop<Numberish>,
              ...useCreateIconProps(props),
            })
          : createCommentVNode(' v-if-BsIcon '),
        h(
          'span',
          {
            class: [`${cssPrefix}nav-text`],
          },
          createTextVNode(toDisplayString(props.label))
        ),
        !Helper.isEmpty(props.badge)
          ? h(
              BsBadge,
              {
                class: [hasChild.value ? 'me-3' : ''],
                color: props.badgeColor as Prop<string>,
                type: props.badgeType as Prop<TBadgeType>,
                variant: props.badgeVariant as Prop<TBadgeVariant>,
              },
              {
                default: () => createTextVNode(toDisplayString(props.badge)),
              }
            )
          : createCommentVNode(' v-if-BsBadge '),
        hasChild.value
          ? h(BsIcon, { icon: 'expand_more' as Prop<string>, class: 'expand-more' })
          : createCommentVNode(' v-if-arrow '),
      ],
    }
  );
}

function onVNodeClickHandler(
  props: Readonly<TListNavItemOptionProps>,
  isActive: Ref<boolean | undefined>,
  isExpanded: Ref<boolean>,
  instance: ShallowRef<IListItem | undefined>,
  event: Event,
  provider?: IListViewProvider
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

function renderNavLink(
  props: Readonly<TListNavItemOptionProps>,
  classes: ComputedRef<TRecord>,
  innerStyles: ComputedRef<string[]>,
  isActive: Ref<boolean | undefined>,
  isExpanded: Ref<boolean>,
  hasChild: Ref<boolean>,
  instance: ShallowRef<IListItem | undefined>,
  provider?: IListViewProvider
): VNode {
  return h(
    !props.disabled ? 'a' : 'div',
    {
      class: classes.value,
      href: !props.disabled ? props.url : undefined,
      onClick: (evt: Event) =>
        onVNodeClickHandler(props, isActive, isExpanded, instance, evt, provider),
    },
    [renderNavItemContent(props, innerStyles, hasChild, provider)]
  );
}

function renderRouterLink(
  props: Readonly<TListNavItemOptionProps>,
  classes: ComputedRef<TRecord>,
  innerStyles: ComputedRef<string[]>,
  isActive: Ref<boolean | undefined>,
  isExpanded: Ref<boolean>,
  hasChild: Ref<boolean>,
  instance: ShallowRef<IListItem | undefined>,
  provider?: IListViewProvider
): VNode {
  return useRenderRouter(
    {
      class: classes.value,
      activeClass: props.activeClass || 'active',
      to: props.location ?? (props.pathName ? { name: props.pathName } : props.path),
      onClick: (evt: Event) =>
        onVNodeClickHandler(props, isActive, isExpanded, instance, evt, provider),
    },
    renderNavItemContent(props, innerStyles, hasChild, provider)
  );
}

export async function useAddChild(
  provider: IListViewProvider,
  parent?: ComponentInternalInstance | null,
  child?: IListItem
): Promise<void> {
  await provider.execAction(
    (it) => {
      if (parent && child && it.uid === parent.props.id) {
        child.parent = it;
        it.addChild(child);

        return it;
      }
    },
    true,
    true
  );
}

export function useRenderListNavItem(
  slots: Slots,
  props: Readonly<TListNavItemOptionProps>,
  classes: ComputedRef<TRecord>,
  innerClasses: ComputedRef<TRecord>,
  innerStyles: ComputedRef<string[]>,
  isActive: Ref<boolean | undefined>,
  isExpanded: Ref<boolean>,
  hasChild: Ref<boolean>,
  instance: ShallowRef<IListItem | undefined>,
  provider?: IListViewProvider
): VNode {
  return h(
    'li',
    {
      id: props.id,
      class: classes.value,
    },
    [
      useHasRouter(props) && !props.disabled
        ? renderRouterLink(
            props,
            innerClasses,
            innerStyles,
            isActive,
            isExpanded,
            hasChild,
            instance,
            provider
          )
        : renderNavLink(
            props,
            innerClasses,
            innerStyles,
            isActive,
            isExpanded,
            hasChild,
            instance,
            provider
          ),
      slots.default && slots.default(),
    ]
  );
}
