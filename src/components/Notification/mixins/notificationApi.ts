import type {Prop, Ref, ShallowRef, VNode} from "vue";
import {h, Teleport, toDisplayString} from "vue";
import type {
    INotificationProvider,
    TNotificationItemOptionProps,
    TNotificationOption,
    TNotificationPosition
} from "../types";
import {cssPrefix} from "../../../mixins/CommonApi";
import BsNotificationItem from "../BsNotificationItem";
import BsNotificationBar from "../BsNotificationBar";
import Helper from "../../../utils/Helper";

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
            const item = h("div", {
                    key: placement,
                    class: [`${cssPrefix}notification-container`, `${cssPrefix}notification-${placement}`]
                },
                provider.value.notification[placement].map(
                    option =>
                        h(BsNotificationItem, {
                            key: option.oid,
                            options: option as Prop<TNotificationOption>
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
    return h(Teleport, {to: "body"}, [
        h("div", {
            class: `${cssPrefix}notification`
        }, createNotificationHolder(provider))
    ]);
}

function removeNotificationItem(
    timerId: Ref<number | undefined>,
    item?: TNotificationOption,
    provider?: INotificationProvider,
) {
    clearTimeout(timerId.value);
    provider?.remove(<TNotificationOption>item);
}

export function useRenderNotificationItem(
    props: Readonly<TNotificationItemOptionProps>,
    provider: ShallowRef<INotificationProvider | undefined>,
    timerId: Ref<number | undefined>,
): VNode {
    return h("div", {
        class: [`${cssPrefix}notification-dialog`, `${cssPrefix}notification-${props.options?.variant}`],
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
                provider.value?.remove(<TNotificationOption>props.options);
            }, <number>props.options?.timeout);
        },
    }, [
        (
            props.options?.progressBar
                // @ts-ignore
                ? h(BsNotificationBar, {
                    timeout: props.options.timeout,
                    pause: !timerId.value
                })
                : ""
        ),
        (
            props.options?.closeButton
                ? h("button", {
                    class: `${cssPrefix}btn-close`,
                    role: "button",
                    type: "button",
                    onClick: () => removeNotificationItem(timerId, props.options, provider.value),
                }, "×")
                : ""
        ),
        h("div", {
            class: `${cssPrefix}notification-title`
        }, toDisplayString(props.options?.title)),
        h("div", {
            class: `${cssPrefix}notification-message`,
            innerHTML: props.options?.message
        }),
    ]);
}
