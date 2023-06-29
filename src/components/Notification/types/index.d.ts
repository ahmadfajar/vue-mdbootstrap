import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    UnwrapNestedRefs,
    VNodeProps
} from 'vue';

export declare type TNotificationPosition =
    'top-right' | 'top-left' | 'top-center' | 'top-full-width' |
    'bottom-right' | 'bottom-left' | 'bottom-center' | 'bottom-full-width';

export declare type TNotificationVariant = 'default' | 'info' | 'success' | 'error' | 'warning' | 'custom';

export declare type TNotificationOption = {
    message: string;
    oid?: string;
    title?: string;
    timeout?: number;
    variant?: TNotificationVariant;
    position?: TNotificationPosition;
    clickClose?: boolean;
    closeButton?: boolean;
    preventDuplicates?: boolean;
    progressBar?: boolean;
}

export declare type TNotificationItem = {
    [N in TNotificationPosition]: TNotificationOption[];
}

export declare type TNotificationItemOptionProps = {
    options?: TNotificationOption;
}

export declare type TNotificationBarOptionProps = {
    timeout?: number;
    pause?: boolean;
}

export declare interface INotificationProvider {
    /**
     * Get the notification holder.
     */
    get notification(): UnwrapNestedRefs<TNotificationItem>;

    /**
     * Create and display new Notification.
     *
     * @param item The notification to be added.
     */
    add(item: string | TNotificationOption): TNotificationOption | null;

    /**
     * Close all notification and remove from the DOM.
     */
    clearAll(): void;

    /**
     * Alias for {@link remove} method.
     *
     * @param item The notification to be removed.
     */
    close(item: TNotificationOption): void;

    /**
     * Close and remove a notification from the DOM.
     *
     * @param item The notification to be removed.
     */
    remove(item: TNotificationOption): void;

    /**
     * Close and remove notification by its variant.
     *
     * @param variant The notification variant to be removed.
     */
    removeByType(variant: TNotificationVariant): void;

    /**
     * Shortcut method to create and display Error Notification.
     *
     * @param option The notification configuration or message.
     * @param title  The notification title.
     */
    error(option: string | TNotificationOption, title?: string): TNotificationOption | null;

    /**
     * Shortcut method to create and display Info Notification.
     *
     * @param option The notification configuration or message.
     * @param title  The notification title.
     */
    info(option: string | TNotificationOption, title?: string): TNotificationOption | null;

    /**
     * Shortcut method to create and display Success Notification.
     *
     * @param option The notification configuration or message.
     * @param title  The notification title.
     */
    success(option: string | TNotificationOption, title?: string): TNotificationOption | null;

    /**
     * Shortcut method to create and display Warning Notification.
     *
     * @param option The notification configuration or message.
     * @param title  The notification title.
     */
    warning(option: string | TNotificationOption, title?: string): TNotificationOption | null;
}

export declare type TBsNotificationItem = ComponentObjectPropsOptions<TNotificationItemOptionProps>;

export declare type TBsNotificationBar = ComponentObjectPropsOptions<TNotificationBarOptionProps>;

export declare const BsNotification: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps;
    };
};

export declare const BsNotificationPlugin: {
    new(): Plugin;
};
