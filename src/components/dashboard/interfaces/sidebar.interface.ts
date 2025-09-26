export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  path?: string;
}

export interface SidebarMenuProps {
  sidebarOpen: boolean;
  onItemClick?: () => void;
}
