"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;

  allowedRoles: string[];
}

export default function RoleGuard({
  children,
  allowedRoles,
}: Props) {

  const {
    role,
    loading,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {

    if (
      !loading &&
      role &&
      !allowedRoles.includes(role)
    ) {

      router.push(
        "/unauthorized"
      );
    }

  }, [role, loading]);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>
    );
  }

  if (
    role &&
    !allowedRoles.includes(role)
  ) {

    return null;
  }

  return children;
}