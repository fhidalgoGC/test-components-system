import { {{FEATURE_NAME_PASCAL}}Provider, use{{FEATURE_NAME_PASCAL}} } from '../contexts';

function {{FEATURE_NAME_PASCAL}}Content() {
  const { t } = use{{FEATURE_NAME_PASCAL}}();

  return (
    <div data-testid="page-{{FEATURE_NAME}}">
      <h1>{t('app.title')}</h1>
      <p>Esta es la página del feature {{FEATURE_NAME}}.</p>
    </div>
  );
}

export default function {{FEATURE_NAME_PASCAL}}Page() {
  return (
    <{{FEATURE_NAME_PASCAL}}Provider>
      <{{FEATURE_NAME_PASCAL}}Content />
    </{{FEATURE_NAME_PASCAL}}Provider>
  );
}
