import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi.ts';
import { BsButton } from '@/components/Button';
import { BsIcon } from '@/components/Icon';
import { useNormalizeIconName } from '@/components/Icon/mixins/iconApi.ts';
import {
  cssPrefix,
  useRenderTransition,
  useWrapSlot,
  useWrapSlotDefault,
} from '@/mixins/CommonApi.ts';
import type { TAlertOptionProps, TBooleanRecord, TBsButton, TBsIcon, TButtonMode } from '@/types';
import Helper from '@/utils/Helper.ts';
import { isEndWith } from '@/utils/StringHelper.ts';
import type { ComputedRef, Prop, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';

export function useAlertClassNames(
  props: Readonly<TAlertOptionProps>,
  color: ComputedRef<string | undefined>
): TBooleanRecord {
  return {
    [`${cssPrefix}alert flex items-center`]: true,
    [`${cssPrefix}alert-${color.value}`]:
      !Helper.isEmpty(color.value) && !props.filled && !props.outlined,
    [`${cssPrefix}alert-solid-${color.value}`]:
      !Helper.isEmpty(color.value) && props.filled && !props.outlined,
    [`${cssPrefix}alert-outline-${color.value}`]: props.outlined,
    dismissible: props.dismissible,
  };
}

export function useAlertColor(props: Readonly<TAlertOptionProps>): string | undefined {
  if (props.variant) {
    if (props.variant === 'help') {
      return Helper.isEmpty(props.color) ? 'secondary' : props.color;
    } else {
      return Helper.isEmpty(props.color) ? props.variant : props.color;
    }
  }

  return Helper.isEmpty(props.color) ? 'primary' : props.color;
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
  alertColor: ComputedRef<string | undefined>,
  alertIcon: ComputedRef<string | undefined>,
  dismissHandler: VoidFunction
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
        ? h<TBsButton>(BsButton, {
            class: 'ms-auto',
            color: (!props.filled
              ? alertColor.value
              : ['light', 'light-grey'].includes(props.color as string)
                ? 'secondary'
                : 'light') as Prop<string>,
            icon: 'close' as Prop<string>,
            mode: 'icon' as Prop<TButtonMode>,
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
  alertColorName: ComputedRef<string | undefined>,
  alertIconName: ComputedRef<string | undefined>,
  dismissHandler: VoidFunction
): VNode {
  return useRenderTransition(
    { name: props.transition },
    showAlert.value
      ? doRenderAlert(slots, props, classNames, alertColorName, alertIconName, dismissHandler)
      : createCommentVNode(' BsAlert ')
  );
}
