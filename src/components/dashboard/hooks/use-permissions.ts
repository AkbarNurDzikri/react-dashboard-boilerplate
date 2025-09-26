import { useUser } from "@/contexts/UserContext";

export const usePermission = () => {
  const { hasPermission, hasAnyPermission, hasRole } = useUser();

  // Permission checks untuk modul tertentu
  const canAccessUsers = () => hasAnyPermission(["user.list", "user.read"]);
  const canManageUsers = () =>
    hasAnyPermission(["user.create", "user.update", "user.delete"]);
  const canAccessAnalytics = () => hasPermission("analytics.access");
  const isAdmin = () => hasRole("admin");

  return {
    canAccessUsers,
    canManageUsers,
    canAccessAnalytics,
    isAdmin,
    hasPermission,
    hasAnyPermission,
    hasRole,
  };
};
