import { ReactNode } from 'react';

interface ProvidersOnlyLayoutProps {
  providersSection: ReactNode;
}

export const ProvidersOnlyLayout = ({
  providersSection,
}: ProvidersOnlyLayoutProps) => {
  return (
    <>
      {providersSection}
    </>
  );
};
