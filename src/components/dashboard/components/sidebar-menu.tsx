import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  BarChart3,
  CreditCard,
  HelpCircle,
  Home,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import type {
  MenuItem,
  SidebarMenuProps,
} from "../interfaces/sidebar.interface";

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  sidebarOpen,
  onItemClick,
}) => {
  const { hasRole, hasAnyPermission } = useUser();

  // Daftar menu items dengan requirement role/permission
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      requiredPermissions: ["dashboard.access"], // Permission umum untuk dashboard
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      requiredRoles: ["admin"], // Hanya role admin
      requiredPermissions: ["user.list", "user.read"], // Minimal punya salah satu permission ini
    },
    {
      id: "products",
      label: "Products",
      icon: ShoppingCart,
      requiredPermissions: ["product.list", "product.read"],
    },
    {
      id: "orders",
      label: "Orders",
      icon: CreditCard,
      requiredPermissions: ["order.list", "order.read"],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      requiredPermissions: ["analytics.access"],
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      requiredRoles: ["admin"], // Hanya admin yang bisa akses settings
      requiredPermissions: ["settings.access"],
    },
    {
      id: "help",
      label: "Help",
      icon: HelpCircle,
      // Tidak ada requirement, semua user bisa akses
    },
  ];

  // Fungsi untuk cek apakah menu boleh ditampilkan
  const shouldShowMenuItem = (item: MenuItem): boolean => {
    // Jika ada requiredRoles, cek apakah user memiliki salah satu role
    if (item.requiredRoles && item.requiredRoles.length > 0) {
      const hasRequiredRole = item.requiredRoles.some((role) => hasRole(role));
      if (!hasRequiredRole) return false;
    }

    // Jika ada requiredPermissions, cek apakah user memiliki salah satu permission
    if (item.requiredPermissions && item.requiredPermissions.length > 0) {
      const hasRequiredPermission = hasAnyPermission(item.requiredPermissions);
      if (!hasRequiredPermission) return false;
    }

    return true;
  };

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        if (!shouldShowMenuItem(item)) return null;

        const IconComponent = item.icon;

        return (
          <Button
            key={item.id}
            variant="ghost"
            className={`
              w-full justify-start transition-all duration-300
              ${sidebarOpen ? "px-3" : "px-2 justify-center"}
              ${location.pathname === `/dashboard/${item.id}` ? "bg-blue-50 text-blue-600" : ""}
            `}
            onClick={onItemClick}
          >
            <IconComponent
              className={`h-4 w-4 ${sidebarOpen ? "mr-3" : "mr-0"}`}
            />
            {sidebarOpen && item.label}
          </Button>
        );
      })}
    </nav>
  );
};
