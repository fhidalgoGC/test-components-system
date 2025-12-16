import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@/pages/not-found"));
import { featureRoutes } from "./feature-routes";

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        {featureRoutes.map((route: any) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
