import { useState } from 'react';
import { SidebarLayout, useSidebarLayout } from '@/lib/ui-library/layouts/SidebarLayout';
import { LayoutRow } from '@/lib/ui-library/components/LayoutRow';
import { Truck, BookOpen, Settings, Bell, ChevronRight, LayoutDashboard, AlertCircle, CheckCircle, AlertTriangle, CloudRain, Clock } from 'lucide-react';

function ToolbarContent() {
  const { toggleCollapse } = useSidebarLayout();

  return (
    <LayoutRow
      slots={2}
      widthMode="full"
      heightMode="fixed"
      height={56}
      paddingX="md"
      paddingY="sm"
      componentVerticalAlign="center"
      slotGap="md"
      className="bg-white border-b border-gray-200"
      components={[
        {
          component: (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleCollapse}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
                data-testid="toggle-sidebar-btn"
              >
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Truck className="h-4 w-4 text-white" />
                </div>
              </button>
              <ChevronRight className="h-3 w-3 text-gray-400 hidden sm:block" />
              <span className="text-sm font-semibold text-gray-900">Fleet Manager</span>
            </div>
          ),
          align: 'left',
          slot: 0,
        },
        {
          component: (
            <div className="relative flex items-center justify-center h-8">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </div>
          ),
          align: 'right',
          slot: 1,
        },
        {
          component: (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JR
            </div>
          ),
          align: 'right',
          slot: 1,
        },
      ]}
    />
  );
}

function SidebarContent() {
  const { collapsed } = useSidebarLayout();

  return (
    <div className="h-full bg-slate-800 text-white flex flex-col">
      <div className="p-4 flex items-center gap-3 border-b border-slate-700">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Truck className="h-4 w-4 text-white" />
        </div>
        {!collapsed && <span className="font-semibold text-sm">Fleet Manager</span>}
      </div>
      <nav className="flex-1 p-2 flex flex-col gap-1">
        {[
          { icon: LayoutDashboard, label: 'Dashboard', active: true },
          { icon: Truck, label: 'Trips', active: false },
          { icon: BookOpen, label: 'Catalogs', active: false },
          { icon: Settings, label: 'Settings', active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
            data-testid={`sidebar-item-${item.label.toLowerCase()}`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
}

function BottomNavContent() {
  const [active, setActive] = useState('dashboard');

  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trips', label: 'Trips', icon: Truck },
    { id: 'catalogs', label: 'Catalogs', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className="flex items-center justify-around bg-white border-t border-gray-200 py-2"
      data-testid="bottom-nav"
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
            active === item.id ? 'text-blue-600' : 'text-gray-400'
          }`}
          data-testid={`bottom-nav-item-${item.id}`}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[11px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

const notifications = [
  { id: 1, icon: AlertCircle, iconColor: 'text-gray-500', bgColor: 'bg-gray-100', title: 'Driver Check-in', desc: 'John Smith checked in at loading dock' },
  { id: 2, icon: CheckCircle, iconColor: 'text-green-500', bgColor: 'bg-green-100', title: 'Trip Completed', desc: 'TRP-003 successfully delivered to Seattle' },
  { id: 3, icon: AlertTriangle, iconColor: 'text-red-500', bgColor: 'bg-red-100', title: 'Maintenance Alert', desc: 'Vehicle #247 requires immediate inspection' },
  { id: 4, icon: CloudRain, iconColor: 'text-blue-500', bgColor: 'bg-blue-100', title: 'Weather Advisory', desc: 'Heavy rain expected in North region' },
  { id: 5, icon: Clock, iconColor: 'text-orange-500', bgColor: 'bg-orange-100', title: 'Trip Delay', desc: 'TRP-005 delayed by 45 minutes due to traffic' },
  { id: 6, icon: AlertCircle, iconColor: 'text-gray-500', bgColor: 'bg-gray-100', title: 'Driver Check-in', desc: 'Mike Johnson checked in at warehouse B' },
  { id: 7, icon: CheckCircle, iconColor: 'text-green-500', bgColor: 'bg-green-100', title: 'Delivery Confirmed', desc: 'TRP-008 package signed by recipient' },
  { id: 8, icon: AlertTriangle, iconColor: 'text-red-500', bgColor: 'bg-red-100', title: 'Fuel Alert', desc: 'Vehicle #189 fuel below 15%' },
  { id: 9, icon: Clock, iconColor: 'text-orange-500', bgColor: 'bg-orange-100', title: 'ETA Update', desc: 'TRP-012 arrival updated to 3:45 PM' },
  { id: 10, icon: CheckCircle, iconColor: 'text-green-500', bgColor: 'bg-green-100', title: 'Route Optimized', desc: 'New route saves 23 min for TRP-015' },
];

function DashboardContent() {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="text-center text-gray-400 py-12 text-sm">
          GoogleMap - mobile
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900" data-testid="alerts-title">
            Alerts & Notifications
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-center gap-3 px-4 py-3"
              data-testid={`notification-${notif.id}`}
            >
              <div className={`w-9 h-9 rounded-full ${notif.bgColor} flex items-center justify-center flex-shrink-0`}>
                <notif.icon className={`h-4 w-4 ${notif.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{notif.title}</p>
                <p className="text-xs text-gray-500 truncate">{notif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SidebarLayoutBottomNavPage() {
  return (
    <SidebarLayout
      sidebarContent={<SidebarContent />}
      toolbarContent={<ToolbarContent />}
      bottomNavContent={<BottomNavContent />}
      sidebarExpandedWidth={240}
      sidebarCollapsedWidth={64}
      toolbarHeight={56}
      mainPaddingX={16}
      mainPaddingY={16}
      className="h-screen w-screen"
    >
      <DashboardContent />
    </SidebarLayout>
  );
}
