import { useSplitLayout } from '../hooks/useSplitLayout.hook';
import type { SplitLayoutProps } from '../types';

export function SplitLayoutView(props: SplitLayoutProps) {
  const {
    containerClasses,
    containerStyle,
    mainPanel,
    secondaryPanel,
    mainClasses,
    secondaryClasses,
    mainInnerClasses,
    secondaryInnerClasses,
    mainStyle,
    secondaryStyle,
  } = useSplitLayout(props);

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      data-testid="split-layout-container"
    >
      <div
        className={mainClasses}
        style={mainStyle}
        data-testid="split-panel-main"
        data-split-main=""
      >
        <div className={mainInnerClasses}>
          {mainPanel.render}
        </div>
      </div>

      <div
        className={secondaryClasses}
        style={secondaryStyle}
        data-testid="split-panel-secondary"
        data-split-secondary=""
      >
        <div className={secondaryInnerClasses}>
          {secondaryPanel.render}
        </div>
      </div>
    </div>
  );
}
