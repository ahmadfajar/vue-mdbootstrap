/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
  TBreadcrumb,
  TBreadcrumbOptionProps,
  TBsBreadcrumb,
} from '@/components/Breadcrumb/types';
import { BsIcon } from '@/components/Icon';
import { cssPrefix, useHasRouter, useRenderRouter, useWrapSlot } from '@/mixins/CommonApi.ts';
import { booleanProp, stringProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  Prop,
  PublicProps,
  Slots,
  SlotsType,
  VNode,
} from 'vue';
import { defineComponent, h, toDisplayString } from 'vue';
import type { RouterLinkProps } from 'vue-router';

function createItemLabel(item: TBreadcrumb, index: number, length: number): VNode {
  const routerProps = {
    location: item.location,
    path: item.path,
    pathName: item.pathName,
  };

  const itemLabelCls = [`${cssPrefix}breadcrumb-item`, 'flex', 'flex-nowrap'];

  if (index === length) {
    return h(
      'li',
      {
        class: itemLabelCls.concat('active'),
        'aria-current': 'page',
      },
      toDisplayString(item.label)
    );
  } else if (Helper.isFunction(item.handler)) {
    return h(
      'li',
      {
        class: itemLabelCls.concat(`${cssPrefix}link`),
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

    return h('li', { class: itemLabelCls }, [useRenderRouter(_props, toDisplayString(item.label))]);
  } else if (item.href) {
    return h('li', { class: itemLabelCls }, [
      h('a', { href: item.href }, toDisplayString(item.label)),
    ]);
  } else {
    return h('li', { class: itemLabelCls }, toDisplayString(item.label));
  }
}

function renderBreadcrumb(slots: Slots, props: Readonly<TBreadcrumbOptionProps>): VNode {
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
      style: props.separator
        ? { [`--${cssPrefix}breadcrumb-item-separator`]: separator }
        : undefined,
      ariaLabel: 'breadcrumb',
    },
    [
      h(
        'div',
        {
          class: [
            `${cssPrefix}breadcrumb-container`,
            'relative',
            'flex',
            'flex-nowrap',
            'items-end',
          ],
        },
        [
          useWrapSlot(
            slots,
            'icon',
            'breadcrumb-icon',
            { class: [`${cssPrefix}breadcrumb-icon`, 'inline-flex'] },
            !Helper.isEmpty(props.prependIcon)
              ? h(BsIcon, {
                  icon: props.prependIcon,
                  size: props.iconSize,
                })
              : undefined
          ),
          h(
            'ol',
            {
              class: [
                `${cssPrefix}breadcrumb-inner`,
                'relative',
                'overflow-hidden',
                'flex',
                'flex-nowrap',
                'items-center',
              ],
            },
            props.items.map((it, idx) => createItemLabel(it, idx, itemCount))
          ),
        ]
      ),
    ]
  );
}

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

    return () => renderBreadcrumb(slots, thisProps);
  },
}) as DefineComponent<
  TBsBreadcrumb,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TBreadcrumbOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsBreadcrumb>,
  SlotsType<BreadcrumbSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface BreadcrumbSlots {
  /**
   * Additional slot used to place custom icon of the Breadcrumb.
   */
  icon?: () => VNode[] | VNode;
}
