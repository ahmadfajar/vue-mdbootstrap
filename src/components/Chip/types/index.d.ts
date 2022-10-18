import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TAvatarIconProps, TRecord} from "../../../types";

export declare type TChipValue = {
    id: string;
    text: string;
    value?: string | number | boolean;
}

export declare type TChipContainer = {
    contentId: string;
    contentWidth: number;
    wrapperId: string;
    wrapperWidth: number;
}

export declare type TChipOptionItem = TAvatarIconProps & {
    id?: string;
    disabled?: boolean;
    dismissible?: boolean;
    imgSrc?: string;
    iconVariant?: string,
    href?: string;
    text: string;
    value?: string | number | boolean;
}

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

export declare type TChipGroupOptionProps = {
    activeClass?: string;
    color?: string;
    checkedIcon?: boolean;
    column?: boolean;
    imgCircle?: boolean;
    imgPadding?: boolean;
    items: Array<TChipOptionItem>;
    modelValue?: TChipValue | Array<TChipValue>;
    multiple?: boolean;
    outlined?: boolean;
    pill?: boolean;
    size?: string;
    sliderButton?: boolean;
    sliderButtonColor?: string;
}

export declare type TBsChip = ComponentObjectPropsOptions<TChipOptionProps>;

export declare type TBsChipGroup = ComponentObjectPropsOptions<TChipGroupOptionProps>;

export declare const BsChip: DefineComponent<TBsChip, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsChipGroup: DefineComponent<TBsChipGroup, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
