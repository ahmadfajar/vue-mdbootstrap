import {reactive} from "vue";
import type {
    INotificationProvider,
    TNotificationItem,
    TNotificationOption,
    TNotificationPosition,
    TNotificationVariant
} from "../types";
import Helper from "../../../utils/Helper";

export default class NotificationProvider implements INotificationProvider {
    private readonly _item: TNotificationItem;
    private readonly _positions: TNotificationPosition[] = [
        'top-right', 'top-left', 'top-center', 'top-full-width',
        'bottom-right', 'bottom-left', 'bottom-center', 'bottom-full-width'
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

    add(item: string | TNotificationOption): TNotificationOption | null {
        const option = this._createOption(item);
        const position = <TNotificationPosition>option.position;

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
        const oid = <string>item.oid;
        const position = <TNotificationPosition>item.position;
        this._item[position] = this.notification[position].filter(it => it.oid !== oid);
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
        const data = this._createOption(option);
        data.variant = "error";
        data.title = title;

        return this.add(data);
    }

    info(option: string | TNotificationOption, title?: string): TNotificationOption | null {
        const data = this._createOption(option);
        data.variant = "info";
        data.title = title;

        return this.add(data);
    }

    success(option: string | TNotificationOption, title?: string): TNotificationOption | null {
        const data = this._createOption(option);
        data.variant = "success";
        data.title = title;

        return this.add(data);
    }

    warning(option: string | TNotificationOption, title?: string): TNotificationOption | null {
        const data = this._createOption(option);
        data.variant = "warning";
        data.title = title;

        return this.add(data);
    }

    private _createOption(option: string | TNotificationOption): TNotificationOption {
        const defOpt = {
            position: "bottom-right" as TNotificationPosition,
            variant: "default" as TNotificationVariant,
            oid: Helper.uuid(true),
            clickClose: false,
            closeButton: true,
            // closeOnHover: false,
            timeout: 6000,
            progressBar: false,
            preventDuplicates: false,
        };

        if (Helper.isObject(option) && !Helper.isEmpty((<TNotificationOption>option).message)) {
            return {
                oid: defOpt.oid,
                variant: defOpt.variant,
                timeout: defOpt.timeout,
                position: defOpt.position,
                clickClose: defOpt.clickClose,
                closeButton: defOpt.closeButton,
                // closeOnHover: defOpt.closeOnHover,
                progressBar: defOpt.progressBar,
                preventDuplicates: defOpt.preventDuplicates,
                // @ts-ignore
                ...option,
            }
        }

        return {
            message: option.toString(),
            oid: defOpt.oid,
            variant: defOpt.variant,
            timeout: defOpt.timeout,
            position: defOpt.position,
            clickClose: defOpt.clickClose,
            closeButton: defOpt.closeButton,
            // closeOnHover: defOpt.closeOnHover,
            progressBar: defOpt.progressBar,
            preventDuplicates: defOpt.preventDuplicates,
        }
    }
}
