import type { TBsDivider, TDividerOptionProps } from '@/components/Basic/types';
import { cssPrefix, useRenderSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import Helper from '@/utils/Helper';
import { defineComponent } from 'vue';

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
