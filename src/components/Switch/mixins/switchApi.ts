import { BsRipple } from '@/components/Animation';
import { BsSvgIcon } from '@/components/Icon';
import {
  useCheckSelected,
  useCreateInputRadioOrCheckbox,
} from '@/components/Radio/mixins/radioApi.ts';
import type { TSwitchOptionProps } from '@/components/Switch/types';
import { cssPrefix, useMergeClass, useWrapSlotWithCondition } from '@/mixins/CommonApi.ts';
import type { PromiseVoidFunction, TRecord } from '@/types';
import type { ComputedRef, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';

export function useSwitchClasses(props: Readonly<TSwitchOptionProps>): TRecord {
  const checked = useCheckSelected(props);

  return {
    [`${cssPrefix}switch`]: true,
    [`${cssPrefix}switch-inset`]:
      ['inset', 'outline-inset'].includes(props.variant!) || props.insetMode || props.insetOutlined,
    [`${cssPrefix}switch-outlined`]:
      (props.variant === 'outline-inset' || props.insetOutlined) && !props.insetMode,
    [`switch-${props.color}`]: props.color != null,
    'flex items-center relative': true,
    checked: checked,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly && !props.disabled,
  };
}

function createThumbIcon(props: Readonly<TSwitchOptionProps>): VNode {
  if (
    (['inset', 'outline-inset'].includes(props.variant!) ||
      props.insetMode ||
      props.insetOutlined) &&
    (props.checkedIcon || props.checkoffIcon)
  ) {
    const checked = useCheckSelected(props);

    if (checked && props.checkedIcon) {
      return h(BsSvgIcon, {
        icon: 'check',
        height: 16,
        width: 16,
      });
    } else if (!checked && props.checkoffIcon && props.insetMode) {
      return h(BsSvgIcon, {
        icon: 'close',
        height: 16,
        width: 16,
      });
    }
  }

  return createCommentVNode(' v-if-thumb-icon ', true);
}

function createSwitchUI(
  props: Readonly<TSwitchOptionProps>,
  rippleActive: Ref<boolean>,
  toggleCheckHandler: PromiseVoidFunction
): VNode {
  return h('div', { class: [`${cssPrefix}switch-wrapper`, 'inline-flex'] }, [
    h(
      'div',
      {
        class: [`${cssPrefix}switch-track`, 'flex', 'items-center', 'relative'],
        onClick: toggleCheckHandler,
      },
      [
        h('div', { class: [`${cssPrefix}switch-thumb`, 'relative'] }, [
          h('div', { class: [`${cssPrefix}switch-overlay`, 'absolute'] }),
          h(
            BsRipple,
            {
              class: ['flex', 'items-center', 'justify-center', 'absolute'],
              centered: true,
              active: rippleActive.value,
              disabled: props.disabled || props.readonly,
              'onUpdate:active': (value: boolean): void => {
                rippleActive.value = value;
              },
            },
            {
              default: () => [
                createThumbIcon(props),
                useCreateInputRadioOrCheckbox(props, 'checkbox'),
              ],
            }
          ),
        ]),
      ]
    ),
  ]);
}

function switchLabelClass(props: Readonly<TSwitchOptionProps>, position: string): string[] {
  const labelClass = [
    `${cssPrefix}switch-label`,
    `${cssPrefix}label-${position}`,
    !props.disabled && !props.readonly ? `${cssPrefix}link relative` : 'relative',
  ];

  return useMergeClass(labelClass, props.labelClass);
}

export function useRenderSwitch(
  slots: Slots,
  props: Readonly<TSwitchOptionProps>,
  classnames: ComputedRef<TRecord>,
  rippleActive: Ref<boolean>,
  toggleCheckHandler: PromiseVoidFunction
): VNode {
  const switchState = props.disabled
    ? 'disabled'
    : props.readonly
      ? 'readonly'
      : useCheckSelected(props)
        ? 'checked'
        : undefined;

  return h(
    'div',
    {
      class: classnames.value,
      'data-state': switchState,
      'data-checked': useCheckSelected(props),
      'data-required': props.required ? 'true' : undefined,
      'data-disabled': props.disabled,
      'aria-disabled': props.disabled,
    },
    [
      useWrapSlotWithCondition(
        slots,
        'default',
        slots.default != null && props.labelPosition === 'left',
        {
          for: props.id,
          class: switchLabelClass(props, 'left'),
          onClickPrevent: toggleCheckHandler,
        },
        'label'
      ),
      createSwitchUI(props, rippleActive, toggleCheckHandler),
      useWrapSlotWithCondition(
        slots,
        'default',
        slots.default != null && props.labelPosition === 'right',
        {
          for: props.id,
          class: switchLabelClass(props, 'right'),
          onClickPrevent: toggleCheckHandler,
        },
        'label'
      ),
    ]
  );
}
