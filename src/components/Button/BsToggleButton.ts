import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { defineComponent, h, ref, vModelCheckbox, vModelRadio, withDirectives } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
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
        const cmpProps = props as Readonly<TToggleButtonOptionProps>;
        const localValue = ref<string | number | boolean | Array<unknown> | undefined>(<string | number | boolean | Array<unknown> | undefined>props.modelValue);
        const makeInputEl = (item: TInputOptionItem, props: Readonly<TToggleButtonOptionProps>) => {
            return withDirectives(
                h('input', {
                    class: 'd-none',
                    value: item.value,
                    ...useMakeInputItemAttrs(item, cmpProps),
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
                        cmpProps.pill ? 'rounded-pill' : (!cmpProps.pill && !cmpProps.rounded ? 'rounded-1' : ''),
                        cmpProps.disabled ? `${cssPrefix}disabled` : '',
                        cmpProps.readonly ? `${cssPrefix}readonly` : '',
                        cmpProps.required ? `${cssPrefix}required` : '',
                    ],
                    id: props.id,
                    role: 'group',
                },
                cmpProps.items?.map((item: TInputOptionItem, idx: number) => {
                    return h('label', {
                        key: `btn-${idx}`,
                        tabIndex: 0,
                        class: useMakeInputItemClasses(item, cmpProps),
                        // onClick: (e: Event) => (<HTMLElement>e.target).focus(),
                        onKeydown: (e: KeyboardEvent) => {
                            if (['Space', 'Enter'].includes(e.code)) {
                                (<HTMLElement>e.target).focus();
                                if (!cmpProps.disabled && !cmpProps.readonly && !item.disabled && !item.readonly) {
                                    if (cmpProps.multiple) {
                                        if ((<unknown[]>localValue.value).includes(<unknown>item.value)) {
                                            localValue.value = (<unknown[]>localValue.value).filter(it => it !== item.value);
                                        } else {
                                            (<unknown[]>localValue.value).push(item.value);
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
                        makeInputEl(item, cmpProps),
                        h<TBsButtonInner>(BsButtonInner, {
                            rippleOff: <Prop<boolean>>rippleOff(item),
                            // tagName: "div",
                        }, {
                            default: () => useRenderToggleItemContent(slots, item, cmpProps)
                        }),
                    ]);
                })
            );
        };
    }
});
