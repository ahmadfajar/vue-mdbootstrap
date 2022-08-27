import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TAvatarIconProps} from "../../Avatar/types";
import {TRecord} from "../../../types";

export declare type TChipOptionProps = TAvatarIconProps & {
    active?: boolean;
    activeClass?: string;
    color?: string;
    disabled?: boolean;
    dismissible?: boolean;
    href?: string;
    iconVariant?: string,
    imgSrc?: string;
    imgCircle?: boolean;
    imgPadding?: boolean;
    modelValue?: boolean;
    outlined?: boolean;
    pill?: boolean;
    rippleOff?: boolean;
    size?: string;
}

export declare type TBsChip = ComponentObjectPropsOptions<TChipOptionProps>;

export declare const BsChip: DefineComponent<TBsChip, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
