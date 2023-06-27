import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h, ref, watch } from 'vue';
import { cssPrefix, useGenerateId } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { IRippleEvent, TBsRipple, TRecord, TRippleOptionProps } from '../../types';
import Helper from '../../utils/Helper';
import { baseTagProps } from '../Card/mixins/cardProps';
import { useCreateRipple } from './mixins/rippleApi';

export default defineComponent<TBsRipple, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsRipple',
    props: {
        ...baseTagProps,
        active: booleanProp,
        centered: booleanProp,
        disabled: booleanProp,
    },
    emits: [
        /**
         * Fired when this component's animation state is updated.
         */
        'update:active',
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TRippleOptionProps>;
        const cmpId = useGenerateId();
        const touchTimeout = ref<number>();
        const startRipple = (event: IRippleEvent): void => {
            emit('update:active', true);
            useCreateRipple(event, cmpProps.centered);
            Helper.defer(() => {
                emit('update:active', false);
            }, 100);
        }

        watch(
            () => cmpProps.active,
            (value) => {
                if (value === true && !cmpProps.disabled) {
                    const event = {target: document.getElementById(cmpId)} as IRippleEvent;
                    useCreateRipple(event, cmpProps.centered);
                    Helper.defer(() => {
                        emit('update:active', false);
                    }, 100);
                }
            }
        );
        watch(
            () => cmpProps.disabled,
            (value) => {
                if (value === true) {
                    const target = document.getElementById(cmpId);

                    if (target) {
                        const ripple = target.getElementsByClassName(`${cssPrefix}ripple-animation`)[0];
                        if (ripple) {
                            ripple.remove();
                        }
                    }
                }
            }
        );

        return () => {
            return h(props.tag as string, {
                id: cmpId,
                class: `${cssPrefix}ripple`,
                onClickPassive: (event: IRippleEvent) => {
                    !props.disabled && startRipple(event);
                },
                onTouchstartPassive: (event: IRippleEvent) => {
                    if (!props.disabled) {
                        touchTimeout.value = window.setTimeout(() => {
                            startRipple(event);
                        }, 100);
                    }
                },
                onTouchmovePassive: () => {
                    window.clearTimeout(touchTimeout.value);
                }
            }, slots.default && slots.default())
        }
    }
});
