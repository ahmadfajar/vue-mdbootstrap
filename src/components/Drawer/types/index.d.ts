import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TLabelPosition, TRecord} from "../../../types";

export declare type TSideDrawerOptionProps = {
    color?: string;
    clipped?: boolean;
    mini?: boolean;
    fixedLayout?: boolean;
    miniWidth?: number | string;
    modalWidth?: number | string;
    open?: boolean;
    overlayColor?: string;
    position?: TLabelPosition | string;
    shadow?: boolean;
    tag?: string;
    width?: number | string;
}

export declare type TBsSideDrawer = ComponentObjectPropsOptions<TSideDrawerOptionProps>;

export declare const BsSideDrawer: DefineComponent<TBsSideDrawer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
