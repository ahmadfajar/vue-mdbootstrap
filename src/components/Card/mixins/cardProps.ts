import {booleanProp, booleanTrueProp, stringProp, stringRequiredProp, tagProp} from "../../../mixins/CommonProps";

export const baseTagProps = {
    /**
     * Html tag used to render this component.
     * @type {string}
     */
    tag: tagProp
}

export const cardProps = {
    ...baseTagProps,
    /**
     * Set to `false` to remove the rounded border on the side of the Card component.
     * @type {boolean}
     */
    rounded: booleanTrueProp,
    /**
     * Create card with shadow on its sides.
     * @type {boolean}
     */
    shadow: booleanProp,
    /**
     * The image URL for image placed at the top of the card.
     * @type {string}
     */
    imgTopSrc: stringProp,
    /**
     * Text for the image `alt` attribute.
     * @type {string}
     */
    imgTopAlt: stringProp,
    /**
     * The image URL for image placed at the bottom of the card.
     * @type {string}
     */
    imgBottomSrc: stringProp,
    /**
     * Text for the image `alt` attribute.
     * @type {string}
     */
    imgBottomAlt: stringProp,
}

export const cardContentProps = {
    /**
     * Html tag used to render this component.
     * @type {string}
     */
    tag: stringProp,
    /**
     * Card content variations, valid values are: `title`, `subtitle`, `text`.
     * @type {string}
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
     * @type {string}
     */
    title: stringRequiredProp,
    /**
     * Text for media subtitle.
     * @type {string}
     */
    subtitle: stringProp,
    /**
     * Placed text overlay at the top.
     * @type {boolean}
     */
    overlayTop: booleanProp,
}
