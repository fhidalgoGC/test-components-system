import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import { AppLayoutView } from "@/layouts/app-layout";
import { LibraryDashboardView } from "@/pages/library-dashboard";

const TagSelectorDemo = lazy(() => import("@/pages/responsive-demo"));
const CarouselDemo = lazy(() => import("@/pages/carousel-demo"));
const UniversalCardDemo = lazy(() => import("@/pages/universal-card-demo/UniversalCardDemo").then(m => ({ default: m.default || m.UniversalCardDemo })));
const LoginCardDemo = lazy(() => import("@/pages/login-card-demo/LoginCardDemo").then(m => ({ default: m.default || m.LoginCardDemo })));
const WrapperItemsSelectedDemo = lazy(() => import("@/pages/wrapper-items-selected-demo"));
const BottomNavDemo = lazy(() => import("@/pages/bottom-nav-demo"));
const BottomNavConfigDemo = lazy(() => import("@/pages/bottom-nav-config-demo"));
const ExternalAppDemo = lazy(() => import("@/pages/external-app-demo"));
const HeterogeneousListRegistry = lazy(() => import("@/pages/heterogeneous-list-registry"));
const HeterogeneousListElements = lazy(() => import("@/pages/heterogeneous-list-elements"));
const HeterogeneousListAsync = lazy(() => import("@/pages/heterogeneous-list-async"));
const DateDemo = lazy(() => import("@/pages/date-demo"));
const AuthTest = lazy(() => import("@/pages/auth-test"));
const LayoutRowDemo = lazy(() => import("@/pages/layout-row-demo"));
const LayoutColumnDemo = lazy(() => import("@/pages/layout-column-demo/LayoutColumnDemo"));
const NavSidebarBasic = lazy(() => import("@/pages/nav-sidebar-basic"));
const NavSidebarCustomHeader = lazy(() => import("@/pages/nav-sidebar-custom-header"));
const NavSidebarCustomFooter = lazy(() => import("@/pages/nav-sidebar-custom-footer"));
const NavSidebarNested = lazy(() => import("@/pages/nav-sidebar-nested"));
const NavSidebarScroll = lazy(() => import("@/pages/nav-sidebar-scroll"));
const NavSidebarFullCustom = lazy(() => import("@/pages/nav-sidebar-full-custom"));
const SidebarLayoutBasic = lazy(() => import("@/pages/layout-sidebar-toolbar/basic"));
const SidebarLayoutScroll = lazy(() => import("@/pages/layout-sidebar-toolbar/scroll"));
const SidebarLayoutControlled = lazy(() => import("@/pages/layout-sidebar-toolbar/controlled"));
const SidebarLayoutWithNavigation = lazy(() => import("@/pages/layout-sidebar-toolbar/with-navigation"));
const GoogleMapDemo = lazy(() => import("@/pages/google-map-demo/GoogleMapDemo"));
const NotFound = lazy(() => import("@/pages/not-found"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export function Router() {
  const [location] = useLocation();
  
  const isNavSidebarPage = location.startsWith('/components/nav-sidebar/');
  const isSidebarLayoutDemo = location.startsWith('/layouts/sidebar-layout');
  
  if (isSidebarLayoutDemo) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/layouts/sidebar-layout" component={SidebarLayoutBasic} />
          <Route path="/layouts/sidebar-layout/scroll" component={SidebarLayoutScroll} />
          <Route path="/layouts/sidebar-layout/controlled" component={SidebarLayoutControlled} />
          <Route path="/layouts/sidebar-layout/with-navigation" component={SidebarLayoutWithNavigation} />
        </Switch>
      </Suspense>
    );
  }
  
  if (isNavSidebarPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/components/nav-sidebar/basic" component={NavSidebarBasic} />
          <Route path="/components/nav-sidebar/custom-header" component={NavSidebarCustomHeader} />
          <Route path="/components/nav-sidebar/custom-footer" component={NavSidebarCustomFooter} />
          <Route path="/components/nav-sidebar/nested" component={NavSidebarNested} />
          <Route path="/components/nav-sidebar/scroll" component={NavSidebarScroll} />
          <Route path="/components/nav-sidebar/full-custom" component={NavSidebarFullCustom} />
        </Switch>
      </Suspense>
    );
  }
  
  return (
    <AppLayoutView>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={LibraryDashboardView} />
          <Route path="/home" component={LibraryDashboardView} />
          <Route path="/components/tag-selector" component={TagSelectorDemo} />
          <Route path="/components/carousel" component={CarouselDemo} />
          <Route path="/components/universal-card" component={UniversalCardDemo} />
          <Route path="/components/login-card" component={LoginCardDemo} />
          <Route path="/components/wrapper-items-selected" component={WrapperItemsSelectedDemo} />
          <Route path="/components/bottom-nav" component={BottomNavDemo} />
          <Route path="/components/bottom-nav-config" component={BottomNavConfigDemo} />
          <Route path="/external-app-demo" component={ExternalAppDemo} />
          <Route path="/components/heterogeneous-list/registry" component={HeterogeneousListRegistry} />
          <Route path="/components/heterogeneous-list/elements" component={HeterogeneousListElements} />
          <Route path="/components/heterogeneous-list/async" component={HeterogeneousListAsync} />
          <Route path="/date-demo" component={DateDemo} />
          <Route path="/auth-test" component={AuthTest} />
          <Route path="/components/layout-row" component={LayoutRowDemo} />
          <Route path="/components/layout-column" component={LayoutColumnDemo} />
          <Route path="/components/google-map" component={GoogleMapDemo} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AppLayoutView>
  );
}
