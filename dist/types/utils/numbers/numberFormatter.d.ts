export interface NumberFormatterOptions {
    minDecimals: number;
    maxDecimals: number;
    value: number | string | null | undefined;
    formatPattern: "0.000,00" | "0,000.00";
    roundMode: "up" | "down" | "truncate";
}
export type RoundMode = "up" | "down" | "truncate";
export type FormatPattern = "0.000,00" | "0,000.00";
export interface NumberFormatterOptions {
    minDecimals: number;
    maxDecimals: number;
    value: number | string | null | undefined;
    formatPattern: FormatPattern;
    roundMode: RoundMode;
}
export declare function formatNumber({ minDecimals, maxDecimals, value, formatPattern, roundMode, }: NumberFormatterOptions): string;
//# sourceMappingURL=numberFormatter.d.ts.map