import { BsRipple } from '@/components/Animation';
import { type IListItem, ListItem } from '@/components/ListView/mixins/ListItem.ts';
import type { IListViewProvider } from '@/components/ListView/mixins/ListViewProvider.ts';
import type { TListTileOptionProps, TListTileTextOptionProps } from '@/components/ListView/types';
import {
  cssPrefix,
  useHasRouter,
  useRenderRouter,
  useWrapSlotDefault,
} from '@/mixins/CommonApi.ts';
import type { TClassList, TRecord } from '@/types';
import type { VNodeContext } from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type { ComputedRef, EmitFn, Ref, RendererNode, ShallowRef, Slots, VNode } from 'vue';
import { h } from 'vue';

export function useListTileClassNames(
  props: Readonly<TListTileOptionProps>,
  isActive: Ref<boolean | undefined>,
  hasLink: Ref<boolean>,
  tagName: string,
  provider?: IListViewProvider
): TRecord {
  const canActiveClass =
    (hasLink.value || props.navigable) &&
    props.activeClass &&
    !props.disabled &&
    isActive.value === true;

  return {
    [`${cssPrefix}list-tile`]: true,
    'flex relative': true,
    [`${cssPrefix}link`]: (tagName === 'a' || props.navigable) && !props.disabled,
    [`${cssPrefix}tile-border-${provider?.itemBorderVariant}`]:
      provider?.itemBorderVariant &&
      !props.borderOff &&
      ['left', 'right', 'left-right', 'top', 'bottom', 'top-bottom'].includes(
        provider.itemBorderVariant
      ),
    [`${cssPrefix}tile-space-${provider?.spaceAround}`]:
      provider?.spaceAround && ['both', 'left', 'right'].includes(provider.spaceAround),
    [`${props.activeClass}`]: canActiveClass,
    active: (hasLink.value || props.navigable) && !props.disabled && isActive.value === true,
    rounded: provider?.itemRounded === true && !props.roundedOff,
    'rounded-pill': provider?.itemRoundedPill === true && !provider.itemRounded && !props.pillOff,
    disabled: props.disabled === true,
  };
}

export declare type ListTileEventEmitter = {[key: string]: (...args: unknown[]) => void} & {
  click: (target: Event, node: RendererNode | null | undefined) => void;
  'update:active': (active: boolean) => void;
}

function createListTileElement(
  tagName: string,
  slots: Slots,
  emit: EmitFn<ListTileEventEmitter>,
  props: Readonly<TListTileOptionProps>,
  classes: ComputedRef<TRecord>,
  instance: ShallowRef<IListItem | undefined>,
  provider?: IListViewProvider
): VNode {
  return h(
    tagName,
    {
      id: props.id,
      class: classes.value,
      href: tagName === 'a' ? props.url : undefined,
      onVnodeMounted: (vNode: VNode) => {
        instance.value = new ListItem(
          props.id as string,
          'BsListTile',
          (vNode as VNodeContext).ctx,
          emit
        );
        provider?.addItem(instance.value);
      },
      onVnodeBeforeUnmount: () => instance.value && provider?.removeItem(instance.value),
      onClick: (e: Event) => {
        // console.log("tile-instance", instance.value);
        if (tagName === 'a' || props.navigable) {
          if (provider) {
            provider.activeItem = instance.value;
          }
          if (!provider || provider.config.individualState === true) {
            emit('update:active', !props.active);
          }
        }
        emit('click', e, instance.value ? instance.value.component.vnode.el : undefined);
      },
    },
    [
      h(
        BsRipple,
        {
          class: {
            relative: true,
            rounded: provider?.itemRounded === true && !props.roundedOff,
            'rounded-pill':
              provider?.itemRoundedPill === true && !provider.itemRounded && !props.pillOff,
          },
          tag: 'div',
          disabled: props.rippleOff || props.disabled || !(tagName === 'a' || props.navigable),
        },
        {
          default: () => useWrapSlotDefault('div', slots, 'flex'),
        }
      ),
    ]
  );
}

function createListTileRouterElement(
  slots: Slots,
  emit: EmitFn<ListTileEventEmitter>,
  props: Readonly<TListTileOptionProps>,
  classes: ComputedRef<TRecord>,
  instance: ShallowRef<IListItem | undefined>,
  provider?: IListViewProvider
): VNode {
  return useRenderRouter(
    {
      id: props.id,
      class: classes.value,
      activeClass: props.activeClass || 'active',
      to: props.location ?? (props.pathName ? { name: props.pathName } : props.path),
      onVnodeMounted: (vNode: VNode) => {
        instance.value = new ListItem(
          props.id as string,
          'BsListTile',
          (vNode as VNodeContext).ctx,
          emit
        );
        provider?.addItem(instance.value);
      },
      onVnodeBeforeUnmount: () => instance.value && provider?.removeItem(instance.value),
      onClick: (e: Event) => {
        if (provider) {
          provider.activeItem = instance.value;
        }
        if (!provider || provider.config.individualState === true) {
          emit('update:active', !props.active);
        }
        emit('click', e, instance.value?.component.vnode.el);
      },
    },
    [
      h(
        BsRipple,
        {
          class: {
            'flex relative': true,
            rounded: provider?.itemRounded === true && !props.roundedOff,
            'rounded-pill':
              provider?.itemRoundedPill === true && !provider.itemRounded && !props.pillOff,
          },
          tag: 'div',
          disabled: props.rippleOff || props.disabled,
        },
        {
          default: () => slots.default && slots.default(),
        }
      ),
    ]
  );
}

export function useRenderListTile(
  tagName: string,
  slots: Slots,
  emit: EmitFn<ListTileEventEmitter>,
  props: Readonly<TListTileOptionProps>,
  classes: ComputedRef<TRecord>,
  instance: ShallowRef<IListItem | undefined>,
  provider?: IListViewProvider
): VNode {
  if (useHasRouter(props) && !props.disabled) {
    return createListTileRouterElement(slots, emit, props, classes, instance, provider);
  } else {
    return createListTileElement(tagName, slots, emit, props, classes, instance, provider);
  }
}

export function useRenderListTileText(
  slots: Slots,
  props: Readonly<TListTileTextOptionProps>,
  cssClass: TClassList
): VNode {
  return !Helper.isEmpty(props.rawHtml)
    ? h('div', {
        class: cssClass,
        innerHTML: props.rawHtml,
      })
    : h(
        'div',
        {
          class: cssClass,
        },
        slots.default && slots.default()
      );
}
