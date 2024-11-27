import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps,
} from 'vue';
import { EventUpdateOpenProps, TSideDrawerPosition } from '../../../types';

export declare type TSideDrawerOptionProps = {
    /**
     * Sets the component colors.
     */
    color?: string;
    /**
     * Cut off the top edge of the component.
     */
    clipped?: boolean;
    /**
     * Sets the component position fixed on the left or right side even when scrolling the page.
     */
    fixedLayout?: boolean;
    /**
     * The component minimize state.
     */
    mini?: boolean;
    /**
     * The component width in pixel when on minimize state.
     */
    miniWidth?: number | string;
    /**
     * The component width in pixel when display as modal on small screen.
     */
    modalWidth?: number | string;
    /**
     * The component state, show or hide. Monitored by `v-model`.
     */
    open?: boolean;
    /**
     * The backdrop overlay color when the component is displayed as modal.
     * The value must be in hexadecimal color format.
     */
    overlayColor?: string;
    /**
     * The component position location. Valid values are: `left`, `right`.
     */
    position?: TSideDrawerPosition;
    /**
     * Add shadow effect to the component.
     */
    shadow?: boolean;
    /**
     * Html tag used to render the component.
     */
    tag?: string;
    /**
     * The component width in pixel.
     */
    width?: number | string;
};

export declare type TBsSideDrawer = ComponentObjectPropsOptions<TSideDrawerOptionProps>;

declare type AllowedSideDrawerProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps &
    EventUpdateOpenProps & {
        onResize?: (target: HTMLElement) => void;
        '@resize'?: (target: HTMLElement) => void;
    };

export declare const BsSideDrawer: {
    new (): {
        $props: AllowedSideDrawerProps & TSideDrawerOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: [
            /**
             * Fired when this component size is changed.
             */
            'resize',
            /**
             * Fired when this component state is updated.
             */
            'update:open',
        ];
    };
};

export declare const BsDrawerPlugin: ObjectPlugin;
