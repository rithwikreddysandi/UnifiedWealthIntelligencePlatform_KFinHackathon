"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/services/apiClient";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await apiGet("/investors");

    if (response.ok) {
      setUsers(response.data || []);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">User Management</h1>

        <p className="mt-2 text-[var(--muted)]">
          Registered investors across the platform
        </p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="p-5 text-left">Investor ID</th>
              <th className="p-5 text-left">Name</th>
              <th className="p-5 text-left">Email</th>
              <th className="p-5 text-left">Phone</th>
              <th className="p-5 text-left">Risk Profile</th>
              <th className="p-5 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.investor_id}
                className="border-b border-[var(--card-border)]"
              >
                <td className="p-5">{user.investor_id}</td>
                <td className="p-5">{user.full_name}</td>
                <td className="p-5">{user.email}</td>
                <td className="p-5">{user.phone}</td>
                <td className="p-5">{user.risk_profile}</td>
                <td className="p-5">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
