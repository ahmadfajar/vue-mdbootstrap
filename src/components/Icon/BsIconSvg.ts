import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {findIcon, useGoogleIcon, useRenderSvgIcon} from "./mixins/svgApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {iconProps} from "./mixins/iconProps";
import {TBsIconSvg, TIconData} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsIconSvg, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsIconSvg",
    props: iconProps,
    data: () => ({
        svgIcon: (undefined as TIconData | undefined),
    }),
    computed: {
        iconData(): TIconData | undefined {
            return findIcon(this.icon as string);
        },
        svgClasses() {
            return [
                `${cssPrefix}svg-inline`, 'mx-auto',
                {
                    [`${cssPrefix}spin`]: this.spin,
                    [`${cssPrefix}pulse`]: this.pulse,
                    [`${cssPrefix}flip-both`]: this.flip === 'both',
                    [`${cssPrefix}flip-vertical`]: this.flip === 'vertical',
                    [`${cssPrefix}flip-horizontal`]: this.flip === 'horizontal',
                    [`${cssPrefix}rotate-90`]: this.rotate && parseInt(String(this.rotate), 10) === 90,
                    [`${cssPrefix}rotate-180`]: this.rotate && parseInt(String(this.rotate), 10) === 180,
                    [`${cssPrefix}rotate-270`]: this.rotate && parseInt(String(this.rotate), 10) === 270,
                },
            ];
        }
    },
    watch: {
        async iconData(newVal: TIconData | undefined) {
            if (newVal) {
                // @ts-ignore
                this.svgIcon = await useGoogleIcon(newVal);
            }
        }
    },
    async beforeMount() {
        if (this.iconData) {
            // @ts-ignore
            this.svgIcon = await useGoogleIcon(this.iconData);
        }
    },
    render() {
        return useRenderSvgIcon(
            this.svgIcon,
            parseInt(String(this.height), 10),
            parseInt(String(this.width), 10),
            this.svgClasses,
        );
    },
    // async setup(props) {
    //     watch(
    //         iconProp.icon,
    //         async (current, prev) => {
    //             // console.log("prev_icon:", prev);
    //             // console.log("current_icon:", current);
    //             iconData = findIcon(current);
    //             if (prev && iconData) {
    //                 // iconObj.value = await useGoogleIcon(iconData);
    //                 iconData = await useGoogleIcon(iconData);
    //                 console.log("iconData-watch:", iconData);
    //             }
    //         },
    //         {immediate: true},
    //     );
    //
    //     // watchEffect( async () => {
    //     //     // console.log("iconProp-watchEffect:", props.icon);
    //     //     iconData = findIcon(props.icon);
    //     //     console.log("iconData-watchEffect:", iconData);
    //     //     // if (iconData) {
    //     //     //     iconData = await useGoogleIcon(iconData);
    //     //     // }
    //     // }, {flush: "sync"});
    //
    //     if (iconData) {
    //         // console.log("iconObj-1:", iconObj.value);
    //         iconData = await useGoogleIcon(iconData);
    //     }
    //
    //     return () => useRenderSvgIcon(iconData, useSizeHeight(props), useSizeWidth(props), useSvgClasses(props));
    // },
});
