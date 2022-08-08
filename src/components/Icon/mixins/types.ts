export type TIconData = {
    id: number;
    name: string;
    icon?: string;
    category?: string;
    variant?: string;
    data?: string;
}

export type TSizeOptionProps = {
    size?: number;
    height?: number;
    width?: number;
}

export type TBsIconOptionProps = TSizeOptionProps & {
    pulse: boolean;
    spin: boolean;
    icon?: string;
    flip?: string;
    rotate?: string | number;
}
