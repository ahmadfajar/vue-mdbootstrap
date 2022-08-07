import Helper from "../../../utils/Helper";

export function useSizeOrWh(
    size?: string | number | undefined,
    widthOrHeight?: string | number | undefined,
): string {
    if (Helper.isEmpty(size) && Helper.isEmpty(widthOrHeight)) {
        return "100%";
    } else if (!Helper.isEmpty(size)) {
        return Helper.sizeUnit(size)
    } else {
        return Helper.sizeUnit(widthOrHeight);
    }
}
