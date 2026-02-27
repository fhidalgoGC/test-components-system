import type { SelfSpinnerProps } from './types';
import { SelfSpinnerProvider } from './providers';
import { SelfSpinnerView } from './views';

export function SelfSpinner(props: SelfSpinnerProps) {
  const { langOverride, i18nOrder = 'local-first', ...viewProps } = props;

  return (
    <SelfSpinnerProvider langOverride={langOverride} i18nOrder={i18nOrder}>
      <SelfSpinnerView {...viewProps} />
    </SelfSpinnerProvider>
  );
}
