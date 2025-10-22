import type { CarouselProps } from '../types';
import { useCarouselContext } from '../providers';

export const CarouselView = (props: CarouselProps) => {
  const { children, className } = props;
  const { t } = useCarouselContext();

  return (
    <div className={className} data-testid="carousel">
      <div>
        <strong>{t('label')}</strong>
        <p>{t('description')}</p>
      </div>
      {children}
    </div>
  );
};
