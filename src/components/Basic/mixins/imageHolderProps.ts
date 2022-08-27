import {booleanProp, stringOrNumberProp, stringProp} from "../../../mixins/CommonProps";

export const imageHolderProps = {
    /**
     * This component's height.
     * @type {number}
     */
    height: stringOrNumberProp,
    /**
     * This component's width.
     * @type {number}
     */
    width: stringOrNumberProp,
    /**
     * Shortcut to create this component with equal height and width.
     * @type {number}
     */
    size: stringOrNumberProp,
    /**
     * Create this component with circle shape.
     * @type {boolean}
     */
    circle: booleanProp,
    /**
     * Create this component with rounded shape.
     * @type {boolean}
     */
    rounded: booleanProp,
    /**
     * This component's background color, must be in html hex coloring number.
     * @type {string}
     */
    bgColor: {
        type: String,
        default: "#868e96"
    },
    /**
     * This component's text color, must be in html hex coloring number.
     * @type {string}
     */
    textColor: {
        type: String,
        default: "#dee2e6"
    },
    /**
     * Short text as placeholder `[deprecated]`.
     * @type {string}
     */
    placeHolder: stringProp,
    /**
     * Short text as placeholder.
     * @type {string}
     */
    placeholderText: stringProp,
    /**
     * Text placeholder X position.
     * @type {string|number}
     */
    xPos: {
        type: [String, Number],
        default: "50%"
    },
    /**
     * Text placeholder Y position.
     * @type {string|number}
     */
    yPos: {
        type: [String, Number],
        default: "50%"
    },
}
