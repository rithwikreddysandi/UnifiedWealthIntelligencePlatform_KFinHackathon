"use client";

export default function RolesPage() {
  const roles = [
    {
      role: "ADMIN",
      permissions: "Full Platform Access",
    },
    {
      role: "OPERATIONS",
      permissions: "Verification, Reviews, Escalations",
    },
    {
      role: "COMPLIANCE",
      permissions: "AML, Monitoring, Audit",
    },
    {
      role: "INVESTOR",
      permissions: "Portfolio & Investments",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Role Management</h1>

        <p className="mt-2 text-[var(--muted)]">Platform role definitions</p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="p-5 text-left">Role</th>

              <th className="p-5 text-left">Permissions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr
                key={role.role}
                className="border-b border-[var(--card-border)]"
              >
                <td className="p-5 font-bold">{role.role}</td>

                <td className="p-5">{role.permissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
