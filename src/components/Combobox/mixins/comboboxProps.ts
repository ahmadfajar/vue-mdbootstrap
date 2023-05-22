import type {Prop} from "vue";
import {booleanProp, stringProp, validNumberGtZeroProp} from "../../../mixins/CommonProps";
import {iconPosition} from "../../Button/mixins/buttonProps";
import {inputProps, textFieldProps} from "../../Field/mixins/fieldProps";
import {listboxMaxHeight, listboxMinSearchChars, listboxMinSearchLength} from "../../Listbox/mixins/listboxProps";
import {validationProps} from "../../Radio/mixins/validationProps";
import {popoverDefaultTransitionProp} from "../../Popover/mixins/popoverProps";
import type {TDataSource} from "../../../types";

export const comboboxProps = {
    ...inputProps,
    ...textFieldProps,
    ...validationProps,
    autofocus: booleanProp,
    placeholder: stringProp,
    parentValue: {
        type: [String, Number],
        default: undefined,
    },
    modelValue: {
        type: [String, Number, Array],
        default: undefined,
    },
    dataSource: {
        type: Object,
        default: undefined,
    } as Prop<TDataSource>,
    emptyDataMessage: stringProp,
    notFoundMessage: stringProp,
    minSearchChars: listboxMinSearchChars,
    minSearchLength: listboxMinSearchLength,
    minimumItemsForSearch: validNumberGtZeroProp,
    multiple: booleanProp,
    listboxColor: stringProp,
    listboxMaxHeight: listboxMaxHeight,
    listboxMinWidth: validNumberGtZeroProp,
    popoverMaxHeight: validNumberGtZeroProp,
    popoverMinWidth: validNumberGtZeroProp,
    checkOptionColor: {
        type: String,
        default: 'purple'
    },
    checkOptionPosition: iconPosition,
    chipEnabled: booleanProp,
    chipColor: stringProp,
    chipPill: booleanProp,
    chipOutlined: booleanProp,
    itemSeparator: booleanProp,
    imageSize: validNumberGtZeroProp,
    showImage: booleanProp,
    roundedImage: booleanProp,
    circleImage: booleanProp,
    transition: popoverDefaultTransitionProp,
    valueAsObject: booleanProp,
}
