import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    onBeforeMount,
    ref,
    watch
} from "vue";
import {findIcon, useGoogleIcon, useRenderSvgIcon, useSvgClasses} from "./mixins/svgApi";
import {useSizeHeight, useSizeWidth} from "./mixins/iconApi";
import {iconProps} from "./mixins/iconProps";
import {TBsIconSvg, TIconData, TIconOptionProps, TRecord} from "../../types";

export default defineComponent<TBsIconSvg, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsIconSvg",
    props: iconProps,
    setup(props) {
        const cmpProps = props as Readonly<TIconOptionProps>;
        const svgIcon = ref<TIconData>();
        const iconData = computed<TIconData | undefined>(
            () => findIcon(<string>props.icon)
        );
        const svgClasses = computed<TRecord>(
            () => useSvgClasses(cmpProps)
        );

        watch(
            () => iconData.value,
            async (value) => {
                if (value) {
                    svgIcon.value = await useGoogleIcon(value);
                }
            }
        );
        onBeforeMount(
            async () => {
                if (iconData.value) {
                    svgIcon.value = await useGoogleIcon(iconData.value);
                }
            }
        )

        return () =>
            useRenderSvgIcon(
                svgIcon.value,
                useSizeHeight(cmpProps),
                useSizeWidth(cmpProps),
                svgClasses.value,
            )
    }
});
