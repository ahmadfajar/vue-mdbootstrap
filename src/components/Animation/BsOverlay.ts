import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';
import { cssPrefix, useRenderTransition } from '../../mixins/CommonApi';
import { booleanProp, stringProp, validStringOrFloatProp, validStringOrNumberProp } from '../../mixins/CommonProps';
import { preventEventTarget } from '../../mixins/DomHelper';
import type { TBsOverlay, TRecord } from '../../types';

export default defineComponent<TBsOverlay, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsOverlay',
    props: {
        color: stringProp,
        fixed: booleanProp,
        opacity: validStringOrFloatProp,
        show: booleanProp,
        zIndex: validStringOrNumberProp,
    },
    emits: ['click'],
    setup(props, {emit, slots}) {
        const styles = computed<TRecord>(() => ({
            'opacity': props.opacity,
            'background-color': props.color,
            'position': props.fixed ? 'fixed' : null,
            'z-index': props.zIndex
        }));

        return () =>
            useRenderTransition(
                {name: 'fade'},
                props.show
                    ? h('div', {
                        class: [`${cssPrefix}overlay`],
                        style: styles.value,
                        onClick: (event: Event) => emit('click', event),
                        onTouchmove: (event: Event) => preventEventTarget(event),
                    }, slots.default && slots.default())
                    : createCommentVNode(' BsOverlay ', true)
            )
    }
});
