import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, VNode } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TBsContainer, TBsContent, TContainerOptionProps, TRecord } from '../../types';
import { baseTagProps } from '../Card/mixins/cardProps';
import BsContainer from './BsContainer';

export default defineComponent<TBsContent, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsContent',
    props: {
        app: booleanProp,
        ...baseTagProps
    },
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TContainerOptionProps>;
        const contentRender = (): VNode => h(
            cmpProps.tag ?? 'div',
            {
                class: `${cssPrefix}content-wrap`
            },
            slots.default && slots.default()
        );

        return () =>
            cmpProps.app
                ? h<TBsContainer>(
                    BsContainer,
                    {
                        app: props.app,
                        tag: props.tag
                    },
                    {
                        default: () => contentRender()
                    }
                )
                : contentRender();
    }
});
