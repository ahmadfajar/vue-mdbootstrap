export declare type TSpinnerRecord = {
    styleTag?: ISpinnerElement;
    diameters: Set<number>;
}

export declare type TBsProgressOptionProps = {
    buffer: number;
    color: string;
    diameter: number;
    height: number;
    stroke: number;
    mode: string;
    type: string;
}

export declare interface ISpinnerElement extends Element {
    sheet?: CSSStyleSheet;
}
