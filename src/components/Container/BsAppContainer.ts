import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, getCurrentInstance, h, onMounted, onUnmounted, ref } from 'vue';
import { cssPrefix, useGenerateId } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { IComponentInstance, TAppContainerOptionProps, TBsAppContainer, TRecord, TVueMdb } from '../../types';
import Helper from '../../utils/Helper';

export default defineComponent<TBsAppContainer, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsAppContainer',
    props: {
        viewportHeight: booleanProp,
        id: {
            type: String,
            default: () => useGenerateId()
        }
    },
    setup(props, {slots}) {
        const thisProps = props as Readonly<TAppContainerOptionProps>;
        const thisElement = ref<HTMLElement | null>(null);
        const vueMdb = ref<TVueMdb>();

        onMounted(() => {
            const instance = getCurrentInstance();
            vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;

            if (instance && vueMdb.value) {
                // console.info('ctx.$el:', (<IComponentInstance>instance).ctx.$el);
                const rect = (<HTMLElement | null>(
                    (<IComponentInstance>instance).ctx.$el
                ))?.getBoundingClientRect() ?? thisElement.value?.getBoundingClientRect();

                vueMdb.value.app[<string>thisProps.id] = {
                    left: rect?.left ?? 0,
                    right: rect?.right ?? 0,
                    top: rect?.top ?? 0,
                    bottom: rect?.bottom ?? 0,
                    height: rect?.height ?? 0,
                    width: rect?.width ?? 0,
                    appbar: {
                        height: 0,
                        fixedTop: false,
                        stickyTop: false
                    },
                    sideDrawer: {
                        left: {width: 0},
                        right: {width: 0},
                    }
                };
                // console.info('$VueMdb:', instance?.appContext.config.globalProperties.$VueMdb);
            }
        });
        onUnmounted(() => {
            if (vueMdb.value) {
                if (Helper.isObject(vueMdb.value.app[<string>thisProps.id])) {
                    delete vueMdb.value.app[<string>thisProps.id];
                }
            }
        });

        return () =>
            h(
                'div',
                {
                    ref: thisElement,
                    class: {
                        [`${cssPrefix}application-wrap`]: true,
                        [`${cssPrefix}viewport-height`]: thisProps.viewportHeight,
                        [`${cssPrefix}appbar-fixed-top`]: vueMdb.value?.app[<string>thisProps.id].appbar.fixedTop === true,
                    },
                    id: thisProps.id
                },
                slots.default && slots.default()
            );
    }
});
