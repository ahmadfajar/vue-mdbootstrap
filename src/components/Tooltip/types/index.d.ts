import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions, type ComponentPublicInstance,
    Plugin,
    VNode,
    VNodeProps,
} from 'vue';
import { TPlacementPosition } from '../../../types';

export declare type TTooltipOptionProps = {
    /**
     * Html element ID, {@link Element} instance or component instance that can trigger
     * the appearance of this tooltip.
     */
    activator?: string | Element | ComponentPublicInstance;
    /**
     * Hide tooltip arrow or not.
     */
    arrowOff?: boolean;
    /**
     * This tooltip content.
     */
    content: string;
    /**
     * Disable this tooltip and prevent it from appearing.
     */
    disabled?: boolean;
    /**
     * Value monitored by `v-model` to show or hide this tooltip programmatically.
     */
    show?: boolean;
    /**
     * This tooltip display placement.
     */
    placement?: TPlacementPosition;
    /**
     * This tooltip display width.
     */
    width?: string | number;
    /**
     * This tooltip maximum display width.
     */
    maxWidth?: string | number;
    /**
     * This tooltip inline-css 'z-index'.
     */
    zIndex?: string | number;
};

export declare type TBsTooltip = ComponentObjectPropsOptions<TTooltipOptionProps>;

declare type AllowedTooltipProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps & {
        'onUpdate:show'?: (show: boolean) => void;
        '@update:show'?: (show: boolean) => void;
    };
export declare const BsTooltip: {
    new (): {
        $props: AllowedTooltipProps & TTooltipOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: ['update:show'];
    };
};

export declare const BsTooltipPlugin: Plugin;
