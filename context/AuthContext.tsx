"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getUserProfile } from "@/app/lib/user/profileApi";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  businessName?: string;
  profileImage?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ==============================
  // INITIAL LOAD (Backend is source of truth)
  // ==============================
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getUserProfile();
        setUser(res);
      } catch (error) {
        console.log("Initial user fetch failed:", error);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ==============================
  // LOGIN
  // ==============================
  const login = (userData: User, token: string) => {
    localStorage.setItem("accessToken", token);
    setUser(userData);
  };

  // ==============================
  // LOGOUT
  // ==============================
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  // ==============================
  // REFRESH USER (Use after profile update)
  // ==============================
  const refreshUser = async () => {
    try {
      const res = await getUserProfile();
      setUser(res);
    } catch (error) {
      console.log("Refresh failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};