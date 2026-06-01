"use client";

import { useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

import { useAuth, UserRole } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;

  allowedRoles: UserRole[];
}

export default function RoleGuard({ children, allowedRoles }: Props) {
  const { role, loading, isAuthenticated } = useAuth();

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // User not logged in
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // User logged in but doesn't have permission
    if (role && !allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [role, loading, isAuthenticated, allowedRoles, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}
