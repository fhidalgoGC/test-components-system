import { useSplitLayoutMobile } from '../hooks/useSplitLayout.mobile.hook';
import type { SplitLayoutMobileProps } from '../types';
import type { PanelBackgroundImage } from '../../web/types';
import styles from '../css/SplitLayout.mobile.module.css';

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

export function SplitLayoutMobileView(props: SplitLayoutMobileProps) {
  const {
    containerClasses,
    containerStyle,
    mainPanel,
    panelClasses,
    panelInnerClasses,
    panelStyle,
  } = useSplitLayoutMobile(props);

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      data-testid="split-layout-container-mobile"
    >
      <div
        className={panelClasses}
        style={panelStyle}
        data-testid="split-panel-main-mobile"
      >
        {mainPanel.backgroundImage && (
          <PanelBackground config={mainPanel.backgroundImage} />
        )}
        <div className={panelInnerClasses}>
          {mainPanel.render}
        </div>
      </div>
    </div>
  );
}
