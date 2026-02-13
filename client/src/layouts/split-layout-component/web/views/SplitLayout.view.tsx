import { useSplitLayout } from '../hooks/useSplitLayout.hook';
import type { SplitLayoutProps } from '../types';
import styles from '../css/SplitLayout.module.css';

export function SplitLayoutView(props: SplitLayoutProps) {
  const {
    containerClasses,
    containerStyle,
    leftPanel,
    rightPanel,
    leftClasses,
    rightClasses,
    leftInnerClasses,
    rightInnerClasses,
    leftStyle,
    rightStyle,
    leftOverlay,
    rightOverlay,
    isLeftMain,
    collapseMediaQuery,
  } = useSplitLayout(props);

  return (
    <>
      {collapseMediaQuery && <style>{collapseMediaQuery}</style>}
      <div
        className={containerClasses}
        style={containerStyle}
        data-testid="split-layout-container"
      >
        <div
          className={leftClasses}
          style={leftStyle}
          data-testid={`split-panel-left`}
          {...(isLeftMain ? { 'data-split-main': '' } : { 'data-split-secondary': '' })}
        >
          {leftOverlay && (
            <div
              className={styles.backgroundOverlay}
              style={{ backgroundColor: leftOverlay }}
              data-testid="split-overlay-left"
            />
          )}
          <div className={leftInnerClasses}>
            {leftPanel.content}
          </div>
        </div>

        <div
          className={rightClasses}
          style={rightStyle}
          data-testid={`split-panel-right`}
          {...(!isLeftMain ? { 'data-split-main': '' } : { 'data-split-secondary': '' })}
        >
          {rightOverlay && (
            <div
              className={styles.backgroundOverlay}
              style={{ backgroundColor: rightOverlay }}
              data-testid="split-overlay-right"
            />
          )}
          <div className={rightInnerClasses}>
            {rightPanel.content}
          </div>
        </div>
      </div>
    </>
  );
}
