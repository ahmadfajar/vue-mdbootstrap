import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import type { TPositionType } from '../../../types';

export declare type TTooltipOptionProps = {
    /**
     * This tooltip content.
     */
    content: string;
    /**
     * Put this tooltip into disable state.
     */
    disabled?: boolean;
    /**
     * Value monitored by `v-model` to show or hide this tooltip programmatically.
     */
    show?: boolean;
    /**
     * This tooltip display placement.
     */
    placement?: TPositionType;
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
}

export declare type TBsTooltip = ComponentObjectPropsOptions<TTooltipOptionProps>;

declare type AllowedTooltipProps = AllowedComponentProps &
    ComponentCustomProps & VNodeProps & {
    'onUpdate:show'?: (show: boolean) => void;
}
export declare const BsTooltip: {
    new(): {
        $props: AllowedTooltipProps & TTooltipOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: ['update:show'];
    };
};

export declare const BsTooltipPlugin: {
    new(): Plugin;
};
