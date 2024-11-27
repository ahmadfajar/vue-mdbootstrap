import { BsContainer } from '@/components/Container';
import type { TBsContainer, TBsContent, TContainerOptionProps } from '@/components/Container/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { VNode } from 'vue';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsContent>({
    name: 'BsContent',
    props: {
        app: booleanProp,
        tag: {
            type: String,
            default: 'main',
        },
    },
    setup(props, { slots }) {
        const thisProps = props as Readonly<TContainerOptionProps>;
        const renderContent = (): VNode =>
            h(
                thisProps.tag || 'div',
                {
                    class: `${cssPrefix}content-wrap`,
                },
                slots.default && slots.default()
            );

        return () =>
            thisProps.app
                ? h<TBsContainer>(
                      BsContainer,
                      {
                          app: props.app,
                          tag: props.tag,
                      },
                      {
                          default: () => renderContent(),
                      }
                  )
                : renderContent();
    },
});
