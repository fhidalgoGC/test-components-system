import type { GoogleMapProps } from '../types';
import { useGoogleMapContext } from '../providers';

export const GoogleMapView = (props: GoogleMapProps) => {
  const { children, className } = props;
  const { t } = useGoogleMapContext();

  return (
    <div className={className} data-testid="googlemap">
      <div>
        <strong>{t('label')}</strong>
        <p>{t('description')}</p>
      </div>
      {children}
    </div>
  );
};
