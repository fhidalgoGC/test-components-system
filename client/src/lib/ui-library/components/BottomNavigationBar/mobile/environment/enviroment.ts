interface BottomNavigationBarConfig {
  TRIGGER_ON_MOUNT: boolean;
}

const BottomNavigationBar: BottomNavigationBarConfig = {
  TRIGGER_ON_MOUNT:
    import.meta.env.VITE_BOTTOM_NAV_TRIGGER_ON_MOUNT === "true" || false,
};

export const environment = {
  BottomNavigationBar,
};
