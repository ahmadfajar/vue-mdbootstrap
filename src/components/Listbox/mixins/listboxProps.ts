import {Prop} from "vue";
import {booleanProp, stringProp, validNumberGtZeroProp, whiteColorProp} from "../../../mixins/CommonProps";
import {iconPosition} from "../../Button/mixins/buttonProps";
import {TDataSource} from "../types";

export const listboxMinSearchChars = {
    type: [String, Number],
    default: 2,
    validator: (value: string) => parseInt(value, 10) > 0
}

export const listboxMinSearchLength = {
    type: [String, Number],
    default: 15,
    validator: (value: string) => parseInt(value, 10) > 0
}

export const listboxMaxHeight = {
    type: [String, Number],
    default: 300,
    validator: (value: string) => parseInt(value, 10) > 0
}

export const listboxProps = {
    borderless: booleanProp,
    color: whiteColorProp,
    disabled: booleanProp,
    readonly: booleanProp,
    itemSeparator: booleanProp,
    maxHeight: listboxMaxHeight,
    modelValue: {
        type: [String, Number, Array],
        default: undefined,
    },
    multiple: booleanProp,
    searchLabel: {
        type: String,
        default: 'Search...',
    },
    searchText: stringProp,
    dataSource: {
        type: Object,
        default: undefined,
    } as Prop<TDataSource>,
    emptyDataMessage: {
        type: String,
        default: 'No data to display.',
    },
    notFoundMessage: {
        type: String,
        default: 'Data not found.',
    },
    minSearchChars: listboxMinSearchChars,
    minSearchLength: listboxMinSearchLength,
    useCheckbox: booleanProp,
    checkboxColor: stringProp,
    checkboxPosition: iconPosition,
    imageSize: validNumberGtZeroProp,
    showImage: booleanProp,
    roundedImage: booleanProp,
    circleImage: booleanProp,
}
