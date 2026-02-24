import { useSplitLayout } from '../hooks/useSplitLayout.hook';
import type { SplitLayoutProps, PanelBackgroundImage } from '../types';
import styles from '../css/SplitLayout.module.css';

function PanelBackground({ config }: { config: PanelBackgroundImage }) {
  if (config.renderType === 'component') {
    return (
      <div className={styles.bgComponent} data-testid="split-panel-bg-component">
        {config.render}
      </div>
    );
  }

  return (
    <>
      {config.src && (
        <img
          src={config.src}
          alt=""
          aria-hidden="true"
          className={styles.bgImage}
          style={{
            opacity: config.opacity ?? 1,
            objectFit: config.objectFit || 'cover',
            objectPosition: config.objectPosition || 'center',
          }}
          data-testid="split-panel-bg-image"
        />
      )}
      {config.overlayColor && (
        <div
          className={styles.bgOverlay}
          style={{ backgroundColor: config.overlayColor }}
          data-testid="split-panel-bg-overlay"
        />
      )}
    </>
  );
}

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
        {mainPanel.backgroundImage && (
          <PanelBackground config={mainPanel.backgroundImage} />
        )}
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
        {secondaryPanel.backgroundImage && (
          <PanelBackground config={secondaryPanel.backgroundImage} />
        )}
        <div className={secondaryInnerClasses}>
          {secondaryPanel.render}
        </div>
      </div>
    </div>
  );
}
