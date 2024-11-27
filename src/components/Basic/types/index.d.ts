import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps
} from 'vue';
import { TSizeOptionProps } from '../../../types';

export declare type TDividerOptionProps = {
    /**
     * Set to `TRUE` when divider is placed inside element that has dark background color.
     */
    dark?: boolean;
    /**
     * Indentation from left side.
     */
    leftIndent?: string | number;
    /**
     * Indentation from right side.
     */
    rightIndent?: string | number;
    /**
     * Divider thickness.
     */
    thickness?: string | number;
}

export declare type TImageHolderOptionProps = TSizeOptionProps & {
    /**
     * Create this component with circle shape.
     */
    circle?: boolean;
    /**
     * Create this component with rounded shape.
     */
    rounded?: boolean;
    /**
     * This component's background color, must be in html hex coloring number.
     */
    bgColor?: string;
    /**
     * This component's text color, must be in html hex coloring number.
     */
    textColor?: string;
    /**
     * @deprecated
     * Use `placeholderText` instead.
     */
    placeHolder?: string;
    /**
     * Short text as placeholder.
     */
    placeholderText?: string;
    /**
     * Text placeholder X position.
     */
    xPos?: string | number;
    /**
     * Text placeholder Y position.
     */
    yPos?: string | number;
}

export declare type TSpacerOptionProps = {
    /**
     * Sets this component to fill the available space or not.
     */
    fill?: boolean;
    /**
     * Sets this component width.
     */
    width?: string | number;
}

export declare type TSubheaderOptionProps = {
    /**
     * Define explicitly when placed inside element that has dark background color.
     */
    dark?: boolean;
}

export declare type TBsDivider = ComponentObjectPropsOptions<TDividerOptionProps>;

export declare type TBsImageHolder = ComponentObjectPropsOptions<TImageHolderOptionProps>;

export declare type TBsSpacer = ComponentObjectPropsOptions<TSpacerOptionProps>;

export declare type TBsSubheader = ComponentObjectPropsOptions<TSubheaderOptionProps>;

export declare const BsDivider: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TDividerOptionProps;
    };
};

export declare const BsImageHolder: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TImageHolderOptionProps;
    };
};

export declare const BsSpacer: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TSpacerOptionProps;
    };
};

export declare const BsSubheader: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TSubheaderOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsBasicCmpPlugin: ObjectPlugin;
