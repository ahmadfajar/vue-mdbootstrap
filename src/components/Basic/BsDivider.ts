import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanProp, validStringOrNumberProp } from '../../mixins/CommonProps';
import type { TBsDivider, TDividerOptionProps, TRecord } from '../../types';
import Helper from '../../utils/Helper';

export default defineComponent<TBsDivider, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsDivider',
    props: {
        dark: booleanProp,
        leftIndent: validStringOrNumberProp,
        rightIndent: validStringOrNumberProp,
        thickness: validStringOrNumberProp,
    },
    setup(props) {
        const thisProps = props as Readonly<TDividerOptionProps>;

        return () => useRenderSlotDefault(
            'hr', undefined,
            [
                `${cssPrefix}divider`,
                thisProps.dark ? 'divider--dark' : 'divider--light'
            ], {
                marginLeft: thisProps.leftIndent ? Helper.cssUnit(thisProps.leftIndent) : undefined,
                marginRight: thisProps.rightIndent ? Helper.cssUnit(thisProps.rightIndent) : undefined,
                height: thisProps.thickness ? Helper.cssUnit(thisProps.thickness) : undefined,
            })
    }
});
