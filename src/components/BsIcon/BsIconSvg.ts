import {defineComponent} from "vue";
import {booleanProp, cssPrefix} from "../../mixins/Commons";
import {flip, iconName, rotate} from "./mixins/SvgProps";
import {height, width} from "./mixins/SizeProps";
import {findIcon, useGoogleIcon, useRenderSvgIcon} from "./mixins/SvgFunc";
import {IIconData} from "./index.d";

export default defineComponent({
    name: "BsIconSvg",
    props: {
        /**
         * The SVG icon’s name.
         */
        icon: iconName,
        /**
         * The SVG icon’s height in pixel.
         */
        height,
        /**
         * The SVG icon’s width in pixel.
         */
        width,
        /**
         * Apply **pulse** animation to the icon.
         */
        pulse: booleanProp,
        /**
         * Apply **spin** animation to the icon.
         */
        spin: booleanProp,
        /**
         * Flip the SVG icon, valid values are: `horizontal`, `vertical`, `both`.
         */
        flip,
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         */
        rotate,
    },
    data: () => ({
        svgIcon: undefined as IIconData | undefined,
    }),
    computed: {
        iconData(): IIconData | undefined {
            return findIcon(this.icon);
        },
        svgClasses() {
            return [
                `${cssPrefix}-svg-inline`, 'mx-auto',
                {
                    [`${cssPrefix}-icon-spin`]: this.spin,
                    [`${cssPrefix}-icon-pulse`]: this.pulse,
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
        async iconData(newVal: IIconData | undefined) {
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
            parseInt(String(this.height)),
            parseInt(String(this.width)),
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
