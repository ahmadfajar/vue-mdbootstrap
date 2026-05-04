import type { ComponentObjectPropsOptions } from 'vue';

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
  variant: TNotificationVariant | string;
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

export declare type TBsNotificationItem = ComponentObjectPropsOptions<TNotificationItemOptionProps>;

export declare type TBsNotificationBar = ComponentObjectPropsOptions<TNotificationBarOptionProps>;

// export declare const BsNotification: {
//   new (): {
//     $props: AllowedComponentProps & ComponentCustomProps & VNodeProps;
//   };
// };
//
// export declare const BsNotificationPlugin: ObjectPlugin;
