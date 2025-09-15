import type {
  TBreadcrumb,
  TBreadcrumbOptionProps,
  TBsBreadcrumb,
} from '@/components/Breadcrumb/types';
import { BsIcon } from '@/components/Icon';
import type { TBsIcon } from '@/components/Icon/types';
import { cssPrefix, useHasRouter, useRenderRouter, useWrapSlot } from '@/mixins/CommonApi.ts';
import { booleanProp, stringProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import Helper from '@/utils/Helper.ts';
import { defineComponent, h, type Prop, type Slots, toDisplayString, type VNode } from 'vue';
import type { RouterLinkProps } from 'vue-router';

export default defineComponent<TBsBreadcrumb>({
  name: 'BsBreadcrumb',
  props: {
    items: {
      type: Array,
      default: undefined,
      required: true,
    } as Prop<TBreadcrumb[]>,
    prependIcon: stringProp,
    iconSize: validStringOrNumberProp,
    separator: stringProp,
    sticky: booleanProp,
    tag: {
      type: String,
      default: 'nav',
    },
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TBreadcrumbOptionProps>;

    return () => renderBreadcrumb(thisProps, slots);
  },
});

function renderBreadcrumb(props: Readonly<TBreadcrumbOptionProps>, slots: Slots): VNode {
  const itemCount = props.items.length > 0 ? props.items.length - 1 : 0;
  let separator: string;

  if (props.separator && props.separator.startsWith('url')) {
    separator = decodeURI(props.separator).replaceAll('#', '%23');
  } else {
    separator = `'${props.separator}'`;
  }

  return h(
    props.tag || 'nav',
    {
      class: [`${cssPrefix}breadcrumb`, props.sticky ? 'sticky-top' : ''],
      style: props.separator ? { '--bs-breadcrumb-divider': separator } : undefined,
      ariaLabel: 'breadcrumb',
    },
    [
      useWrapSlot(
        slots,
        'icon',
        'breadcrumb-icon',
        { class: `${cssPrefix}breadcrumb-icon` },
        !Helper.isEmpty(props.prependIcon)
          ? h<TBsIcon>(BsIcon, {
              icon: props.prependIcon as Prop<string>,
              size: props.iconSize as Prop<string | number>,
            })
          : undefined
      ),
      h(
        'ol',
        { class: 'breadcrumb' },
        props.items.map((it, idx) => createItemLabel(it, idx, itemCount))
      ),
    ]
  );
}

function createItemLabel(item: TBreadcrumb, index: number, length: number): VNode {
  const routerProps = {
    location: item.location,
    path: item.path,
    pathName: item.pathName,
  };

  if (index === length) {
    return h(
      'li',
      {
        class: ['breadcrumb-item', 'active'],
        'aria-current': 'page',
      },
      toDisplayString(item.label)
    );
  } else if (Helper.isFunction(item.handler)) {
    return h(
      'li',
      {
        class: ['breadcrumb-item', `${cssPrefix}link`],
        onClick: item.handler(),
      },
      toDisplayString(item.label)
    );
  } else if (useHasRouter(routerProps) && (item.location || item.pathName || item.path)) {
    const _props =
      item.location ||
      ({
        to: item.pathName ? { name: item.pathName } : item.path,
      } as RouterLinkProps);

    return h('li', { class: 'breadcrumb-item' }, [
      useRenderRouter(_props, toDisplayString(item.label)),
    ]);
  } else if (item.href) {
    return h('li', { class: 'breadcrumb-item' }, [
      h('a', { href: item.href }, toDisplayString(item.label)),
    ]);
  } else {
    return h('li', { class: 'breadcrumb-item' }, toDisplayString(item.label));
  }
}
