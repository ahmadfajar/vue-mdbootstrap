import { Resize } from '@/directives';
import {
    cssPrefix,
    useFindParentCmp,
    useRenderSlotDefault,
    useVueMdbService,
} from '@/mixins/CommonApi.ts';
import type { TAppbarOptionProps, TAppContainerOptionProps, TRecord, TVueMdb } from '@/types';
import type { ComputedRef, Ref, Slots, VNode } from 'vue';
import { getCurrentInstance, h, nextTick, withDirectives } from 'vue';

export function useAppbarStyles(
    props: Readonly<TAppbarOptionProps>,
    appId: Ref<string | undefined>,
    vueMdb: Ref<TVueMdb | undefined>,
    isMobile: Ref<boolean>
): TRecord {
    const zeroPx = '0px';
    return {
        marginLeft: isMobile.value
            ? zeroPx
            : props.clippedLeft && appId.value
              ? (vueMdb.value?.app[appId.value].sideDrawer.left.width ?? 0) + 'px'
              : zeroPx,
        marginRight: isMobile.value
            ? zeroPx
            : props.clippedRight && appId.value
              ? (vueMdb.value?.app[appId.value].sideDrawer.right.width ?? 0) + 'px'
              : zeroPx,
    };
}

export function useAppbarOnMountedHook(
    appId: Ref<string | undefined>,
    appbar: Ref<HTMLElement | null>,
    vueMdb: Ref<TVueMdb | undefined>,
    smoothAnimation: Ref<boolean>,
    props: Readonly<TAppbarOptionProps>
): void {
    const instance = getCurrentInstance();
    vueMdb.value = useVueMdbService();
    const parent = useFindParentCmp(
        ['bs-app', 'bs-app-container', 'BsApp', 'BsAppContainer'],
        3,
        instance
    );

    if (parent) {
        nextTick().then(() => {
            appId.value = (parent.props as Readonly<TAppContainerOptionProps>).id;

            if (appId.value && vueMdb.value) {
                const rect = appbar.value?.getBoundingClientRect();
                vueMdb.value.app[appId.value].appbar.height = rect!.height;
                vueMdb.value.app[appId.value].appbar.fixedTop = props.fixedTop ?? false;
                vueMdb.value.app[appId.value].appbar.stickyTop = props.stickyTop ?? false;
                // console.info('appbar-vueMdb:', vueMdb.value);
            }
        });
    } else {
        console.warn('<BsAppbar> must be used inside <BsApp>');
    }

    window &&
        window.requestAnimationFrame(() => {
            smoothAnimation.value = true;
        });
}

export function useRenderAppbar(
    props: Readonly<TAppbarOptionProps>,
    appbar: Ref<HTMLElement | null>,
    styles: ComputedRef<TRecord>,
    smoothAnimation: Ref<boolean>,
    slots: Slots,
    resizeHandler: (el: Element, evt: Event) => void
): VNode {
    return withDirectives(
        h(
            props.tag ?? 'header',
            {
                ref: appbar,
                class: {
                    [`${cssPrefix}appbar`]: true,
                    [`${cssPrefix}appbar-shadow`]: props.shadow,
                    'smooth-animation': smoothAnimation.value,
                    'fixed-top': props.fixedTop,
                    'sticky-top': props.stickyTop && !props.fixedTop,
                },
                style: styles.value,
            },
            [useRenderSlotDefault('nav', slots, `${cssPrefix}appbar-content`)]
        ),
        [[Resize, resizeHandler]]
    );
}
