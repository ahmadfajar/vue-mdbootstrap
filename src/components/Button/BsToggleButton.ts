import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { defineComponent, h, ref, vModelCheckbox, vModelRadio, withDirectives } from 'vue';
import { cssPrefix, useGenerateId } from '../../mixins/CommonApi';
import type { TBsButtonInner, TBsToggleButton, TInputOptionItem, TRecord, TToggleButtonOptionProps } from '../../types';
import BsButtonInner from './BsButtonInner';
import { useMakeInputItemAttrs, useMakeInputItemClasses, useRenderToggleItemContent } from './mixins/buttonApi';
import { toggleButtonProps } from './mixins/buttonProps';

export default defineComponent<TBsToggleButton, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsToggleButton',
    props: toggleButtonProps,
    emits: [
        /**
         * Callback fired when this component's value is updated.
         */
        'update:model-value'
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TToggleButtonOptionProps>;
        const localValue = ref<string | number | boolean | Array<unknown> | undefined>(<string | number | boolean | Array<unknown> | undefined>props.modelValue);
        const makeInputEl = (item: TInputOptionItem, props: Readonly<TToggleButtonOptionProps>) => {
            return withDirectives(
                h('input', {
                    class: 'd-none',
                    value: item.value,
                    ...useMakeInputItemAttrs(item, thisProps),
                    'onUpdate:modelValue': (value: string | number | boolean) => {
                        if (!props.disabled && !props.readonly && !item.disabled && !item.readonly) {
                            localValue.value = value;
                            emit('update:model-value', localValue.value);
                        }
                    }
                }),
                [
                    props.multiple
                        ? [vModelCheckbox, localValue.value]
                        : [vModelRadio, localValue.value],
                ]
            );
        }
        const rippleOff = (item: TInputOptionItem) => {
            return props.disabled || props.readonly || item.disabled || item.readonly;
        }

        return () => {
            return h('div', {
                    class: [
                        'btn-group',
                        // thisProps.pill ? 'rounded-pill' : (!thisProps.pill && !thisProps.rounded ? 'rounded-1' : ''),
                        thisProps.disabled ? `${cssPrefix}disabled` : '',
                        thisProps.readonly ? `${cssPrefix}readonly` : '',
                        thisProps.required ? `${cssPrefix}required` : '',
                    ],
                    id: props.id,
                    role: 'group',
                },
                thisProps.items?.map((item: TInputOptionItem, idx: number) => {
                    item.id ??= useGenerateId();

                    return h('label', {
                        key: `btn-${idx}`,
                        tabIndex: 0,
                        class: useMakeInputItemClasses(item, thisProps),
                        // onClick: (e: Event) => (<HTMLElement>e.target).focus(),
                        onKeydown: (e: KeyboardEvent) => {
                            if (['Space', 'Enter'].includes(e.code)) {
                                (e.target as HTMLElement).focus();
                                if (!thisProps.disabled && !thisProps.readonly && !item.disabled && !item.readonly) {
                                    if (thisProps.multiple) {
                                        if ((localValue.value as unknown[]).includes(item.value)) {
                                            localValue.value = (localValue.value as unknown[]).filter(it => it !== item.value);
                                        } else {
                                            (localValue.value as unknown[]).push(item.value);
                                        }
                                    } else {
                                        localValue.value = item.value;
                                    }
                                    emit('update:model-value', localValue.value);
                                }
                                e.preventDefault();
                            }
                        },
                    }, [
                        makeInputEl(item, thisProps),
                        h<TBsButtonInner>(BsButtonInner, {
                            rippleOff: rippleOff(item) as Prop<boolean>,
                        }, {
                            default: () => useRenderToggleItemContent(slots, item, thisProps)
                        }),
                    ]);
                })
            );
        };
    }
});
