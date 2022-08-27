import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TAvatarIconProps} from "../../Avatar/types";

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

export declare const BsChip: DefineComponent<TBsChip, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
