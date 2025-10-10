export interface BottomNavigationBarConfig {
  TRIGGER_ON_MOUNT: boolean;
}

export const BottomNavigationBar_environment: BottomNavigationBarConfig = {
  TRIGGER_ON_MOUNT:
    import.meta.env.VITE_BOTTOM_NAV_TRIGGER_ON_MOUNT === "true" || false,
};
