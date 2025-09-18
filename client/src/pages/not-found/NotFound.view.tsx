import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useNotFound } from './hooks/NotFound.hook';
import styles from './css/NotFound.module.css';
import { containerClasses, cardClasses } from './css/NotFound.module';

export function NotFoundView() {
  const { t, currentTheme } = useNotFound();

  return (
    <div className={`${containerClasses(currentTheme)} ${styles.container}`} data-testid="not-found">
      <Card className={cardClasses(currentTheme)}>
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}