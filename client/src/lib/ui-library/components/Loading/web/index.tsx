import type { LoadingProps } from './types/Loading.type';
import { LoadingComponentProvider } from './providers';
import { LoadingView } from './views/Loading.view';

export const Loading = (props: LoadingProps) => {
  const { langOverride, i18nOrder, ...viewProps } = props;

  return (
    <LoadingComponentProvider langOverride={langOverride} i18nOrder={i18nOrder}>
      <LoadingView {...viewProps} />
    </LoadingComponentProvider>
  );
};
