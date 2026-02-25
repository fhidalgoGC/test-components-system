import { LanguageSelectorExample } from './LanguageSelectorExample';
import { SelectableExample } from './SelectableExample';
import { DefaultSelectedExample } from './DefaultSelectedExample';
import { PositionExample } from './PositionExample';
import { SectionsExample } from './SectionsExample';
import { OrderableExample } from './OrderableExample';

export function FloatingMenuExamplesTab() {
  return (
    <>
      <LanguageSelectorExample />
      <SelectableExample />
      <DefaultSelectedExample />
      <OrderableExample />
      <PositionExample />
      <SectionsExample />
    </>
  );
}
