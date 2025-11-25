import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi.ts';
import { BsCloseButton } from '@/components/Button';
import { BsIcon } from '@/components/Icon';
import { useNormalizeIconName } from '@/components/Icon/mixins/iconApi.ts';
import {
  cssPrefix,
  useRenderTransition,
  useWrapSlot,
  useWrapSlotDefault,
} from '@/mixins/CommonApi.ts';
import type {
  PromiseVoidFunction,
  TAlertOptionProps,
  TBooleanRecord,
  TBsCloseButton,
  TBsIcon,
  TButtonColor,
  TContextColor,
  TExtendedContextColor,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { isEndWith } from '@/utils/StringHelper.ts';
import type { ComputedRef, Prop, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';

export function useAlertClassNames(
  props: Readonly<TAlertOptionProps>,
  color: ComputedRef<string | undefined>
): TBooleanRecord {
  return {
    [`${cssPrefix}alert`]: true,
    [`alert-${color.value}`]: !Helper.isEmpty(color.value) && !props.filled && !props.outlined,
    [`alert-solid-${color.value}`]: !Helper.isEmpty(color.value) && props.filled && !props.outlined,
    [`alert-outline-${color.value}`]: props.outlined,
    'flex items-center relative': true,
    dismissible: props.dismissible,
  };
}

export function useAlertColor(props: Readonly<TAlertOptionProps>): TContextColor {
  if (props.variant) {
    if (props.variant === 'help') {
      return Helper.isEmpty(props.color) ? 'secondary' : (props.color as TContextColor);
    } else {
      return Helper.isEmpty(props.color) ? props.variant : (props.color as TContextColor);
    }
  }

  return Helper.isEmpty(props.color) ? 'default' : (props.color as TContextColor);
}

export function useAlertIcon(props: Readonly<TAlertOptionProps>): string | undefined {
  const iconVariant = props.iconVariant ?? 'outlined';
  let iconName: string;

  if (props.variant) {
    switch (props.variant) {
      case 'help':
        iconName = `help_${iconVariant}`;
        break;
      case 'danger':
        iconName = `report_${iconVariant}`;
        break;
      case 'warning':
        iconName = `warning_${iconVariant}`;
        break;
      case 'info':
        iconName = `info_${iconVariant}`;
        break;
      default:
        iconName = `check_circle_${iconVariant}`;
    }

    return iconName;
  } else if (props.icon) {
    iconName = useNormalizeIconName(props.icon);
    const hasSuffix = isEndWith(iconName, [
      '_outlined_filled',
      '_rounded_filled',
      '_sharp_filled',
      '_filled',
      '_outlined',
      '_rounded',
      '_sharp',
    ]);

    return hasSuffix ? iconName : `${iconName}_${iconVariant}`;
  }

  return undefined;
}

function doRenderAlert(
  slots: Slots,
  props: Readonly<TAlertOptionProps>,
  classNames: ComputedRef<TBooleanRecord>,
  alertColor: ComputedRef<TExtendedContextColor>,
  alertIcon: ComputedRef<string | undefined>,
  dismissHandler: PromiseVoidFunction
): VNode {
  return h(
    'div',
    {
      class: classNames.value,
      'data-dismissible': props.dismissible ? 'true' : undefined,
      role: 'alert',
    },
    [
      useWrapSlot(
        slots,
        'icon',
        Helper.uuid(),
        { class: 'alert-icon' },
        alertIcon.value
          ? h<TBsIcon>(BsIcon, {
              ...useCreateIconProps(props),
              icon: alertIcon.value as Prop<string>,
              size: 32 as Prop<number>,
            })
          : undefined
      ),
      useWrapSlotDefault('div', slots, 'flex-fill'),
      props.dismissible
        ? h<TBsCloseButton>(BsCloseButton, {
            class: 'self-start',
            color: (props.closeButtonColor
              ? props.closeButtonColor
              : props.filled
                ? ['warning', 'info', 'light'].includes(alertColor.value)
                  ? 'dark'
                  : 'light'
                : alertColor.value === 'light'
                  ? 'dark'
                  : alertColor.value) as Prop<TButtonColor>,
            flat: true as unknown as Prop<boolean>,
            onClick: dismissHandler,
          })
        : createCommentVNode(' v-if-alert-dismissible '),
    ]
  );
}

export function useRenderAlert(
  slots: Slots,
  props: Readonly<TAlertOptionProps>,
  showAlert: ComputedRef<boolean | undefined>,
  classNames: ComputedRef<TBooleanRecord>,
  alertColorName: ComputedRef<TContextColor>,
  alertIconName: ComputedRef<string | undefined>,
  dismissHandler: PromiseVoidFunction
): VNode {
  return useRenderTransition(
    { name: props.transition },
    showAlert.value
      ? doRenderAlert(slots, props, classNames, alertColorName, alertIconName, dismissHandler)
      : createCommentVNode(' BsAlert ')
  );
}
