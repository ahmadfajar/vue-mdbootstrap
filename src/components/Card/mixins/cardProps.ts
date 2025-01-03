import type { TCardContentType } from '@/components/Card/types';
import { booleanProp, stringMandatoryProp, stringProp, tagProp } from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const baseTagProps = {
    /**
     * Html tag used to render this component.
     */
    tag: tagProp,
};

export const cardProps = {
    ...baseTagProps,
    /**
     * Set to `true` to remove the side border of the Card component.
     */
    borderOff: booleanProp,
    /**
     * Set to `true` to remove the rounded border on the side of the Card component.
     */
    roundedOff: booleanProp,
    /**
     * Create card with shadow on its sides.
     */
    shadow: booleanProp,
    /**
     * The image URL for image placed at the top of the card.
     */
    imgTopSrc: stringProp,
    /**
     * Text for the image `alt` attribute.
     */
    imgTopAlt: stringProp,
    /**
     * The image URL for image placed at the bottom of the card.
     */
    imgBottomSrc: stringProp,
    /**
     * Text for the image `alt` attribute.
     */
    imgBottomAlt: stringProp,
};

export const cardContentProps = {
    /**
     * Html tag used to render this component.
     */
    tag: stringProp as Prop<string>,
    /**
     * Card content variations, valid values are: `title`, `subtitle`, `text`.
     */
    type: {
        type: String,
        default: 'text',
        validator: (value: string): boolean => ['title', 'subtitle', 'text'].includes(value),
    } as Prop<TCardContentType>,
};

export const cardMediaProps = {
    /**
     * Text for media title.
     */
    title: stringMandatoryProp,
    /**
     * Text for media subtitle.
     */
    subtitle: stringProp,
    /**
     * Placed text overlay at the top.
     */
    overlayTop: booleanProp,
};
