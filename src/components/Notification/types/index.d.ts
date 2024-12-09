import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNodeProps,
} from 'vue';

export declare type TNotificationPosition =
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'top-full-width'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-full-width';

export declare type TNotificationVariant =
    | 'default'
    | 'info'
    | 'success'
    | 'error'
    | 'warning'
    | 'custom';

export declare type TNotificationOption = {
    message: string;
    oid?: string;
    title?: string;
    timeout?: number;
    variant?: TNotificationVariant;
    position?: TNotificationPosition;
    clickClose?: boolean;
    closeButton?: boolean;
    iconOff?: boolean;
    preventDuplicates?: boolean;
    progressBar?: boolean;
};

export declare type TNotificationItemOptionProps = {
    variant: string | TNotificationVariant;
    message: string;
    title?: string;
    timeout?: number;
    clickClose?: boolean;
    closeButton?: boolean;
    iconOff?: boolean;
    progressBar?: boolean;
};

export declare type TNotificationBarOptionProps = {
    timeout?: number;
    pause?: boolean;
};

export declare interface INotificationProvider {
    /**
     * Get the notification data store.
     */
    get collection(): Map<TNotificationPosition, TNotificationOption[]>;

    /**
     * Create and display new Notification.
     *
     * @param data The notification to be added.
     */
    add(data: string | TNotificationOption): TNotificationOption | null;

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
     * @param data  The notification configuration or message.
     * @param title The notification title.
     */
    error(data: string | TNotificationOption, title?: string): TNotificationOption | null;

    /**
     * Shortcut method to create and display Info Notification.
     *
     * @param data  The notification configuration or message.
     * @param title The notification title.
     */
    info(data: string | TNotificationOption, title?: string): TNotificationOption | null;

    /**
     * Shortcut method to create and display Success Notification.
     *
     * @param data  The notification configuration or message.
     * @param title The notification title.
     */
    success(data: string | TNotificationOption, title?: string): TNotificationOption | null;

    /**
     * Shortcut method to create and display Warning Notification.
     *
     * @param data  The notification configuration or message.
     * @param title The notification title.
     */
    warning(data: string | TNotificationOption, title?: string): TNotificationOption | null;
}

export declare type TBsNotificationItem = ComponentObjectPropsOptions<TNotificationItemOptionProps>;

export declare type TBsNotificationBar = ComponentObjectPropsOptions<TNotificationBarOptionProps>;

export declare const BsNotification: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps;
    };
};

export declare const BsNotificationPlugin: ObjectPlugin;
