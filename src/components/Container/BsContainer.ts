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
        const thisProps = props as Readonly<TContainerOptionProps>;
        const thisElement = ref<HTMLElement | null>(null);
        const vueMdb = ref<TVueMdb>();
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const resizeHandler = () => {
            emit('resize', thisElement.value);
            isMobile.value = useBreakpointMax('md');
        };
        const styles = computed((): TRecord | undefined => {
            if (thisProps.app && appId.value) {
                if (vueMdb.value) {
                    const {sideDrawer, appbar} = vueMdb.value.app[appId.value];

                    return {
                        paddingRight: isMobile.value ? 0 : `${sideDrawer.right.width}px`,
                        paddingLeft: isMobile.value ? 0 : `${sideDrawer.left.width}px`,
                        top: appbar.fixedTop === true ? Helper.cssUnit(appbar.height + 1) : undefined,
                        bottom: appbar.fixedTop === true ? 0 : undefined,
                        position: appbar.fixedTop === true ? 'absolute' : undefined,
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
                    thisProps.tag || 'div',
                    {
                        ref: thisElement,
                        class: `${cssPrefix}container-wrap`,
                        style: styles.value
                    },
                    slots.default && slots.default()
                ),
                [[Resize, resizeHandler]]
            );
    }
});
