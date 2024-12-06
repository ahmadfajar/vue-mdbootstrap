import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps,
} from 'vue';
import { RouterLinkProps } from 'vue-router';

export declare type TBreadcrumb = {
    /**
     * This breadcrumb item label.
     */
    label: string;
    /**
     * Properties of `<RouterLink>` component when using [vue-router](https://router.vuejs.org/).
     */
    location?: RouterLinkProps;
    /**
     * Absolute or relative URL if not using [vue-router](https://router.vuejs.org/).
     */
    href?: string;
    /**
     * Shortcut to create properties of `<RouterLink>` component by using the route's path only
     * when using [vue-router](https://router.vuejs.org/).
     */
    path?: string;
    /**
     * Shortcut to create properties of `<RouterLink>` component by using the route's name only
     * when using [vue-router](https://router.vuejs.org/).
     */
    pathName?: string;
    /**
     * The breadcrumb item's handler that will handle the `onClick` event.
     *
     * `handler`, `location`, `pathName`, `path` and `href` properties can't be mixed together.
     * If all or some of the properties is defined, then `handler` will take priority.
     *
     * The priorities are sorted as follows:
     * 1. `handler` (highest priority),
     * 2. `location`,
     * 3. `pathName`,
     * 4. `path`,
     * 5. `href` (lowest priority).
     */
    handler?: VoidFunction;
};

export declare type TBreadcrumbOptionProps = {
    /**
     * The data-source to build the breadcrumbs.
     */
    items: TBreadcrumb[];
    /**
     * Prepend an icon before the first breadcrumb item label.
     *
     * Use android's icon name with suffix: `_outlined`, `_rounded`, `_sharp`, `_filled`,
     * `_outlined_filled`, `_rounded_filled`, or `_sharp_filled`. Suffix `_filled`
     * and `_outlined_filled` will result the same icon style.
     *
     * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    prependIcon?: string;
    /**
     * The size of `prependIcon` to create.
     */
    iconSize?: string | number;
    /**
     * Change the default breadcrumb item's separator.
     */
    separator?: string;
    /**
     * If `true`, the breadcrumb will be positioned using sticky-top.
     */
    sticky?: boolean;
    /**
     * Change the default HTML tag to render the breadcrumb container.
     * `<nav>` is the default HTML tag to create the breadcrumb container.
     */
    tag?: string;
};

export declare type TBsBreadcrumb = ComponentObjectPropsOptions<TBreadcrumbOptionProps>;

export declare const BsBreadcrumb: {
    new (): {
        $props: TBreadcrumbOptionProps & AllowedComponentProps & ComponentCustomProps & VNodeProps;
        $slots: {
            icon?: () => VNode;
        };
    };
};

export declare const BsBreadcrumbPlugin: ObjectPlugin;
