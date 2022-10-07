import {Prop} from "vue";
import {booleanProp, stringProp} from "../../../mixins/CommonProps";

export const textFieldProps = {
    /**
     * Create this component with **flat** appearance, and removes the borders.
     * The component appearance will be styled like plain text.
     * @type {boolean}
     */
    flat: booleanProp,
    /**
     * Create this component with **filled** appearance.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     * @type {boolean}
     */
    filled: booleanProp,
    /**
     * Create this component with floating field label.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     * @type {boolean}
     */
    floatingLabel: booleanProp,
    /**
     * Create this component with **outlined** appearance.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     * @type {boolean}
     */
    outlined: booleanProp,
    /**
     * Sets auto show the clear button.
     * @type {boolean}
     */
    clearButton: booleanProp,
    /**
     * Display validation icon or not, when this field has been validated.
     * @type {boolean}
     */
    validationIcon: booleanProp,
    /**
     * Sets icon to display on inner right side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    appendIcon: stringProp,
    /**
     * Sets icon to display on outer right side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    appendIconOuter: stringProp,
    /**
     * Sets icon to display on inner left side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    prependIcon: stringProp,
    /**
     * Sets icon to display on outer left side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    prependIconOuter: stringProp,
    /**
     * Sets the action icon style variant.
     * @type {string}
     */
    actionIconVariant: {
        type: String,
        default: 'outlined',
        validator: (value: string): boolean => ["outlined", "filled", "round", "sharp"].includes(value),
    } as Prop<'outlined' | 'filled' | 'round' | 'sharp'>,
}