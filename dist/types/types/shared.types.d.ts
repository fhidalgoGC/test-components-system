export type Device = 'mobile' | 'tablet' | 'desktop';
export type Orientation = 'portrait' | 'landscape';
export type VisibilitySetting = 'visible' | 'hidden';
export interface BreakpointRule {
    minWidth: number;
    maxWidth: number;
    visibility: VisibilitySetting;
}
export interface VisibilityConfig {
    allowedDevices?: Device[];
    allowedOrientations?: Orientation[];
    breakpoints?: BreakpointRule[];
    defaultVisibility?: VisibilitySetting;
}
//# sourceMappingURL=shared.types.d.ts.map