import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Users,
  ShoppingCart,
  Settings,
  User,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { SidebarMenu } from "./components/sidebar-menu";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, setUser } = useUser();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Contoh: Set user data dari localStorage atau API response
    const userData = {
      id: "e215d00b-a0d4-479d-b02f-b373ccd9f4ef",
      email: "erp.blasfolie@gmail.com",
      name: "Admin",
      roles: ["admin"],
      permissions: [
        "user.read",
        "user.update",
        "user.list",
        "role.create",
        "role.read",
        "role.update",
        "role.delete",
        "role.list",
        "permission.create",
        "permission.list",
        "permission.read",
        "permission.update",
        "permission.delete",
        "role-permission.toggle",
        "role-permission.list",
        "role-permission.read",
        "user-role.toggle",
        "user-role.read",
        "user-role.list",
        "session.delete-expired",
        "session.revoke",
        "session.list",
        "session.logout-all-devices",
        "dashboard.access",
        "analytics.access",
        "settings.access",
      ],
    };

    setUser(userData);
  }, [setUser]);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent">
                  Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">
                    {user?.name || "Loading..."}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.roles.join(", ") || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={`
          bg-white border-r border-gray-200 min-h-screen 
          transition-all duration-500 ease-in-out 
          hidden lg:block
          ${sidebarOpen ? "w-64 opacity-100" : "w-20 opacity-100"}
        `}
        >
          <div className="p-4 space-y-2 relative">
            {/* Toggle Button untuk Desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={`
                absolute -right-3 top-4 bg-white border border-gray-200 
                rounded-full w-6 h-6 hover:bg-gray-50 transition-all duration-300
                shadow-sm hover:shadow-md cursor-pointer
              `}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-3 w-3 transition-transform duration-300" />
              ) : (
                <ChevronRight className="h-3 w-3 transition-transform duration-300" />
              )}
            </Button>

            {/* Gunakan SidebarMenu component */}
            <SidebarMenu sidebarOpen={sidebarOpen} />
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={toggleSidebar}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`
          lg:hidden fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 
          transition-transform duration-500 ease-in-out transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-64
        `}
        >
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Gunakan SidebarMenu component untuk mobile */}
            <SidebarMenu
              sidebarOpen={sidebarOpen}
              onItemClick={toggleSidebar}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`
          flex-1 p-6 transition-all duration-500 ease-in-out
          ${sidebarOpen ? "lg:ml-0" : "lg:ml-0"}
        `}
        >
          <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Selamat datang, {user?.name}!
            </h2>
            <p className="text-gray-600 mb-4">Role: {user?.roles.join(", ")}</p>
            <p className="text-gray-600">
              Anda memiliki {user?.permissions.length} permissions.
            </p>

            {/* Demo konten untuk menunjukkan efek animasi */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-300 hover:scale-105"
                >
                  <h3 className="font-medium">Card {item}</h3>
                  <p className="text-sm text-gray-500">
                    Ini adalah contoh card
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex justify-around p-3">
          <Button
            variant="ghost"
            size="icon"
            className={`transition-all duration-300 ${
              sidebarOpen ? "bg-blue-50 text-blue-600 scale-110" : ""
            }`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="transition-colors duration-200"
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="transition-colors duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="transition-colors duration-200"
          >
            <BarChart3 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="transition-colors duration-200"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
