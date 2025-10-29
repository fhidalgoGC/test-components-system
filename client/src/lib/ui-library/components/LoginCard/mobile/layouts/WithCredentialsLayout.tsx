import { ReactNode } from 'react';
import styles from '../css/LoginCard.module.css';

interface WithCredentialsLayoutProps {
  credentialsSection: ReactNode;
  providersSection: ReactNode;
  showDivider?: boolean;
}

export const WithCredentialsLayout = ({
  credentialsSection,
  providersSection,
  showDivider = true,
}: WithCredentialsLayoutProps) => {
  return (
    <>
      {credentialsSection}
      
      {showDivider && (
        <div className={styles.orDivider}>
          <span className={styles.orText}>or</span>
        </div>
      )}
      
      {providersSection}
    </>
  );
};
