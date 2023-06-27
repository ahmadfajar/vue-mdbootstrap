import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { cssPrefix, useSimpleRenderWithSlots } from '../../mixins/CommonApi';
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

        return () => useSimpleRenderWithSlots(
            'hr', undefined,
            [
                `${cssPrefix}divider`,
                props.dark ? 'divider--dark' : 'divider--light'
            ], {
                marginLeft: props.leftIndent ? Helper.cssUnit(thisProps.leftIndent) : null,
                marginRight: props.rightIndent ? Helper.cssUnit(thisProps.rightIndent) : null,
                height: props.thickness ? Helper.cssUnit(thisProps.thickness) : null,
            })
    }
});
