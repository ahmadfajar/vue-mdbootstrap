import {ComputedRef, getCurrentInstance, h, Prop, Ref, Slots, Teleport, VNode, withDirectives} from "vue";
import {cssPrefix, useFindParentCmp} from "../../../mixins/CommonApi";
import {BsOverlay} from "../../Animation";
import {TAppContainerOptionProps, TBsOverlay, TRecord, TSideDrawerOptionProps, TVueMdb} from "../../../types";
import Resize from "../../../directives/Resize";
import Helper from "../../../utils/Helper";

export function useSideDrawerClasses(props: Readonly<TSideDrawerOptionProps>): TRecord {
    return {
        [`${cssPrefix}side-drawer`]: true,
        [`${cssPrefix}mini`]: props.mini,
        [`${cssPrefix}open`]: props.open,
        [`${cssPrefix}closed`]: !props.open && !props.mini,
        [`${cssPrefix}shadow`]: props.shadow,
        [`bg-${props.color}`]: props.color
    }
}

export function useSideDrawerStyles(
    props: Readonly<TSideDrawerOptionProps>,
    isMobile: Ref<boolean>,
    clipHeight: Ref<number>,
    zIndex: number,
): TRecord {
    const properties = {
        width: Helper.sizeUnit(props.width),
        height: isMobile.value ? '100vh' : (props.clipped ? `calc(100vh - ${clipHeight.value}px)` : '100vh'),
        transform: `translateX(-${props.width ? Helper.sizeUnit(props.width) : '0px'})`,
    };

    if (isMobile.value && props.open) {
        return {
            ...properties,
            height: '100vh',
            width: Helper.sizeUnit(props.modalWidth),
            transform: 'translateX(0px)',
            'z-index': zIndex + 1,
        };
    } else if (props.mini && props.miniWidth) {
        return {
            ...properties,
            width: Helper.sizeUnit(props.miniWidth),
            transform: 'translateX(0px)',
            'margin-top': Helper.sizeUnit(clipHeight.value),
        };
    } else if (props.width && props.open) {
        return {
            ...properties,
            transform: 'translateX(0px)',
            'margin-top': Helper.sizeUnit(clipHeight.value),
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
    // console.log("instance:", instance);
    vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;
    const parent = useFindParentCmp(["bs-app-container", "BsAppContainer"], instance, 3);

    if (parent) {
        appId.value = (<Readonly<TAppContainerOptionProps>>parent.props).id;
        if (appId.value && vueMdb.value) {
            if (props.position === "right") {
                vueMdb.value.app[appId.value].rightSideDrawerWidth = (<number>props.width) || 0;
            } else {
                vueMdb.value.app[appId.value].leftSideDrawerWidth = (<number>props.width) || 0;
            }
        }
    } else {
        console.warn("<bs-side-drawer> must be used inside <bs-app-container>");
    }
}

export function useRenderSideDrawer(
    props: Readonly<TSideDrawerOptionProps>,
    classNames: ComputedRef<TRecord>,
    styles: ComputedRef<TRecord>,
    appId: Ref<string | undefined>,
    isMobile: Ref<boolean>,
    slots: Slots,
    resizeHandler: (node: VNode) => void,
): VNode {
    return withDirectives(
        h(props.tag || "aside", {
                class: classNames.value,
                style: styles.value,
            }, [
                h(Teleport, {
                        to: appId.value ? `#${appId.value}` : 'body'
                    }, h<TBsOverlay>(BsOverlay, {
                        color: props.overlayColor as Prop<string | undefined>,
                        show: (isMobile.value && props.open) as Prop<boolean>,
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
