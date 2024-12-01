import type {
    TBreadcrumb,
    TBreadcrumbOptionProps,
    TBsBreadcrumb,
} from '@/components/Breadcrumb/types';
import { BsIcon } from '@/components/Icon';
import { cssPrefix, useHasRouter, useRenderRouter } from '@/mixins/CommonApi.ts';
import { booleanProp, stringProp } from '@/mixins/CommonProps.ts';
import Helper from '@/utils/Helper.ts';
import { defineComponent, h, type Prop, toDisplayString, type VNode } from 'vue';
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
        separator: stringProp,
        sticky: booleanProp,
        tag: {
            type: String,
            default: 'nav',
        },
    },
    setup(props) {
        const thisProps = props as Readonly<TBreadcrumbOptionProps>;

        return () => renderBreadcrumb(thisProps);
    },
});

function renderBreadcrumb(props: Readonly<TBreadcrumbOptionProps>): VNode {
    const itemCount = props.items.length > 0 ? props.items.length - 1 : 0;

    return h(
        props.tag || 'nav',
        {
            class: [`${cssPrefix}breadcrumbs`, props.sticky ? 'sticky-top' : ''],
            style: props.separator ? { '--bs-breadcrumb-divider': props.separator } : undefined,
            ariaLabel: 'breadcrumb',
        },
        [
            props.prependIcon
                ? h('div', { class: `${cssPrefix}breadcrumb-icon` }, [
                      h(BsIcon, {
                          icon: props.prependIcon as Prop<string>,
                      }),
                  ])
                : undefined,
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