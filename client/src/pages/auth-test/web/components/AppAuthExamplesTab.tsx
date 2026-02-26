import { AppAuthProvider } from '@/lib/ui-library/providers/AppAuthProvider';
import { SessionDataExample } from './SessionDataExample';
import { ProtectedRouteExample } from './ProtectedRouteExample';
import { PublicRouteExample } from './PublicRouteExample';

export function AppAuthExamplesTab() {
  return (
    <AppAuthProvider>
      <SessionDataExample />
      <ProtectedRouteExample />
      <PublicRouteExample />
    </AppAuthProvider>
  );
}
