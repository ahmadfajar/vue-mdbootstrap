import type {
  TNotificationOption,
  TNotificationPosition,
  TNotificationVariant,
} from '@/components/Notification/types';
import Helper from '@/utils/Helper.ts';
import { type Reactive, reactive } from 'vue';

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

export class NotificationProvider implements INotificationProvider {
  private readonly _collection: Reactive<Map<TNotificationPosition, TNotificationOption[]>>;

  constructor() {
    this._collection = reactive(new Map<TNotificationPosition, TNotificationOption[]>());
  }

  get collection(): Map<TNotificationPosition, TNotificationOption[]> {
    return this._collection;
  }

  add(data: string | TNotificationOption): TNotificationOption | null {
    const toastOption = this._createOption(data);
    const placement = toastOption.position as TNotificationPosition;
    const toastItems = this._collection.get(placement);

    if (!toastItems) {
      this._collection.set(placement, [toastOption]);
    } else {
      if (toastOption.preventDuplicates) {
        for (const toast of toastItems) {
          if (toast.message === toastOption.message && toast.title === toastOption.title) {
            console.warn('Duplicate notification', toastOption);
            return null;
          }
        }
      }

      toastItems.push(toastOption);
      this._collection.set(placement, toastItems);
    }

    return toastOption;
  }

  clearAll() {
    this._collection.clear();
  }

  close(item: TNotificationOption) {
    this.remove(item);
  }

  private _deleteIfEmpty(placement: TNotificationPosition, data?: TNotificationOption[]): void {
    if (Helper.isEmpty(data)) {
      this._collection.delete(placement);
    } else {
      this._collection.set(placement, data ?? []);
    }
  }

  remove(item: TNotificationOption) {
    const oid = item.oid as string;
    const position = item.position as TNotificationPosition;
    const toastItems = this._collection.get(position);
    const results = toastItems?.filter((it) => it.oid !== oid);

    this._deleteIfEmpty(position, results);
  }

  removeByType(variant: TNotificationVariant) {
    this._collection.forEach((values, placement) => {
      const results = values.filter((it) => it.variant !== variant);
      this._deleteIfEmpty(placement, results);
    });
  }

  error(data: string | TNotificationOption, title?: string): TNotificationOption | null {
    return this._doAdd(data, 'error', title);
  }

  info(data: string | TNotificationOption, title?: string): TNotificationOption | null {
    return this._doAdd(data, 'info', title);
  }

  success(data: string | TNotificationOption, title?: string): TNotificationOption | null {
    return this._doAdd(data, 'success', title);
  }

  warning(data: string | TNotificationOption, title?: string): TNotificationOption | null {
    return this._doAdd(data, 'warning', title);
  }

  private _doAdd(
    data: string | TNotificationOption,
    variant: TNotificationVariant,
    title?: string
  ): TNotificationOption | null {
    const option = Helper.isObject(data) ? data : ({ message: data } as TNotificationOption);
    option.variant = variant;
    option.title = title || option.title;

    return this.add(option);
  }

  private _createOption(option: string | TNotificationOption): TNotificationOption {
    const defaultOption = {
      oid: Helper.uuid(true),
      clickClose: false,
      closeButton: true,
      iconOff: false,
      progressBar: false,
      preventDuplicates: false,
      position: 'bottom-right',
      variant: 'default',
      timeout: 6000,
    } as TNotificationOption;

    if (Helper.isObject(option) && !Helper.isEmpty(option.message)) {
      return {
        ...defaultOption,
        ...option,
      };
    }

    return {
      ...defaultOption,
      message: (option as string).toString(),
    };
  }
}
