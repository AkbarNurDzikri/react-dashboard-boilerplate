import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cek apakah user memiliki role tertentu
  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) ?? false;
  };

  // Cek apakah user memiliki permission tertentu
  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  // Cek apakah user memiliki salah satu dari permissions yang diberikan
  const hasAnyPermission = (permissions: string[]): boolean => {
    return (
      permissions.some((permission) =>
        user?.permissions.includes(permission)
      ) ?? false
    );
  };

  // Fungsi logout
  const logout = () => {
    setUser(null);
    // Hapus token dari localStorage jika ada
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const value = {
    user,
    setUser,
    hasRole,
    hasPermission,
    hasAnyPermission,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook untuk menggunakan user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
