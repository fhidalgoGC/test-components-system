import type { GridProps, GridStateComponent } from '../../shared';
import { useGrid } from '../hooks';
import styles from '../css/Grid.module.css';

function getAlignClasses(config?: GridStateComponent): string {
  const classes: string[] = [styles.stateContainer];
  const v = config?.verticalAlign ?? 'middle';
  const h = config?.horizontalAlign ?? 'center';

  if (v === 'top') classes.push(styles.vTop);
  else if (v === 'bottom') classes.push(styles.vBottom);
  else classes.push(styles.vMiddle);

  if (h === 'left') classes.push(styles.hLeft);
  else if (h === 'right') classes.push(styles.hRight);
  else classes.push(styles.hCenter);

  return classes.join(' ');
}

function renderStateContent(config: GridStateComponent | undefined, fallback: React.ReactNode): React.ReactNode {
  if (!config) return fallback;
  if (config.renderType === 'self') return fallback;
  if (config.renderType === 'component' && config.render) {
    if (typeof config.render === 'function') {
      const Component = config.render;
      return <Component />;
    }
    return config.render;
  }
  return fallback;
}

export function GridView<T>(props: GridProps<T>) {
  const { id, item, scroll, statesComponents, className } = props;

  const {
    state,
    data,
    containerRef,
    sentinelRef,
    containerStyle,
    gridStyle,
  } = useGrid(props);

  const layout = props.layout;

  const containerClasses = [
    styles.container,
    layout?.widthMode === 'full' ? styles.widthFull : layout?.widthMode === 'auto' ? styles.widthAuto : '',
    layout?.heightMode === 'full' ? styles.heightFull : layout?.heightMode === 'auto' ? styles.heightAuto : '',
    scroll?.enabled !== false ? styles.scrollable : styles.noScroll,
    className,
  ].filter(Boolean).join(' ');

  if (state === 'idle' && (!data || data.length === 0)) {
    const idleConfig = statesComponents?.idle;
    return (
      <div
        id={id}
        ref={containerRef}
        className={containerClasses}
        style={containerStyle}
        data-testid={id ? `grid-${id}` : 'grid'}
        data-state="idle"
      >
        <div className={getAlignClasses(idleConfig)}>
          {renderStateContent(idleConfig, (
            <div className={styles.defaultIdle}>
              <span>Waiting for data...</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === 'loading' && (!data || data.length === 0)) {
    const loadingConfig = statesComponents?.loading;
    return (
      <div
        id={id}
        ref={containerRef}
        className={containerClasses}
        style={containerStyle}
        data-testid={id ? `grid-${id}` : 'grid'}
        data-state="loading"
      >
        <div className={getAlignClasses(loadingConfig)}>
          {renderStateContent(loadingConfig, (
            <div className={styles.defaultLoading}>
              <div className={styles.spinner} />
              <span>Loading...</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === 'empty') {
    const emptyConfig = statesComponents?.empty;
    return (
      <div
        id={id}
        ref={containerRef}
        className={containerClasses}
        style={containerStyle}
        data-testid={id ? `grid-${id}` : 'grid'}
        data-state="empty"
      >
        <div className={getAlignClasses(emptyConfig)}>
          {renderStateContent(emptyConfig, (
            <div className={styles.defaultEmpty}>
              <span>No data available</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === 'error') {
    const errorConfig = statesComponents?.error;
    return (
      <div
        id={id}
        ref={containerRef}
        className={containerClasses}
        style={containerStyle}
        data-testid={id ? `grid-${id}` : 'grid'}
        data-state="error"
      >
        <div className={getAlignClasses(errorConfig)}>
          {renderStateContent(errorConfig, (
            <div className={styles.defaultError}>
              <span>Error loading data</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      ref={containerRef}
      className={containerClasses}
      style={containerStyle}
      data-testid={id ? `grid-${id}` : 'grid'}
      data-state={state}
    >
      <div className={styles.grid} style={gridStyle}>
        {data.map((dataItem, index) => (
          <div key={index} data-testid={`grid-item-${index}`}>
            {item.render(dataItem, index)}
          </div>
        ))}
      </div>

      {state === 'loading' && data.length > 0 && (
        statesComponents?.loading?.position === 'over' ? (
          <div className={styles.loadingOverlay}>
            <div className={getAlignClasses(statesComponents?.loading)}>
              {renderStateContent(statesComponents?.loading, (
                <div className={styles.defaultLoading}>
                  <div className={styles.spinner} />
                  <span>Loading...</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={getAlignClasses(statesComponents?.loading)}>
            {renderStateContent(statesComponents?.loading, (
              <div className={styles.defaultLoading}>
                <div className={styles.spinner} />
                <span>Loading more...</span>
              </div>
            ))}
          </div>
        )
      )}

      {scroll?.enabled !== false && (
        <div ref={sentinelRef} className={styles.sentinel} />
      )}
    </div>
  );
}
