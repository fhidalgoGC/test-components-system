import { SessionDataExample } from './SessionDataExample';
import { ProtectedRouteExample } from './ProtectedRouteExample';
import { PublicRouteExample } from './PublicRouteExample';

export function AppAuthExamplesTab() {
  return (
    <>
      <SessionDataExample />
      <ProtectedRouteExample />
      <PublicRouteExample />
    </>
  );
}
