import React from "react";

/**
 * Props for the GCDivider component
 * Provides a Material Design-inspired divider with horizontal/vertical orientations
 */
export interface GCDividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, "className"> {
  /**
   * Whether the divider should be inset (with margin)
   * @default false
   */
  inset?: boolean;

  /**
   * Whether the divider should be vertical
   * @default false (horizontal)
   */
  vertical?: boolean;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * Test ID for testing purposes
   */
  "data-testid"?: string;

  foo?: string;
}

/**
 * Default values for GCDivider props
 */
export const GC_DIVIDER_DEFAULTS = {
  inset: false,
  vertical: false,
  className: "",
} as const;
