import {createCommentVNode, Fragment, h, Slots, VNode} from "vue";
import {cssPrefix, useRenderSlot, useRenderTransition} from "../../../mixins/CommonApi";
import {TValidationProps, TValidator} from "../types";
import Helper from "../../../utils/Helper";

export function useGetValidator(props: Readonly<TValidationProps>): TValidator | undefined {
    return props.validator || props.externalValidator;
}

export function useHasValidationError(props: Readonly<TValidationProps>): boolean {
    const validator = useGetValidator(props);
    return validator !== undefined && validator.hasError;
}

export function useHasValidated(props: Readonly<TValidationProps>): boolean {
    const validator = useGetValidator(props);
    return (validator && validator.dirty !== undefined) ? validator.dirty : false;
}

export function useShowValidationError(props: Readonly<TValidationProps>): boolean {
    const validator = useGetValidator(props);

    return validator !== undefined
        && validator.hasError
        && validator.messages !== undefined
        && validator.validators !== undefined
}

export function useGetErrorItems(props: Readonly<TValidationProps>) {
    const validator = useGetValidator(props);

    if (validator) {
        return Object.keys(validator.validators).filter((name) => {
            return validator.validators[name] === false;
        });
    }

    return [];
}

function validationErrorMessage(
    props: Readonly<TValidationProps>,
    field: string,
): string {
    const validator = useGetValidator(props);
    return validator ? <string>validator.messages[field] : "";
}

function renderErrorMessage(
    props: Readonly<TValidationProps>,
    hasError: boolean,
    errorItems: Array<string>,
): VNode | null {
    return hasError
        ? h(Fragment,
            {key: Helper.uuid()},
            errorItems.map((field) => {
                return h("small", {
                    key: `bs-${field}`,
                    class: "text-danger d-block"
                }, validationErrorMessage(props, field))
            })
        )
        : createCommentVNode(" v-if-field-error ")
}

export function useRenderFieldFeedback(
    slots: Slots,
    props: Readonly<TValidationProps>,
    showHelpText: boolean,
    showValidationError: boolean,
    hasError: boolean,
    errorItems: Array<string>,
): VNode {
    return (props.helpText || showValidationError)
        ? h("div", {
            class: `${cssPrefix}field-feedback`
        }, [
            useRenderTransition(
                {name: "fade"},
                useRenderSlot(
                    slots, "helpText",
                    {key: Helper.uuid()},
                    (
                        showHelpText
                            ? h("small", {
                                    class: `${cssPrefix}help-text d-block`
                                }, props.helpText
                            )
                            : undefined
                    )
                )
            ),
            renderErrorMessage(props, hasError, errorItems),
        ])
        : createCommentVNode(" v-if-field-feedback ");
}