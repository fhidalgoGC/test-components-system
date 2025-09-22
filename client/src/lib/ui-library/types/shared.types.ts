export type Device = 'mobile' | 'tablet' | 'desktop';

export type Orientation = 'portrait' | 'landscape';

export type VisibilitySetting = 'visible' | 'hidden';

export interface BreakpointRule {
  minWidth: number;
  maxWidth: number; // Use Infinity for "no upper limit"
  visibility: VisibilitySetting;
}

export interface VisibilityConfig {
  allowedDevices?: Device[];
  allowedOrientations?: Orientation[];
  breakpoints?: BreakpointRule[];
  defaultVisibility?: VisibilitySetting; // defaults to 'visible'
}