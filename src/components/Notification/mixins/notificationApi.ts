import { BsCloseButton } from '@/components/Button';
import BsNotificationBar from '@/components/Notification/BsNotificationBar.ts';
import BsNotificationItem from '@/components/Notification/BsNotificationItem.ts';
import type { INotificationProvider } from '@/components/Notification/mixins/NotificationProvider.ts';
import type { TNotificationItemOptionProps } from '@/components/Notification/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper.ts';
import type { EmitFn, Ref, ShallowRef, VNode } from 'vue';
import { h, Teleport, toDisplayString } from 'vue';

function createNotificationHolder(
  provider: ShallowRef<INotificationProvider | undefined>
): VNode[] {
  const children: VNode[] = [];

  if (!provider.value) {
    return children;
  }

  provider.value.collection.forEach((value, placement) => {
    const holder = h(
      'div',
      {
        key: placement,
        class: [`${cssPrefix}notification-container`, `${cssPrefix}container-${placement}`],
        'aria-live': 'polite',
        'aria-atomic': 'true',
      },
      value.map((option) => {
        return h(BsNotificationItem, {
          key: option.oid,
          message: option.message,
          title: option.title,
          timeout: option.timeout,
          variant: option.variant!,
          clickClose: option.clickClose,
          closeButton: option.closeButton,
          iconOff: option.iconOff,
          progressBar: option.progressBar,
          onDismiss: () => provider.value?.remove(option),
        });
      })
    );

    children.push(holder);
  });

  return children;
}

export function useRenderNotificationContainer(
  provider: ShallowRef<INotificationProvider | undefined>
): VNode {
  return h(Teleport, { to: 'body' }, [
    h(
      'div',
      {
        class: `${cssPrefix}notification`,
      },
      createNotificationHolder(provider)
    ),
  ]);
}

function clearNotificationTimer(timerId: Ref<number | undefined>): void {
  clearTimeout(timerId.value);
  timerId.value = undefined;
}

export function useDeferHideNotification(
  emit: EmitFn,
  timerId: Ref<number | undefined>,
  timeout?: number
): void {
  if (timeout && timeout > 0) {
    timerId.value = Helper.defer(() => {
      clearNotificationTimer(timerId);
      emit('dismiss');
    }, timeout);
  }
}

export function useRenderNotificationItem(
  emit: EmitFn,
  props: Readonly<TNotificationItemOptionProps>,
  timerId: Ref<number | undefined>
): VNode {
  return h(
    'div',
    {
      class: {
        [`${cssPrefix}notification-dialog`]: true,
        [`${cssPrefix}dialog-${props.variant}`]: props.variant,
        [`${cssPrefix}dialog-icon-off`]: props.iconOff === true,
        'relative overflow-hidden': true,
        flex: !props.title && !props.progressBar,
      },
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': 'true',
      onClick: () => {
        if (props.clickClose === true) {
          clearNotificationTimer(timerId);
          emit('dismiss');
        }
      },
      onMouseover: () => clearNotificationTimer(timerId),
      onMouseout: () => useDeferHideNotification(emit, timerId, props.timeout),
    },
    [
      props.progressBar
        ? h(BsNotificationBar, {
            timeout: props.timeout,
            pause: !timerId.value,
          })
        : undefined,
      props.closeButton
        ? h(
            'div',
            {
              class: 'absolute',
              style: {
                right: '8px',
                top: '8px',
                zIndex: 2,
              },
            },
            [
              h(BsCloseButton, {
                flat: true,
                color: props.variant === 'warning' ? 'dark' : 'light',
                onClick: () => {
                  clearNotificationTimer(timerId);
                  emit('dismiss');
                },
              }),
            ]
          )
        : undefined,
      props.title
        ? h(
            'div',
            {
              class: `${cssPrefix}dialog-title`,
            },
            toDisplayString(props.title)
          )
        : undefined,
      h('div', {
        class: {
          [`${cssPrefix}dialog-message`]: true,
          'flex-fill self-center': !props.title && !props.progressBar,
        },
        style: !props.title ? { paddingRight: '1.5rem' } : undefined,
        innerHTML: props.message,
      }),
    ]
  );
}
