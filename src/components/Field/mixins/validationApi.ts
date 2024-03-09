import {
    computed,
    createCommentVNode,
    Fragment,
    h,
    type Ref,
    type Slots,
    unref,
    type VNode,
} from 'vue';
import { cssPrefix, useRenderSlot, useRenderTransition } from '../../../mixins/CommonApi';
import Helper from '../../../utils/Helper';
import type { TComputedValidationResult, TValidationProps, TValidator } from '../types';

function getValidator(props: Readonly<TValidationProps>): TValidator | undefined {
    return unref(props.validator ?? props.externalValidator);
}

export function useHasValidationError(props: Readonly<TValidationProps>): boolean {
    const validator = getValidator(props);
    return validator != undefined && validator.hasError;
}

export function useHasValidated(props: Readonly<TValidationProps>): boolean {
    const validator = getValidator(props);
    return validator && validator.dirty != undefined ? validator.dirty : false;
}

export function useShowValidationError(props: Readonly<TValidationProps>): boolean {
    const validator = getValidator(props);

    return (
        validator != undefined &&
        validator.hasError &&
        validator.messages != undefined &&
        validator.validators != undefined
    );
}

export function useShowHelpText(props: Readonly<TValidationProps>, isFocused?: boolean): boolean {
    return (
        !Helper.isEmpty(props.helpText) && (props.persistentHelpText === true || isFocused === true)
    );
}

export function useGetErrorItems(props: Readonly<TValidationProps>): string[] {
    const validator = getValidator(props);

    if (validator) {
        const validators = unref(validator.validators);
        return Object.keys(validators).filter((name) => {
            return unref(validators[name]);
        });
    }

    return [];
}

export function useGetValidationResult(
    props: Readonly<TValidationProps>,
    hasFocused: Ref<boolean>
): TComputedValidationResult {
    const hasError = computed<boolean>(() => useHasValidationError(props));
    const hasValidated = computed<boolean>(() => useHasValidated(props));
    const showValidationError = computed<boolean>(() => useShowValidationError(props));
    const showHelpText = computed<boolean>(() => useShowHelpText(props, hasFocused.value));
    const errorItems = computed(() => useGetErrorItems(props));

    return {
        hasError,
        hasValidated,
        showValidationError,
        showHelpText,
        errorItems,
    };
}

function validationErrorMessage(props: Readonly<TValidationProps>, ruleName: string): string {
    const validator = getValidator(props);
    return validator ? <string>unref(validator.messages[ruleName]) : '';
}

function renderErrorMessage(
    props: Readonly<TValidationProps>,
    hasError: boolean,
    errorItems: Array<string>
): VNode {
    return hasError
        ? h(
              Fragment,
              { key: Helper.uuid() },
              errorItems.map((ruleName) => {
                  return h(
                      'small',
                      {
                          key: `bs-${ruleName}`,
                          class: 'text-danger d-block',
                      },
                      validationErrorMessage(props, ruleName)
                  );
              })
          )
        : createCommentVNode(' v-if-field-error ');
}

export function useRenderFieldFeedback(
    slots: Slots,
    props: Readonly<TValidationProps>,
    showHelpText: boolean,
    showValidationError: boolean,
    hasError: boolean,
    errorItems: Array<string>,
    onClickHandler?: EventListener
): VNode {
    return props.helpText || showValidationError
        ? h(
              'div',
              {
                  class: `${cssPrefix}field-feedback`,
                  onClick: onClickHandler,
              },
              [
                  hasError
                      ? renderErrorMessage(props, hasError, errorItems)
                      : useRenderTransition(
                            { name: 'field-feedback' },
                            useRenderSlot(
                                slots,
                                'help-text',
                                { key: 'feedback-help-text' },
                                showHelpText
                                    ? h(
                                          'small',
                                          {
                                              class: `${cssPrefix}help-text d-block`,
                                          },
                                          props.helpText
                                      )
                                    : createCommentVNode(' v-if-help-text ')
                            )
                        ),
              ]
          )
        : createCommentVNode(' v-if-field-feedback ');
}
