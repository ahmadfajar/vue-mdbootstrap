import type { VNode } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import BsContainer from './BsContainer';
import type { TBsContainer, TBsContent, TContainerOptionProps } from './types';

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
        const cmpProps = props as Readonly<TContainerOptionProps>;
        const contentRender = (): VNode =>
            h(
                cmpProps.tag || 'div',
                {
                    class: `${cssPrefix}content-wrap`,
                },
                slots.default && slots.default()
            );

        return () =>
            cmpProps.app
                ? h<TBsContainer>(
                      BsContainer,
                      {
                          app: props.app,
                          tag: props.tag,
                      },
                      {
                          default: () => contentRender(),
                      }
                  )
                : contentRender();
    },
});
