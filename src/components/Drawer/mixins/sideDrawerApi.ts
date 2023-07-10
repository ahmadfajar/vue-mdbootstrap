import type { ComputedRef, Prop, Ref, Slots, VNode } from 'vue';
import { h, nextTick, Teleport, withDirectives } from 'vue';
import { Resize } from '../../../directives';
import { cssPrefix, useFindParentCmp, useRenderSlotDefault, useVueMdbService } from '../../../mixins/CommonApi';
import type {
    TAppContainerOptionProps,
    TBsOverlay,
    TEmitFn,
    TRecord,
    TSideDrawerOptionProps,
    TVueMdb
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsOverlay } from '../../Animation';

export function useSideDrawerStyles(
    props: Readonly<TSideDrawerOptionProps>,
    isMobile: Ref<boolean>,
    isOpen: Ref<boolean>,
    clipHeight: Ref<number>,
    zIndex: Ref<number>,
): TRecord {
    const zeroPx = '0px';
    const drawerWidth = (parseInt(<string>props.width) + 1) * -1;
    const properties = {
        height: props.clipped ? `calc(100% - ${clipHeight.value}px)` : undefined,
        width: Helper.cssUnit(props.width),
        marginTop: Helper.cssUnit(clipHeight.value),
        left: props.position === 'left' ? (isOpen.value ? zeroPx : Helper.cssUnit(drawerWidth)) : undefined,
        right: props.position === 'right' ? (isOpen.value ? zeroPx : Helper.cssUnit(drawerWidth)) : undefined,
        position: props.fixedLayout ? 'fixed' : undefined,
        'z-index': clipHeight.value > 0 ? (zIndex.value - 1) : undefined,
    };

    if (isMobile.value && !props.mini) {
        const slideWidth = (parseInt(<string>props.modalWidth) + 1) * -1;

        return {
            ...properties,
            height: '100%',
            width: Helper.cssUnit(props.modalWidth),
            marginTop: zeroPx,
            position: 'fixed',
            top: zeroPx,
            'z-index': zIndex.value + 1,
            left: props.position === 'left'
                ? (isOpen.value ? zeroPx : Helper.cssUnit(slideWidth)) : undefined,
            right: props.position === 'right'
                ? (isOpen.value ? zeroPx : Helper.cssUnit(slideWidth)) : undefined,
        };
    } else if (props.mini && props.miniWidth) {
        return {
            ...properties,
            width: Helper.cssUnit(props.miniWidth),
            left: props.position === 'left' ? zeroPx : undefined,
            right: props.position === 'right' ? zeroPx : undefined,
        };
    }

    return properties;
}

export function useSideDrawerOnMountedHook(
    appId: Ref<string | undefined>,
    vueMdb: Ref<TVueMdb | undefined>,
    props: Readonly<TSideDrawerOptionProps>,
    zIndex: Ref<number>,
): void {
    vueMdb.value = useVueMdbService();
    const parent = useFindParentCmp(
        ['bs-app-container', 'BsAppContainer'], 3
    );

    if (parent) {
        nextTick().then(() => {
            appId.value = (<Readonly<TAppContainerOptionProps>>parent.props).id;
            // console.log("BsSideDrawer-vueMdb:", vueMdb.value);
            if (appId.value && vueMdb.value) {
                if (props.position === 'right') {
                    vueMdb.value.app[appId.value].rightSideDrawerWidth = props.mini
                        ? (<number>props.miniWidth) : (<number>props.width);
                } else {
                    vueMdb.value.app[appId.value].leftSideDrawerWidth = props.mini
                        ? (<number>props.miniWidth) : (<number>props.width);
                }
                if (vueMdb.value.app[appId.value].appbarFixedTop) {
                    zIndex.value = 1030;
                }
            }
        })
    } else {
        console.warn('<BsSideDrawer> must be used inside <BsAppContainer>');
    }
}

export function useRenderSideDrawer(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TSideDrawerOptionProps>,
    styles: ComputedRef<TRecord>,
    appId: Ref<string | undefined>,
    isMobile: Ref<boolean>,
    isOpen: Ref<boolean>,
    zIndex: Ref<number>,
    resizeHandler: VoidFunction,
): VNode {
    return withDirectives(
        h(props.tag || 'aside', {
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
                        to: isMobile.value ? 'body' : (appId.value ? `#${appId.value}` : 'body')
                    }, h<TBsOverlay>(BsOverlay, {
                        color: props.overlayColor as Prop<string | undefined>,
                        // @ts-ignore
                        fixed: true as Prop<boolean>,
                        // @ts-ignore
                        show: (isMobile.value && isOpen.value) as Prop<boolean>,
                        zIndex: zIndex.value as Prop<number>,
                        onClick: () => {
                            isOpen.value = false;
                            emit('update:open', false);
                        }
                    })
                ),
                useRenderSlotDefault('div', slots, `${cssPrefix}side-drawer-inner`),
            ]
        ), [
            [Resize, resizeHandler]
        ]
    )
}
