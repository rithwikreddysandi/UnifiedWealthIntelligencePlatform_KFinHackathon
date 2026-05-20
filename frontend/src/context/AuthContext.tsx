"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;

  role: string | null;

  investorId: string | null;

  user: any | null;

  login: (token: string, role: string, investorId?: string | null, user?: any | null) => void;

  logout: () => void;

  loading: boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [investorId, setInvestorId] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedInvestorId = localStorage.getItem("investorId");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if(storedRole){
        setRole(storedRole)
    }

    if (storedInvestorId) {
      setInvestorId(storedInvestorId);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (
  token: string,
  role: string,
  investorId?: string | null,
  user?: any | null
) => {

  localStorage.setItem("token",token);

  localStorage.setItem("role", role);

  if (investorId) {
    localStorage.setItem("investorId", investorId);
    setInvestorId(investorId);
  } else {
    localStorage.removeItem("investorId");
    setInvestorId(null);
  }

  setToken(token);

  setRole(role);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  } else {
    localStorage.removeItem("user");
    setUser(null);
  }
};

  const logout = () => {
    localStorage.removeItem(
      "token"
    );
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
        login,
        logout,
        loading,
        role,
        investorId,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
