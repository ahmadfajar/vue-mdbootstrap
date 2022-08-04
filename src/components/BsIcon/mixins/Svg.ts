import {cssPrefix} from "../../../mixins/Commons";

export const iconName = {
    type: String,
    required: true
}

export const flip = {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ['horizontal', 'vertical', 'both'].includes(value),
}

export const rotate = {
    type: [String, Number],
    default: undefined,
    validator: (value: string | number): boolean => [90, 180, 270].includes(parseInt(String(value), 10))
}

export function googleIconUrl(theme: string, icon: string, version: number): string {
    return `https://fonts.gstatic.com/s/i/materialicons${theme}/${icon}/v${version}/24px.svg`;
}

export function useSvgClasses(props) {
    return [
        `${cssPrefix}-svg-inline`, 'mx-auto',
        {
            [`${cssPrefix}-icon-spin`]: props.spin,
            [`${cssPrefix}-icon-pulse`]: props.pulse,
            [`${cssPrefix}-flip-both`]: props.flip === 'both',
            [`${cssPrefix}-flip-vertical`]: props.flip === 'vertical',
            [`${cssPrefix}-flip-horizontal`]: props.flip === 'horizontal',
            [`${cssPrefix}-rotate-90`]: props.rotate && parseInt(String(props.rotate), 10) === 90,
            [`${cssPrefix}-rotate-180`]: props.rotate && parseInt(String(props.rotate), 10) === 180,
            [`${cssPrefix}-rotate-270`]: props.rotate && parseInt(String(props.rotate), 10) === 270,
        },
    ];
}
