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
        const vueMdb = ref<TVueMdb>();

        onMounted(() => {
            const instance = getCurrentInstance();
            vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;
            // console.log("vueMdb.value:", vueMdb.value);
            if (instance && vueMdb.value) {
                const rect = (<HTMLElement>(
                    (<IComponentInstance>instance).ctx.$el
                )).getBoundingClientRect();
                vueMdb.value.app[<string>thisProps.id] = {
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                    height: rect.height,
                    width: rect.width,
                    appbarHeight: 0,
                    appbarFixedTop: false,
                    appbarStickyTop: false,
                    leftSideDrawerWidth: 0,
                    rightSideDrawerWidth: 0
                };
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
                    class: {
                        [`${cssPrefix}application-wrap`]: true,
                        [`${cssPrefix}viewport-height`]: thisProps.viewportHeight,
                        [`${cssPrefix}appbar-fixed-top`]: vueMdb.value?.app[<string>thisProps.id].appbarFixedTop === true,
                    },
                    id: thisProps.id
                },
                slots.default && slots.default()
            );
    }
});
