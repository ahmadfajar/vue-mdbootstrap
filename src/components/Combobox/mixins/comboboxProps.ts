import type {Prop} from "vue";
import {booleanProp, stringProp, validNumberGtZeroProp} from "../../../mixins/CommonProps";
import {iconPosition} from "../../Button/mixins/buttonProps";
import {inputProps, textFieldProps} from "../../Field/mixins/fieldProps";
import {validationProps} from "../../Radio/mixins/validationProps";
import {popoverDefaultTransitionProp} from "../../Popover/mixins/popoverProps";
import type {IAbstractStore, TDataListSchemaProps} from "../../../types";

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
        type: [String, Number, Object, Array],
        default: undefined,
    },
    dataSource: {
        type: Object,
        default: undefined,
    } as Prop<IAbstractStore>,
    emptyDataMessage: {
        type: String,
        default: 'No data to display.',
    },
    notFoundMessage: {
        type: String,
        default: 'Data not found.',
    },
    minSearchChars: {
        type: [String, Number],
        default: 2,
        validator: (value: string) => parseInt(value, 10) > 0
    },
    minSearchLength: {
        type: [String, Number],
        default: 15,
        validator: (value: string) => parseInt(value, 10) > 0
    },
    minimumItemsForSearch: validNumberGtZeroProp,
    multiple: booleanProp,
    listboxColor: stringProp,
    listboxMaxHeight: {
        type: [String, Number],
        default: 300,
        validator: (value: string) => parseInt(value, 10) > 0
    },
    listboxMinWidth: validNumberGtZeroProp,
    listboxDataSchema: {
        type: Object,
        default: undefined
    } as Prop<TDataListSchemaProps>,
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
