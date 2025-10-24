import { BsRipple } from '@/components/Animation';
import { BsSvgIcon } from '@/components/Icon';
import {
  useCheckSelected,
  useCreateInputRadioOrCheckbox,
} from '@/components/Radio/mixins/radioApi.ts';
import { cssPrefix, useMergeClass, useWrapSlotWithCondition } from '@/mixins/CommonApi.ts';
import type { PromiseVoidFunction, TBsRipple, TRecord, TSwitchOptionProps } from '@/types';
import type { ComputedRef, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';

export function useSwitchClasses(props: Readonly<TSwitchOptionProps>): TRecord {
  const checked = useCheckSelected(props);

  return {
    [`${cssPrefix}switch`]: true,
    [`${cssPrefix}switch-${props.color}`]: props.color != null,
    [`${cssPrefix}switch-inset`]: props.insetMode || props.insetOutlined,
    [`${cssPrefix}switch-outlined`]: props.insetOutlined === true && !checked,
    checked: checked,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly && !props.disabled,
  };
}

function createThumbIcon(props: Readonly<TSwitchOptionProps>): VNode {
  if ((props.insetMode || props.insetOutlined) && (props.checkedIcon || props.checkoffIcon)) {
    const checked = useCheckSelected(props);

    if (checked && props.checkedIcon) {
      return h(BsSvgIcon, {
        icon: 'check' as Prop<string>,
        height: 16 as Prop<number>,
        width: 16 as Prop<number>,
      });
    } else if (!checked && props.checkoffIcon && props.insetMode) {
      return h(BsSvgIcon, {
        icon: 'close' as Prop<string>,
        height: 16 as Prop<number>,
        width: 16 as Prop<number>,
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
  return h('div', { class: [`${cssPrefix}switch-wrapper`] }, [
    h(
      'div',
      {
        class: [`${cssPrefix}switch-track`],
        onClick: toggleCheckHandler,
      },
      [
        h('div', { class: [`${cssPrefix}switch-thumb`] }, [
          h('div', { class: `${cssPrefix}switch-overlay` }),
          h<TBsRipple>(
            BsRipple,
            {
              centered: true as unknown as Prop<boolean>,
              active: rippleActive.value as unknown as Prop<boolean>,
              disabled: (props.disabled || props.readonly) as unknown as Prop<boolean>,
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
  const labelClass = [`${cssPrefix}switch-label`, `${cssPrefix}label-${position}`];

  return useMergeClass(labelClass, props.labelClass as string | string[]);
}

export function useRenderSwitch(
  slots: Slots,
  props: Readonly<TSwitchOptionProps>,
  classnames: ComputedRef<TRecord>,
  rippleActive: Ref<boolean>,
  toggleCheckHandler: PromiseVoidFunction
): VNode {
  return h(
    'div',
    {
      class: classnames.value,
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
