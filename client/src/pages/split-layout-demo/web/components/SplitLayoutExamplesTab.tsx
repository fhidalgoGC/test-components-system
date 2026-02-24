import { BasicExample } from './BasicExample';
import { ReversedExample } from './ReversedExample';
import { ScrollExample } from './ScrollExample';
import { CustomRatioExample } from './CustomRatioExample';
import { LayoutModesExample } from './LayoutModesExample';
import { BackgroundImageExample } from './BackgroundImageExample';

export function SplitLayoutExamplesTab() {
  return (
    <>
      <BasicExample />
      <BackgroundImageExample />
      <ReversedExample />
      <ScrollExample />
      <CustomRatioExample />
      <LayoutModesExample />
    </>
  );
}
