import { BsRipple } from '@/components/Animation';
import { useMakeInputBaseAttrs } from '@/components/Field/mixins/textFieldApi.ts';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi.ts';
import { BsRadio } from '@/components/Radio';
import { cssPrefix, useRenderSlotWithWrapper } from '@/mixins/CommonApi.ts';
import type {
    TBsRadio,
    TBsRipple,
    TInputGroupProps,
    TRadioGroupOptionProps,
    TRadioOptionProps,
    TRadioProps,
    TRecord,
} from '@/types';
import Helper from '@/utils/Helper';
import type { ComputedRef, Prop, Ref, Slots, VNode, VNodeArrayChildren } from 'vue';
import { h, renderSlot } from 'vue';

export function useRadioClasses(props: Readonly<TRadioOptionProps>): TRecord {
    return {
        [`${cssPrefix}radio`]: true,
        [`${cssPrefix}radio-${props.color}`]: props.color != null,
        checked: props.value === props.modelValue,
        required: props.required,
        readonly: props.readonly,
        disabled: props.disabled,
    };
}

export function useCheckSelected(props: Readonly<TRadioOptionProps>): boolean {
    if (props.modelValue && Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
    }

    return props.value === props.modelValue;
}

export function useCreateInputRadioOrCheckbox(
    props: Readonly<TRadioOptionProps>,
    inputType: string,
    otherProps?: TRecord
): VNode {
    const thisValue = !Helper.isEmpty(props.value)
        ? Helper.isObject(props.value)
            ? JSON.stringify(props.value)
            : String(props.value)
        : '';

    let inputProps = {
        ...useMakeInputBaseAttrs(props),
        type: inputType,
        role: inputType,
        value: thisValue,
        'aria-disabled': props.disabled,
        'aria-checked': useCheckSelected(props),
    };

    if (!Helper.isEmptyObject(otherProps)) {
        inputProps = {
            ...inputProps,
            ...otherProps,
        };
    }

    return h('input', inputProps);
}

export function useRenderRadioOrCheckbox(
    slots: Slots,
    props: Readonly<TRadioOptionProps>,
    classnames: ComputedRef<TRecord>,
    rippleActive: Ref<boolean>,
    inputType: string,
    inputElement: VNode,
    toggleCheckHandler: VoidFunction
): VNode {
    return h(
        'div',
        {
            class: classnames.value,
        },
        [
            h(
                'div',
                {
                    class: `${cssPrefix}${inputType}-inner`,
                    onClick: toggleCheckHandler,
                },
                [
                    h('div', { class: `${cssPrefix}${inputType}-overlay` }),
                    h<TBsRipple>(
                        BsRipple,
                        {
                            // @ts-ignore
                            centered: true as Prop<boolean>,
                            // @ts-ignore
                            active: rippleActive.value as Prop<boolean>,
                            // @ts-ignore
                            disabled: (props.disabled || props.readonly) as Prop<boolean>,
                            'onUpdate:active': (value: boolean): void => {
                                rippleActive.value = value;
                            },
                        },
                        {
                            default: () => inputElement,
                        }
                    ),
                ]
            ),
            useRenderSlotWithWrapper(
                slots,
                'default',
                Helper.uuid(),
                {
                    for: props.id,
                    tabIndex: 0,
                    class: `${cssPrefix}${inputType}-label`,
                    onClickPrevent: toggleCheckHandler,
                    onKeydown: (e: KeyboardEvent) => {
                        if (['Space', 'Enter'].includes(e.code)) {
                            toggleCheckHandler();
                            e.preventDefault();
                        }
                    },
                },
                undefined,
                'label'
            ),
        ]
    );
}

export function useInputGroupClasses<D, M>(
    props: Readonly<TInputGroupProps<D, M>>,
    hasValidated: boolean,
    hasError: boolean
): TRecord {
    return {
        [`${cssPrefix}field row`]: true,
        // [`${cssPrefix}radio-group`]: true,
        required: props.required,
        readonly: props.readonly,
        disabled: props.disabled,
        'has-error': hasError,
        'has-success': hasValidated && !hasError,
    };
}

export function useCreateRadioItems(
    props: Readonly<TRadioGroupOptionProps>,
    toggleCheckHandler: (item: TRadioProps) => void
): VNodeArrayChildren {
    return props.items.map((it, idx) => {
        return h('div', { class: 'col', key: `radio-${idx}` }, [
            h<TBsRadio>(
                BsRadio,
                {
                    color: (it.color || props.color) as Prop<string>,
                    // @ts-ignore
                    disabled: (it.disabled || props.disabled) as Prop<boolean>,
                    // @ts-ignore
                    readonly: (it.readonly || props.readonly) as Prop<boolean>,
                    value: it.value as Prop<string | number | unknown>,
                    name: (it.name ? it.name : props.name ? props.name : undefined) as Prop<
                        string | undefined
                    >,
                    modelValue: props.modelValue as Prop<string | number | unknown>,
                    'onUpdate:model-value': (): void => toggleCheckHandler(it),
                },
                {
                    default: () => it.label,
                }
            ),
        ]);
    });
}

export function useRenderRadioOrCheckboxGroup<D, M>(
    slots: Slots,
    props: Readonly<TInputGroupProps<D, M>>,
    classnames: ComputedRef<TRecord>,
    children: VNodeArrayChildren,
    showValidationError: boolean,
    showHelpText: boolean,
    hasError: boolean,
    errorItems: Array<string>
): VNode {
    return h('div', { class: classnames.value }, [
        renderSlot(slots, 'default'),
        h('div', { class: 'col' }, [
            h(
                'div',
                {
                    class: {
                        'row g-2': true,
                        'row-cols-1': !props.column || (props.column && props.items.length > 0),
                        'row-cols-sm-auto': !props.column && props.items.length < 4,
                        'row-cols-sm-2': !props.column && props.items.length > 3,
                        'row-cols-lg-3 row-cols-xl-4': !props.column,
                        'row-cols-md-2': props.column && props.items.length > 3,
                        [`row-cols-lg-4`]:
                            props.column &&
                            parseInt(props.column as string, 10) > 4 &&
                            props.items.length > 3,
                        [`row-cols-lg-${props.column}`]:
                            props.column && parseInt(props.column as string, 10) < 5,
                        [`row-cols-xl-${props.column}`]:
                            props.column && parseInt(props.column as string, 10) > 1,
                    },
                },
                children
            ),
            useRenderFieldFeedback(
                slots,
                props,
                showHelpText,
                showValidationError,
                hasError,
                errorItems
            ),
        ]),
    ]);
}
