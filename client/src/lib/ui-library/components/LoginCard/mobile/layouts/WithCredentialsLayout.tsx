import { ReactNode } from 'react';
import styles from '../css/LoginCard.module.css';

interface WithCredentialsLayoutProps {
  credentialsSection: ReactNode;
  providersSection: ReactNode;
  showDivider?: boolean;
  orText?: string;
}

export const WithCredentialsLayout = ({
  credentialsSection,
  providersSection,
  showDivider = true,
  orText = 'or',
}: WithCredentialsLayoutProps) => {
  return (
    <>
      {credentialsSection}
      
      {showDivider && (
        <div className={styles.orDivider}>
          <span className={styles.orText}>{orText}</span>
        </div>
      )}
      
      {providersSection}
    </>
  );
};
