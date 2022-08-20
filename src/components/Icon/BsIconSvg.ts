import {defineComponent} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp} from "../../mixins/CommonProps";
import {flip, iconName, rotate} from "./mixins/SvgProps";
import {height, width} from "./mixins/IconApi";
import {findIcon, useGoogleIcon, useRenderSvgIcon} from "./mixins/SvgApi";
import {TIconData} from "./types";

export default defineComponent({
    name: "BsIconSvg",
    props: {
        /**
         * The SVG icon’s name.
         * @type {string}
         */
        icon: iconName,
        /**
         * The SVG icon’s height in pixel.
         * @type {number}
         */
        height,
        /**
         * The SVG icon’s width in pixel.
         * @type {number}
         */
        width,
        /**
         * Apply **pulse** animation to the icon.
         * @type {boolean}
         */
        pulse: booleanProp,
        /**
         * Apply **spin** animation to the icon.
         * @type {boolean}
         */
        spin: booleanProp,
        /**
         * Flip the SVG icon, valid values are: `horizontal`, `vertical`, `both`.
         * @type {string}
         */
        flip,
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         * @type {number}
         */
        rotate,
    },
    data: () => ({
        svgIcon: undefined as TIconData | undefined,
    }),
    computed: {
        iconData(): TIconData | undefined {
            return findIcon(this.icon);
        },
        svgClasses() {
            return [
                `${cssPrefix}-svg-inline`, 'mx-auto',
                {
                    [`${cssPrefix}-spin`]: this.spin,
                    [`${cssPrefix}-pulse`]: this.pulse,
                    [`${cssPrefix}-flip-both`]: this.flip === 'both',
                    [`${cssPrefix}-flip-vertical`]: this.flip === 'vertical',
                    [`${cssPrefix}-flip-horizontal`]: this.flip === 'horizontal',
                    [`${cssPrefix}-rotate-90`]: this.rotate && parseInt(String(this.rotate), 10) === 90,
                    [`${cssPrefix}-rotate-180`]: this.rotate && parseInt(String(this.rotate), 10) === 180,
                    [`${cssPrefix}-rotate-270`]: this.rotate && parseInt(String(this.rotate), 10) === 270,
                },
            ];
        }
    },
    watch: {
        async iconData(newVal: TIconData | undefined) {
            if (newVal) {
                this.svgIcon = await useGoogleIcon(newVal);
            }
        }
    },
    async beforeMount() {
        if (this.iconData) {
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
