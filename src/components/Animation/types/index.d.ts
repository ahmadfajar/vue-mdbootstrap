import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    TransitionProps,
    VNode,
    VNodeProps
} from 'vue';

export declare type TRippleOptionProps = {
    /**
     * Ripple animation state.
     */
    active?: boolean | Event;
    /**
     * Start animation from center or from mouse click position.
     * If true then animation always start from center, otherwise animation
     * will start from mouse click position.
     */
    centered?: boolean;
    /**
     * Enable or disable ripple animation.
     */
    disabled?: boolean;
    /**
     * Html tag used to render this component.
     */
    tag?: string;
}

export declare type TOverlayOptionProps = {
    /**
     * Overlay base color.
     */
    color?: string;
    /**
     * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
     */
    fixed?: boolean;
    /**
     * Overlay state, show or hide.
     */
    show?: boolean;
    /**
     * Overlay opacity.
     */
    opacity?: string | number;
    /**
     * Overlay inline-css `z-index`.
     */
    zIndex?: string | number;
}

export declare type TBsOverlay = ComponentObjectPropsOptions<TOverlayOptionProps>;

export declare type TBsRipple = ComponentObjectPropsOptions<TRippleOptionProps>;

export declare const BsExpandTransition: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TransitionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

declare type AllowedOverlayProps = AllowedComponentProps & ComponentCustomProps & VNodeProps & {
    onClick?: (e: Event) => void;
    '@click'?: (e: Event) => void;
}

export declare const BsOverlay: {
    new(): {
        $props: AllowedOverlayProps & TOverlayOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: ['click'];
    };
};

declare type AllowedRippleProps = AllowedComponentProps & ComponentCustomProps & VNodeProps & {
    'onUpdate:active'?: (value: boolean) => void;
    '@update:active'?: (value: boolean) => void;
}

export declare const BsRipple: {
    new(): {
        $props: AllowedRippleProps & TRippleOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: ['update:active'];
    };
};

export declare const BsAnimationPlugin: ObjectPlugin;
