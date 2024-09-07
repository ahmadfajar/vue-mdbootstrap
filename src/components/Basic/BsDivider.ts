import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanProp, validStringOrNumberProp } from '../../mixins/CommonProps';
import Helper from '../../utils/Helper';
import type { TBsDivider, TDividerOptionProps } from './types';

export default defineComponent<TBsDivider>({
    name: 'BsDivider',
    props: {
        dark: booleanProp,
        leftIndent: validStringOrNumberProp,
        rightIndent: validStringOrNumberProp,
        thickness: validStringOrNumberProp,
    },
    setup(props) {
        const thisProps = props as Readonly<TDividerOptionProps>;

        return () =>
            useRenderSlotDefault(
                'hr',
                undefined,
                [`${cssPrefix}divider`, thisProps.dark ? 'divider--dark' : 'divider--light'],
                {
                    marginLeft: thisProps.leftIndent
                        ? Helper.cssUnit(thisProps.leftIndent)
                        : undefined,
                    marginRight: thisProps.rightIndent
                        ? Helper.cssUnit(thisProps.rightIndent)
                        : undefined,
                    height: thisProps.thickness ? Helper.cssUnit(thisProps.thickness) : undefined,
                }
            );
    },
});
