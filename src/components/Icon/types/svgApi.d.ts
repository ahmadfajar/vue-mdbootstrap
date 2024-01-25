import { VNode, VNodeArrayChildren } from "vue";
import { TIconData, TIconOptionProps, TRecord } from "../../../types";
/**
 * Find an icon on the Google's icon library.
 *
 * @param {string} name The icon name
 * @returns {TIconData} Icon data if icon exists on the library otherwise `undefined`.
 */
export declare function findIcon(name: string | undefined): TIconData | undefined;
export declare function googleIconUrl(theme: string | undefined, icon: string, version: number): string;
export declare function useGoogleIcon(iconObj: TIconData): Promise<TIconData>;
export declare function useRenderSvgIcon(iconData: TIconData | undefined, height: number | string | undefined, width: number | string | undefined, clazz: unknown): VNode;
export declare function useSvgClasses(props: Readonly<TIconOptionProps>): TRecord;
export declare function useCreateSvgComponent(data: string, height: number | string, width: number | string, clazz: unknown): VNode;
export declare const spinnerSvgData = "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z";
export declare function useCreateSvgNode(clazz: Array<string> | TRecord, style: Array<string> | TRecord, focusable: boolean, aspectRatio?: string | null, viewBox?: string | null, otherProps?: TRecord, children?: string | VNode | VNodeArrayChildren): VNode;
export declare function useCreateSvgCircleNode(clazz: Array<string> | TRecord, style: Array<string> | TRecord, radius: number): VNode;
export declare function useCircleSizeStyles(diameter: number): Record<string, string>;
