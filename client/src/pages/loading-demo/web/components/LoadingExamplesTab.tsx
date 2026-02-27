import { SpinnerSizesExample } from './SpinnerSizesExample';
import { ComponentLevelExample } from './ComponentLevelExample';
import { CustomRenderExample } from './CustomRenderExample';
import { ProviderExample } from './ProviderExample';
import { ProviderWithRefExample } from './ProviderWithRefExample';

export function LoadingExamplesTab() {
  return (
    <>
      <SpinnerSizesExample />
      <ComponentLevelExample />
      <CustomRenderExample />
      <ProviderExample />
      <ProviderWithRefExample />
    </>
  );
}
