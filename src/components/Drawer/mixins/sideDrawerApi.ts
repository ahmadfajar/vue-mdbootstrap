import type {ComputedRef, Prop, Ref, Slots, VNode} from "vue";
import {getCurrentInstance, h, nextTick, Teleport, withDirectives} from "vue";
import {cssPrefix, useFindParentCmp} from "../../../mixins/CommonApi";
import {BsOverlay} from "../../Animation";
import type {
    TAppContainerOptionProps,
    TBsOverlay,
    TEmitFn,
    TRecord,
    TSideDrawerOptionProps,
    TVueMdb
} from "../../../types";
import Resize from "../../../directives/Resize";
import Helper from "../../../utils/Helper";

export function useSideDrawerStyles(
    props: Readonly<TSideDrawerOptionProps>,
    isMobile: Ref<boolean>,
    isOpen: Ref<boolean>,
    clipHeight: Ref<number>,
    zIndex: number,
): TRecord {
    const zeroPx = "0px";
    const sbWidth = parseInt(<string>props.width) + 1;
    const properties = {
        width: Helper.sizeUnit(props.width),
        // height: isMobile.value ? '100vh' : (props.clipped ? `calc(100% - ${clipHeight.value}px)` : '100%'),
        transform: props.position === "right"
            ? `translateX(${Helper.sizeUnit(sbWidth)})`
            : `translateX(-${Helper.sizeUnit(sbWidth)})`,
        paddingTop: Helper.sizeUnit(clipHeight.value),
        left: props.position === "left" ? zeroPx : undefined,
        right: props.position === "right" ? zeroPx : undefined,
        position: props.fixedLayout ? "fixed" : undefined,
        "z-index": clipHeight.value > 0 ? (zIndex - 1) : undefined,
    };

    if (isMobile.value && !props.mini) {
        const slideWidth = props.position === "right"
            ? (parseInt(<string>props.modalWidth) + 1)
            : (parseInt(<string>props.modalWidth) + 1) * -1;

        return {
            ...properties,
            width: Helper.sizeUnit(props.modalWidth),
            paddingTop: zeroPx,
            position: "fixed",
            top: zeroPx,
            transform: isOpen.value ? "translateX(0px)" : `translateX(${Helper.sizeUnit(slideWidth)})`,
            "z-index": zIndex + 1,
        };
    } else if (props.mini && props.miniWidth) {
        return {
            ...properties,
            width: Helper.sizeUnit(props.miniWidth),
            transform: "translateX(0px)",
        };
    } else if (props.width && props.open) {
        return {
            ...properties,
            transform: "translateX(0px)",
        };
    }
    return properties;
}

export function useSideDrawerOnMountedHook(
    appId: Ref<string | undefined>,
    vueMdb: Ref<TVueMdb | undefined>,
    props: Readonly<TSideDrawerOptionProps>,
): void {
    const instance = getCurrentInstance();
    vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;
    const parent = useFindParentCmp(["bs-app-container", "BsAppContainer"], instance, 3);

    if (parent) {
        nextTick().then(() => {
            appId.value = (<Readonly<TAppContainerOptionProps>>parent.props).id;
            // console.log("BsSideDrawer-vueMdb:", vueMdb.value);
            if (appId.value && vueMdb.value) {
                if (props.position === "right") {
                    vueMdb.value.app[appId.value].rightSideDrawerWidth = props.mini
                        ? (<number>props.miniWidth) : (<number>props.width);
                } else {
                    vueMdb.value.app[appId.value].leftSideDrawerWidth = props.mini
                        ? (<number>props.miniWidth) : (<number>props.width);
                }
            }
        })
    } else {
        console.warn("<BsSideDrawer> must be used inside <BsAppContainer>");
    }
}

export function useRenderSideDrawer(
    props: Readonly<TSideDrawerOptionProps>,
    styles: ComputedRef<TRecord>,
    appId: Ref<string | undefined>,
    isMobile: Ref<boolean>,
    isOpen: Ref<boolean>,
    zIndex: number,
    slots: Slots,
    emit: TEmitFn,
    resizeHandler: VoidFunction,
): VNode {
    return withDirectives(
        h(props.tag || "aside", {
                class: {
                    [`${cssPrefix}side-drawer`]: true,
                    [`${cssPrefix}mini`]: props.mini,
                    [`${cssPrefix}open`]: isOpen.value,
                    [`${cssPrefix}closed`]: !isOpen.value && !props.mini,
                    [`bg-${props.color}`]: props.color,
                    shadow: props.shadow
                },
                style: styles.value,
            }, [
                h(Teleport, {
                        to: isMobile.value ? "body" : (appId.value ? `#${appId.value}` : "body")
                    }, h<TBsOverlay>(BsOverlay, {
                        color: props.overlayColor as Prop<string | undefined>,
                        // @ts-ignore
                        fixed: true as Prop<boolean>,
                        // @ts-ignore
                        show: (isMobile.value && isOpen.value) as Prop<boolean>,
                        zIndex: zIndex as Prop<number>,
                        onClick: () => {
                            isOpen.value = false;
                            emit("update:open", false);
                        }
                    })
                ),
                h("div", {
                    class: `${cssPrefix}side-drawer-inner`
                }, slots.default && slots.default())
            ]
        ), [
            [Resize, resizeHandler]
        ]
    )
}
