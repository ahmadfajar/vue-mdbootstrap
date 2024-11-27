import BsNotificationBar from '@/components/Notification/BsNotificationBar';
import BsNotificationItem from '@/components/Notification/BsNotificationItem';
import type {
    INotificationProvider,
    TNotificationItemOptionProps,
    TNotificationOption,
    TNotificationPosition,
} from '@/components/Notification/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper';
import type { Prop, Ref, ShallowRef, VNode } from 'vue';
import { h, Teleport, toDisplayString } from 'vue';

function createNotificationHolder(
    provider: ShallowRef<INotificationProvider | undefined>
): VNode[] {
    const children: VNode[] = [];

    if (!provider.value) {
        return children;
    }

    for (const position in provider.value.notification) {
        if (Object.hasOwn(provider.value.notification, position)) {
            const placement = position as TNotificationPosition;
            const item = h(
                'div',
                {
                    key: placement,
                    class: [
                        `${cssPrefix}notification-container`,
                        `${cssPrefix}notification-${placement}`,
                    ],
                },
                provider.value.notification[placement].map((option) =>
                    h(BsNotificationItem, {
                        key: option.oid,
                        options: option as Prop<TNotificationOption>,
                    })
                )
            );

            children.push(item);
        }
    }

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

function removeNotificationItem(
    timerId: Ref<number | undefined>,
    item?: TNotificationOption,
    provider?: INotificationProvider
) {
    clearTimeout(timerId.value);
    provider?.remove(item as TNotificationOption);
}

export function useRenderNotificationItem(
    props: Readonly<TNotificationItemOptionProps>,
    provider: ShallowRef<INotificationProvider | undefined>,
    timerId: Ref<number | undefined>
): VNode {
    return h(
        'div',
        {
            class: [
                `${cssPrefix}notification-dialog`,
                `${cssPrefix}notification-${props.options?.variant}`,
            ],
            onClick: () => {
                if (props.options?.clickClose === true) {
                    removeNotificationItem(timerId, props.options, provider.value);
                }
            },
            onMouseover: () => {
                clearTimeout(timerId.value);
                timerId.value = undefined;
            },
            onMouseout: () => {
                timerId.value = Helper.defer(() => {
                    provider.value?.remove(props.options as TNotificationOption);
                }, props.options?.timeout as number);
            },
        },
        [
            props.options?.progressBar
                ? h(BsNotificationBar, {
                      timeout: props.options.timeout as Prop<number>,
                      // @ts-ignore
                      pause: !timerId.value as Prop<boolean>,
                  })
                : '',
            props.options?.closeButton
                ? h(
                      'button',
                      {
                          class: `${cssPrefix}btn-close`,
                          role: 'button',
                          type: 'button',
                          onClick: () =>
                              removeNotificationItem(timerId, props.options, provider.value),
                      },
                      '×'
                  )
                : '',
            h(
                'div',
                {
                    class: `${cssPrefix}notification-title`,
                },
                toDisplayString(props.options?.title)
            ),
            h('div', {
                class: `${cssPrefix}notification-message`,
                innerHTML: props.options?.message,
            }),
        ]
    );
}
