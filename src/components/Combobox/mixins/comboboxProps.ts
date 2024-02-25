import type { Prop } from 'vue';
import { booleanProp, stringProp, validNumberGtZeroProp } from '../../../mixins/CommonProps';
import { iconPosition } from '../../Button/mixins/buttonProps';
import { inputProps, textFieldProps } from '../../Field/mixins/fieldProps';
import {
    emptyDataMessage,
    listboxMaxHeight,
    listboxMinSearchChars,
    listboxMinSearchLength,
    notFoundMessage,
} from '../../Listbox/mixins/listboxProps';
import { validationProps } from '../../Field/mixins/validationProps';
import { popoverDefaultTransitionProp } from '../../Popover/mixins/popoverProps';
import type { TDataSource, TLabelPosition } from '../../../types';

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
    emptyDataMessage: emptyDataMessage,
    notFoundMessage: notFoundMessage,
    minSearchChars: listboxMinSearchChars,
    minSearchLength: listboxMinSearchLength,
    minimumItemsForSearch: validNumberGtZeroProp,
    multiple: booleanProp,
    listboxColor: stringProp,
    listboxMaxHeight: listboxMaxHeight,
    listboxMinWidth: validNumberGtZeroProp,
    listboxSearchLabel: stringProp,
    popoverMaxHeight: validNumberGtZeroProp,
    popoverMinWidth: validNumberGtZeroProp,
    checkboxColor: stringProp,
    checkboxPosition: iconPosition,
    checkOptionColor: stringProp,
    checkOptionPosition: stringProp as Prop<TLabelPosition>,
    chipEnabled: booleanProp,
    chipColor: stringProp,
    chipPill: booleanProp,
    chipOutlined: booleanProp,
    itemSeparator: booleanProp,
    imageSize: validNumberGtZeroProp,
    showImage: booleanProp,
    roundedImage: booleanProp,
    circleImage: booleanProp,
    openOnHover: booleanProp,
    transition: popoverDefaultTransitionProp,
};
