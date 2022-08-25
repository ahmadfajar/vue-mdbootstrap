import {booleanProp, stringProp} from "../../../mixins/CommonProps";
import {flip, rotate} from "../../Icon/mixins/SvgProps";

export const iconProps = {
    /**
     * Shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    icon: stringProp,
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     * @type {string}
     */
    iconFlip: flip,
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     * @type {string|number}
     */
    iconRotation: rotate,
    /**
     * Apply **spin** animation to the icon.
     * @type {boolean}
     */
    iconSpin: booleanProp,
    /**
     * Apply **pulse** animation to the icon.
     * @type {boolean}
     */
    iconPulse: booleanProp,
}
