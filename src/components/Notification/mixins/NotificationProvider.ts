import type {
    INotificationProvider,
    TNotificationItem,
    TNotificationOption,
    TNotificationPosition,
    TNotificationVariant,
} from '@/components/Notification/types';
import Helper from '@/utils/Helper';
import { reactive } from 'vue';

export default class NotificationProvider implements INotificationProvider {
    private readonly _item: TNotificationItem;
    private readonly _positions: TNotificationPosition[] = [
        'top-right',
        'top-left',
        'top-center',
        'top-full-width',
        'bottom-right',
        'bottom-left',
        'bottom-center',
        'bottom-full-width',
    ];

    constructor() {
        const item = {} as TNotificationItem;

        for (let i = 0; i <= this._positions.length - 1; i++) {
            item[this._positions[i]] = [];
        }

        this._item = reactive(item);
    }

    get notification() {
        return this._item;
    }

    add(data: string | TNotificationOption): TNotificationOption | null {
        const option = this._createOption(data);
        const position = option.position as TNotificationPosition;

        if (option.preventDuplicates) {
            const keys = this.notification[position].keys();

            for (const index of keys) {
                if (
                    this._item[position][index].title === option.title &&
                    this._item[position][index].message === option.message
                ) {
                    console.warn('Duplicate notification', option);
                    return null;
                }
            }
        }
        this._item[position].push(option);

        return option;
    }

    clearAll() {
        for (let i = 0; i < this._positions.length; i++) {
            this._item[this._positions[i]] = [];
        }
    }

    close(item: TNotificationOption) {
        this.remove(item);
    }

    remove(item: TNotificationOption) {
        const oid = item.oid as string;
        const position = item.position as TNotificationPosition;
        this._item[position] = this.notification[position].filter((it) => it.oid !== oid);
    }

    removeByType(variant: TNotificationVariant) {
        for (let i = 0; i < this._positions.length; i++) {
            const keys = this.notification[this._positions[i]].keys();

            for (const index of keys) {
                if (this.notification[this._positions[i]][index].variant === variant) {
                    this.remove(this.notification[this._positions[i]][index]);
                }
            }
        }
    }

    error(option: string | TNotificationOption, title?: string): TNotificationOption | null {
        return this._doAdd(option, 'error', title);
    }

    info(option: string | TNotificationOption, title?: string): TNotificationOption | null {
        return this._doAdd(option, 'info', title);
    }

    success(option: string | TNotificationOption, title?: string): TNotificationOption | null {
        return this._doAdd(option, 'success', title);
    }

    warning(option: string | TNotificationOption, title?: string): TNotificationOption | null {
        return this._doAdd(option, 'warning', title);
    }

    private _doAdd(
        option: string | TNotificationOption,
        variant: TNotificationVariant,
        title?: string
    ): TNotificationOption | null {
        const data = this._createOption(option);
        data.variant = variant;
        data.title = title;

        return this.add(data);
    }

    private _createOption(option: string | TNotificationOption): TNotificationOption {
        const defaultOption = {
            oid: Helper.uuid(true),
            clickClose: false,
            closeButton: true,
            // closeOnHover: false,
            progressBar: false,
            preventDuplicates: false,
            position: 'bottom-right' as TNotificationPosition,
            variant: 'default' as TNotificationVariant,
            timeout: 6000,
        };

        if (Helper.isObject(option) && !Helper.isEmpty(option.message)) {
            return {
                ...defaultOption,
                ...option,
            };
        }

        return {
            ...defaultOption,
            message: option.toString(),
        };
    }
}
