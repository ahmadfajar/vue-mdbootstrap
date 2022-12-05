import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {baseTagProps} from "../Card/mixins/cardProps";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import type {TBsListTileAction, TListTileActionOptionProps, TRecord} from "../../types";


export default defineComponent<TBsListTileAction, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsListTileAction",
    props: {
        ...baseTagProps,
        /**
         * Center item inside it vertically.
         * @type {boolean}
         */
        center: booleanProp,
        /**
         * Arrange item inside it vertically.
         * @type {boolean}
         */
        stack: booleanProp,
    },
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TListTileActionOptionProps>;

        return () =>
            useSimpleRenderWithSlots(<string>props.tag, slots, {
                [`${cssPrefix}list-tile-action`]: true,
                [`${cssPrefix}action-stack`]: cmpProps.stack === true,
                "align-self-center": cmpProps.center === true,
            })
    }
});
