import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { LibraryDashboardView } from "@/pages/library-dashboard";
const NotFound = lazy(() => import("@/pages/not-found"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={LibraryDashboardView} />
        <Route path="/home" component={LibraryDashboardView} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
