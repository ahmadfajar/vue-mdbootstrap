import BsNotificationBar from '@/components/Notification/BsNotificationBar';
import BsNotificationItem from '@/components/Notification/BsNotificationItem';
import type {
    INotificationProvider,
    TNotificationItemOptionProps,
    TNotificationVariant,
} from '@/components/Notification/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper';
import type { EmitFn, Prop, Ref, ShallowRef, VNode } from 'vue';
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
                    message: option.message as Prop<string>,
                    title: option.title as Prop<string>,
                    timeout: option.timeout as Prop<number>,
                    variant: option.variant as Prop<TNotificationVariant>,
                    // @ts-ignore
                    clickClose: option.clickClose as Prop<boolean | undefined>,
                    // @ts-ignore
                    closeButton: option.closeButton as Prop<boolean | undefined>,
                    // @ts-ignore
                    iconOff: option.iconOff as Prop<boolean | undefined>,
                    // @ts-ignore
                    progressBar: option.progressBar as Prop<boolean | undefined>,
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
                'd-flex': !props.title && !props.progressBar,
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
                      timeout: props.timeout as Prop<number>,
                      // @ts-ignore
                      pause: !timerId.value as Prop<boolean>,
                  })
                : undefined,
            props.closeButton
                ? h(
                      'button',
                      {
                          class: `${cssPrefix}btn-close`,
                          role: 'button',
                          type: 'button',
                          onClick: () => {
                              clearNotificationTimer(timerId);
                              emit('dismiss');
                          },
                      },
                      '×'
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
                    'align-self-center flex-fill order-first': !props.title && !props.progressBar,
                },
                innerHTML: props.message,
            }),
        ]
    );
}
