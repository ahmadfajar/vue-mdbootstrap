import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin as Plugin_1,
    VNode,
    VNodeProps
} from 'vue';
import type { EventUpdateOpenProps, TLabelPosition } from '../../../types';

export declare type TSideDrawerOptionProps = {
    color?: string;
    clipped?: boolean;
    mini?: boolean;
    fixedLayout?: boolean;
    miniWidth?: number | string;
    modalWidth?: number | string;
    open?: boolean;
    overlayColor?: string;
    position?: TLabelPosition;
    shadow?: boolean;
    tag?: string;
    width?: number | string;
}

export declare type TBsSideDrawer = ComponentObjectPropsOptions<TSideDrawerOptionProps>;

declare type AllowedSideDrawerProps = AllowedComponentProps &
    ComponentCustomProps & VNodeProps & EventUpdateOpenProps & {
    onResize?: (target: HTMLElement) => void;
}

export declare const BsSideDrawer: {
    new(): {
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

export declare const BsDrawerPlugin = Plugin_1;
