import { ReactNode } from 'react';
import styles from '../css/LoginCard.module.css';

interface ProvidersOnlyLayoutProps {
  headerSection: ReactNode;
  providersSection: ReactNode;
}

export const ProvidersOnlyLayout = ({
  headerSection,
  providersSection,
}: ProvidersOnlyLayoutProps) => {
  return (
    <>
      <div className={styles.headerSection}>
        {headerSection}
      </div>
      {providersSection}
    </>
  );
};
