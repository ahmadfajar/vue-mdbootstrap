import { booleanProp, stringOrNumberProp, stringProp } from '../../../mixins/CommonProps';

export const imageHolderProps = {
    /**
     * This component's height.
     */
    height: stringOrNumberProp,
    /**
     * This component's width.
     */
    width: stringOrNumberProp,
    /**
     * Shortcut to create this component with equal height and width.
     */
    size: stringOrNumberProp,
    /**
     * Create this component with circle shape.
     */
    circle: booleanProp,
    /**
     * Create this component with rounded shape.
     */
    rounded: booleanProp,
    /**
     * This component's background color, must be in html hex coloring number.
     */
    bgColor: {
        type: String,
        default: '#868e96',
    },
    /**
     * This component's text color, must be in html hex coloring number.
     */
    textColor: {
        type: String,
        default: '#dee2e6',
    },
    /**
     * Short text as placeholder `[deprecated]`.
     */
    placeHolder: stringProp,
    /**
     * Short text as placeholder.
     */
    placeholderText: stringProp,
    /**
     * Text placeholder X position.
     */
    xPos: {
        type: [String, Number],
        default: '50%',
    },
    /**
     * Text placeholder Y position.
     */
    yPos: {
        type: [String, Number],
        default: '50%',
    },
};
