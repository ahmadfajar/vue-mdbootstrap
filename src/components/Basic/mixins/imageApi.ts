import Helper from "../../../utils/Helper";

export function useSizeOrWh(
    size?: string | number | null | undefined,
    widthOrHeight?: string | number | null | undefined,
): string | null {
    if (Helper.isEmpty(size) && Helper.isEmpty(widthOrHeight)) {
        return "100%";
    } else if (!Helper.isEmpty(size)) {
        return Helper.sizeUnit(size)
    } else {
        return Helper.sizeUnit(widthOrHeight);
    }
}

export function useShapeClasses(circle?: boolean, rounded?: boolean): object {
    return {
        "rounded-circle": circle && !rounded,
        "rounded": rounded && !circle,
    }
}
