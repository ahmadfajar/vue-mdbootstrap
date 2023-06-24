import type { ComputedRef, Ref, Slots, VNode } from "vue";
import { getCurrentInstance, h, nextTick, withDirectives } from "vue";
import { Resize } from "../../../directives/Resize";
import { cssPrefix, useFindParentCmp } from "../../../mixins/CommonApi";
import type { IComponentInstance, TAppContainerOptionProps, TAppbarOptionProps, TRecord, TVueMdb } from "../../../types";

export function useAppbarStyles(
    props: Readonly<TAppbarOptionProps>,
    appId: Ref<string | undefined>,
    vueMdb: Ref<TVueMdb | undefined>,
    isMobile: Ref<boolean>,
): TRecord {
    const zeroPx = "0px";
    return {
        marginLeft: isMobile.value
            ? zeroPx
            : (
                (props.clippedLeft && appId.value)
                    ? (vueMdb.value?.app[appId.value].leftSideDrawerWidth || 0) + 'px'
                    : zeroPx
            ),
        marginRight: isMobile.value
            ? zeroPx
            : (
                (props.clippedRight && appId.value)
                    ? (vueMdb.value?.app[appId.value].rightSideDrawerWidth || 0) + 'px'
                    : zeroPx
            ),
    }
}

export function useAppbarOnMountedHook(
    appId: Ref<string | undefined>,
    vueMdb: Ref<TVueMdb | undefined>,
    smoothTransition: Ref<boolean>,
): void {
    const instance = getCurrentInstance();
    vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;
    const parent = useFindParentCmp(["bs-app-container", "BsAppContainer"], instance, 3);

    if (parent) {
        nextTick().then(() => {
            appId.value = (<Readonly<TAppContainerOptionProps>>parent.props).id;

            if (appId.value && vueMdb.value) {
                const rect = (<HTMLElement>(<IComponentInstance>instance).ctx.$el).getBoundingClientRect();
                vueMdb.value.app[appId.value].appbarHeight = rect.height;
            }
        });
    } else {
        console.warn("<BsAppbar> must be used inside <BsAppContainer>");
    }
    smoothTransition.value = true;
}

export function useRenderAppbar(
    props: Readonly<TAppbarOptionProps>,
    appId: Ref<string | undefined>,
    vueMdb: Ref<TVueMdb | undefined>,
    styles: ComputedRef<TRecord>,
    smoothTransition: Ref<boolean>,
    slots: Slots,
    resizeHandler: (node: VNode) => void,
): VNode {
    return withDirectives(
        h(props.tag || "nav", {
            class: {
                [`${cssPrefix}appbar`]: true,
                [`${cssPrefix}appbar-shadow`]: props.shadow,
                [`${cssPrefix}appbar-transition`]: smoothTransition.value,
                "sticky-top": props.fixedTop
            },
            style: styles.value,
        }, [
            h("div", {
                class: `${cssPrefix}appbar-content`
            }, slots.default && slots.default()),
        ]), [
        [Resize, resizeHandler]
    ]
    )
}
