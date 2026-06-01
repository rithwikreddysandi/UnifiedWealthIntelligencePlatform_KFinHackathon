"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "ADMIN" | "OPERATIONS" | "COMPLIANCE" | "INVESTOR";

interface AuthContextType {
  token: string | null;

  role: UserRole | null;

  investorId: string | null;

  user: any | null;

  loading: boolean;

  login: (
    token: string,
    role: UserRole,
    investorId?: string | null,
    user?: any | null,
  ) => void;

  logout: () => void;

  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const [role, setRole] = useState<UserRole | null>(null);

  const [investorId, setInvestorId] = useState<string | null>(null);

  const [user, setUser] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");

      const storedRole = localStorage.getItem("role");

      const storedInvestorId = localStorage.getItem("investorId");

      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedRole) {
        setRole(storedRole as UserRole);
      }

      if (storedInvestorId) {
        setInvestorId(storedInvestorId);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to restore auth state:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (
    token: string,
    role: UserRole,
    investorId?: string | null,
    user?: any | null,
  ) => {
    localStorage.setItem("token", token);

    localStorage.setItem("role", role);

    setToken(token);

    setRole(role);

    if (investorId) {
      localStorage.setItem("investorId", investorId);

      setInvestorId(investorId);
    } else {
      localStorage.removeItem("investorId");

      setInvestorId(null);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
    } else {
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("investorId");

    localStorage.removeItem("user");

    setToken(null);
    setRole(null);
    setInvestorId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        investorId,
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
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
