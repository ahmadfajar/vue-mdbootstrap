import type { ComputedRef, Prop, Ref, Slots, VNode } from 'vue';
import { h, mergeProps, nextTick, Teleport, withDirectives } from 'vue';
import { Resize } from '../../../directives';
import {
    cssPrefix,
    useFindParentCmp,
    useRenderSlotDefault,
    useVueMdbService,
} from '../../../mixins/CommonApi';
import type {
    TAppContainerOptionProps,
    TEmitFn,
    TRecord,
    TSideDrawerOptionProps,
    TSideDrawerPosition,
    TVueMdb,
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsOverlay } from '../../Animation';

export function useSideDrawerStyles(
    props: Readonly<TSideDrawerOptionProps>,
    isMobile: Ref<boolean>,
    isOpen: Ref<boolean>,
    clipHeight: ComputedRef<number>,
    zIndex: Ref<number>
): TRecord {
    const zeroPx = '0px';
    const drawerWidth1 = (parseInt(props.width as string) + 1) * -1;
    const properties = {
        height: props.clipped ? `calc(100% - ${clipHeight.value}px)` : undefined,
        width: Helper.cssUnit(props.width),
        marginTop: Helper.cssUnit(clipHeight.value),
        left:
            props.position === 'left'
                ? isOpen.value
                    ? zeroPx
                    : Helper.cssUnit(drawerWidth1)
                : undefined,
        right:
            props.position === 'right'
                ? isOpen.value
                    ? zeroPx
                    : Helper.cssUnit(drawerWidth1)
                : undefined,
        position: props.fixedLayout ? 'fixed' : 'absolute',
        'z-index': clipHeight.value > 0 ? zIndex.value - 1 : undefined,
    };

    if (isMobile.value && !props.mini) {
        const drawerWidth2 = (parseInt(props.modalWidth as string) + 1) * -2;

        return {
            ...properties,
            height: '100%',
            width: Helper.cssUnit(props.modalWidth),
            marginTop: zeroPx,
            position: 'fixed',
            top: zeroPx,
            'z-index': zIndex.value + 1,
            left:
                props.position === 'left'
                    ? isOpen.value
                        ? zeroPx
                        : Helper.cssUnit(drawerWidth2)
                    : undefined,
            right:
                props.position === 'right'
                    ? isOpen.value
                        ? zeroPx
                        : Helper.cssUnit(drawerWidth2)
                    : undefined,
        };
    } else if (props.mini && props.miniWidth) {
        return {
            ...properties,
            width: isOpen.value ? Helper.cssUnit(props.width) : Helper.cssUnit(props.miniWidth),
            left: props.position === 'left' ? zeroPx : undefined,
            right: props.position === 'right' ? zeroPx : undefined,
        };
    }

    return properties;
}

export function useSideDrawerProps(
    props: Readonly<TSideDrawerOptionProps>,
    vueMdb: TVueMdb,
    appId: string,
    isMobile: boolean,
    stateOpen: boolean
): void {
    const position: TSideDrawerPosition = props.position === 'right' ? 'right' : 'left';
    vueMdb.app[appId].sideDrawer[position].open = stateOpen;
    vueMdb.app[appId].sideDrawer[position].mini = props.mini as boolean;
    vueMdb.app[appId].sideDrawer[position].miniWidth = parseInt(props.miniWidth as string, 10);

    if (stateOpen) {
        vueMdb.app[appId].sideDrawer[position].width =
            !isMobile || props.mini ? parseInt(props.width as string, 10) : 0;
    } else {
        vueMdb.app[appId].sideDrawer[position].width = props.mini
            ? parseInt(props.miniWidth as string, 10)
            : 0;
    }
}

export function useOnMountedSideDrawer(
    appId: Ref<string | undefined>,
    vueMdb: Ref<TVueMdb | undefined>,
    zIndex: Ref<number>
): void {
    vueMdb.value = useVueMdbService();
    const parent = useFindParentCmp(['bs-app', 'bs-app-container', 'BsApp', 'BsAppContainer'], 3);

    if (parent) {
        nextTick().then(() => {
            appId.value = (parent.props as Readonly<TAppContainerOptionProps>).id;

            if (appId.value && vueMdb.value) {
                // Iterate VueMdb context and find if there is an appbar that positioned always on-top.
                // If found then set starting z-index to 1030, so it can be placed above appbar layer
                // displayed on small-screen.
                Object.keys(vueMdb.value.app).forEach((it: string) => {
                    if (vueMdb.value?.app[it].appbar.fixedTop) {
                        zIndex.value = 1030;
                        return;
                    }
                });
            }
        });
    } else {
        console.warn('<BsSideDrawer> must be used inside <BsApp>');
    }
}

function createOverlay(
    props: Readonly<TSideDrawerOptionProps>,
    zIndex: Ref<number>,
    isOpen: Ref<boolean>,
    emit: TEmitFn
): VNode {
    return h(BsOverlay, {
        color: props.overlayColor as Prop<string | undefined>,
        // @ts-ignore
        fixed: true as Prop<boolean>,
        // @ts-ignore
        show: isOpen.value as Prop<boolean>,
        zIndex: zIndex.value as Prop<number>,
        onClick: () => {
            isOpen.value = false;
            emit('update:open', false);
        },
    });
}

function createSideDrawer(
    slots: Slots,
    props: Readonly<TSideDrawerOptionProps>,
    attrs: TRecord,
    styles: ComputedRef<TRecord>,
    isMobile: Ref<boolean>,
    isOpen: Ref<boolean>,
    resizeHandler: (el: Element) => void
): VNode {
    return withDirectives(
        h(
            props.tag || 'aside',
            mergeProps(
                {
                    class: {
                        [`${cssPrefix}side-drawer`]: true,
                        [`${cssPrefix}drawer-mini`]: props.mini && !isOpen.value,
                        ['smooth-animation']: isMobile.value || props.mini,
                        ['drawer-closed']: !props.mini && !isOpen.value,
                        ['drawer-opened']: isOpen.value,
                        [`bg-${props.color}`]: props.color,
                        shadow: props.shadow,
                    },
                    style: {
                        ...styles.value,
                        marginTop: null,
                        height: props.mini || !isMobile.value ? null : styles.value.height,
                        width: props.mini || !isMobile.value ? null : styles.value.width,
                        position: props.mini || !isMobile.value ? null : styles.value.position,
                        left: props.mini || !isMobile.value ? null : styles.value.left,
                        right: props.mini || !isMobile.value ? null : styles.value.right,
                    },
                },
                attrs
            ),
            useRenderSlotDefault('div', slots, `${cssPrefix}side-drawer-inner`)
        ),
        [[Resize, resizeHandler]]
    );
}

export function useRenderSideDrawer(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TSideDrawerOptionProps>,
    attrs: TRecord,
    styles: ComputedRef<TRecord>,
    isMobile: Ref<boolean>,
    isOpen: Ref<boolean>,
    zIndex: Ref<number>,
    resizeHandler: (el: Element) => void
): VNode {
    return h(
        'div',
        {
            class: `${cssPrefix}drawer-host`,
            style: {
                ...styles.value,
                height: !isMobile.value && props.clipped ? styles.value.height : null,
                width: isMobile.value && !props.mini ? '0' : styles.value.width,
            },
        },
        [
            isMobile.value &&
                !props.mini &&
                h(Teleport, { to: 'body' }, [
                    createSideDrawer(slots, props, attrs, styles, isMobile, isOpen, resizeHandler),
                    createOverlay(props, zIndex, isOpen, emit),
                ]),
            (!isMobile.value || props.mini) &&
                createSideDrawer(slots, props, attrs, styles, isMobile, isOpen, resizeHandler),
        ]
    );
}
