import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, h, onMounted, ref, withDirectives } from 'vue';
import { Resize } from '../../directives';
import { cssPrefix, useBreakpointMax, useFindParentCmp, useVueMdbService } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TAppContainerOptionProps, TBsContainer, TContainerOptionProps, TRecord, TVueMdb } from '../../types';
import Helper from '../../utils/Helper';
import { baseTagProps } from '../Card/mixins/cardProps';

export default defineComponent<TBsContainer, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsContainer',
    props: {
        app: booleanProp,
        ...baseTagProps
    },
    emits: [
        /**
         * Fired when this component size is changed.
         */
        'resize'
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TContainerOptionProps>;
        const vueMdb = ref<TVueMdb>();
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const elementRef = ref<HTMLElement | null>(null);
        const resizeHandler = () => {
            emit('resize', elementRef.value);
            isMobile.value = useBreakpointMax('md');
        };
        const styles = computed((): TRecord | undefined => {
            if (cmpProps.app && appId.value) {
                if (vueMdb.value) {
                    const {
                        leftSideDrawerWidth, rightSideDrawerWidth,
                        appbarHeight, appbarFixedTop
                    } = vueMdb.value.app[appId.value];

                    return {
                        paddingRight: isMobile.value ? 0 : `${rightSideDrawerWidth}px`,
                        paddingLeft: isMobile.value ? 0 : `${leftSideDrawerWidth}px`,
                        top: appbarFixedTop === true ? Helper.cssUnit(appbarHeight + 1) : undefined,
                        bottom: appbarFixedTop === true ? 0 : undefined,
                        position: appbarFixedTop === true ? 'absolute' : undefined,
                    };
                }
            }

            return undefined;
        });

        onMounted(() => {
            vueMdb.value = useVueMdbService();
            const parent = useFindParentCmp(
                ['bs-app-container', 'BsAppContainer'], 3
            );

            if (parent) {
                appId.value = (<Readonly<TAppContainerOptionProps>>parent.props).id;
            } else {
                console.warn('<BsContainer> must be used inside <BsAppContainer>');
            }
        });

        return () =>
            withDirectives(
                h(
                    cmpProps.tag || 'div',
                    {
                        ref: elementRef,
                        class: `${cssPrefix}container-wrap`,
                        style: styles.value
                    },
                    slots.default && slots.default()
                ),
                [[Resize, resizeHandler]]
            );
    }
});
