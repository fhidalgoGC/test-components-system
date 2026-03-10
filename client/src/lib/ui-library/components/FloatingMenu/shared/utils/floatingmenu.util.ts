import { useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import type {
  FloatingMenuLayout,
  FloatingMenuSectionConfig,
  FloatingMenuItemConfig,
  FloatingMenuSelectionStyle,
  InternalFloatingMenuController,
} from '../types';

export const getLayoutStyles = (layout?: FloatingMenuLayout): CSSProperties => {
  if (!layout) return {};

  const style: CSSProperties = {};

  if (layout.widthMode === 'full') {
    style.width = '100%';
  } else if (layout.widthMode === 'fixed' && layout.width) {
    style.width = typeof layout.width === 'number' ? `${layout.width}px` : layout.width;
  } else if (layout.widthMode === 'auto') {
    style.width = 'auto';
  }

  if (layout.minWidth) {
    style.minWidth = typeof layout.minWidth === 'number' ? `${layout.minWidth}px` : layout.minWidth;
  }
  if (layout.maxWidth) {
    style.maxWidth = typeof layout.maxWidth === 'number' ? `${layout.maxWidth}px` : layout.maxWidth;
  }

  if (layout.heightMode === 'full') {
    style.height = '100%';
  } else if (layout.heightMode === 'fixed' && layout.height) {
    style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
  } else if (layout.heightMode === 'auto') {
    style.height = 'auto';
  }

  if (layout.minHeight) {
    style.minHeight = typeof layout.minHeight === 'number' ? `${layout.minHeight}px` : layout.minHeight;
  }
  if (layout.maxHeight) {
    style.maxHeight = typeof layout.maxHeight === 'number' ? `${layout.maxHeight}px` : layout.maxHeight;
  }

  return style;
};

export const getSectionStyles = (config?: FloatingMenuSectionConfig): CSSProperties => {
  if (!config) return {};

  const style: CSSProperties = {};

  if (config.heightMode === 'full') {
    style.height = '100%';
  } else if (config.heightMode === 'fixed' && config.height) {
    style.height = typeof config.height === 'number' ? `${config.height}px` : config.height;
  } else if (config.heightMode === 'auto') {
    style.height = 'auto';
  }

  if (config.minHeight) {
    style.minHeight = typeof config.minHeight === 'number' ? `${config.minHeight}px` : config.minHeight;
  }
  if (config.maxHeight) {
    style.maxHeight = typeof config.maxHeight === 'number' ? `${config.maxHeight}px` : config.maxHeight;
  }

  return style;
};

export const getItemStyles = (itemConfig?: FloatingMenuItemConfig): CSSProperties => {
  if (!itemConfig) return {};

  const style: CSSProperties = {};

  if (itemConfig.heightMode === 'full') {
    style.height = '100%';
  } else if (itemConfig.heightMode === 'fixed' && itemConfig.height) {
    style.height = typeof itemConfig.height === 'number' ? `${itemConfig.height}px` : itemConfig.height;
  } else if (itemConfig.heightMode === 'auto') {
    style.height = 'auto';
  }

  if (itemConfig.minHeight) {
    style.minHeight = typeof itemConfig.minHeight === 'number' ? `${itemConfig.minHeight}px` : itemConfig.minHeight;
  }

  return style;
};

export const getSelectionStyleObj = (selectionStyle?: FloatingMenuSelectionStyle): CSSProperties => {
  if (!selectionStyle) return {};
  const style: CSSProperties = {};
  if (selectionStyle.border) style.border = selectionStyle.border;
  if (selectionStyle.borderRadius) style.borderRadius = selectionStyle.borderRadius;
  if (selectionStyle.backgroundColor) style.backgroundColor = selectionStyle.backgroundColor;
  if (selectionStyle.boxShadow) style.boxShadow = selectionStyle.boxShadow;
  if (selectionStyle.outline) style.outline = selectionStyle.outline;
  if (selectionStyle.custom) Object.assign(style, selectionStyle.custom);
  return style;
};

export const useControllerSubscription = (controller?: InternalFloatingMenuController) => {
  const selectedId = useSyncExternalStore(
    (callback) => {
      if (!controller?._subscribe) return () => {};
      return controller._subscribe(callback);
    },
    () => controller?._getSelectedId?.() ?? null
  );
  return selectedId;
};

export const getGapStyle = (gap?: number | string): CSSProperties | undefined => {
  if (gap == null) return undefined;
  return { gap: typeof gap === 'number' ? `${gap}px` : gap };
};
