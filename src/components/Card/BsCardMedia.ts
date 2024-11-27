import { cardMediaProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCardMedia, TCardMediaOptionProps } from '@/components/Card/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { defineComponent, h, toDisplayString } from 'vue';

export default defineComponent<TBsCardMedia>({
    name: 'BsCardMedia',
    props: cardMediaProps,
    setup(props, { slots }) {
        const thisProps = props as Readonly<TCardMediaOptionProps>;

        return () =>
            h('div', { class: [`${cssPrefix}card-media`] }, [
                slots.default && slots.default(),
                h(
                    'div',
                    {
                        class: {
                            [`${cssPrefix}card-media-overlay`]: true,
                            [`${cssPrefix}overlay-top`]: thisProps.overlayTop,
                            [`${cssPrefix}overlay-bottom`]: !thisProps.overlayTop,
                        },
                        style: {
                            top: thisProps.overlayTop ? 0 : null,
                            bottom: !thisProps.overlayTop ? 0 : null,
                        },
                    },
                    [
                        h(
                            'div',
                            { class: [`${cssPrefix}card-media-title`] },
                            toDisplayString(thisProps.title)
                        ),
                        thisProps.subtitle
                            ? h(
                                  'div',
                                  { class: [`${cssPrefix}card-media-subtitle`] },
                                  toDisplayString(thisProps.subtitle)
                              )
                            : null,
                    ]
                ),
            ]);
    },
});
