import {booleanProp, booleanTrueProp, stringProp, stringRequiredProp, tagProp} from "../../../mixins/CommonProps";

export const baseTagProps = {
    /**
     * Html tag used to render this component.
     */
    tag: tagProp
}

export const cardProps = {
    ...baseTagProps,
    /**
     * Set to `false` to remove the rounded border on the side of the Card component.
     */
    rounded: booleanTrueProp,
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
}

export const cardContentProps = {
    /**
     * Html tag used to render this component.
     */
    tag: stringProp,
    /**
     * Card content variations, valid values are: `title`, `subtitle`, `text`.
     */
    type: {
        type: String,
        default: 'text',
        validator: (value: string): boolean => ['title', 'subtitle', 'text'].includes(value)
    },
}

export const cardMediaProps = {
    /**
     * Text for media title.
     */
    title: stringRequiredProp,
    /**
     * Text for media subtitle.
     */
    subtitle: stringProp,
    /**
     * Placed text overlay at the top.
     */
    overlayTop: booleanProp,
}
