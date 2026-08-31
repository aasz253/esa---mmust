import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role))
    redirect("/member");

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[#d4e2fa] px-6 py-4">
          <div>
            <h1 className="font-display text-lg font-bold text-[#0f2a4a]">
              Administration
            </h1>
            <p className="text-xs text-[#6b84a8]">
              {user.name} · {user.role}
            </p>
          </div>
          <span className="rounded-full bg-[#0047ab]/20 px-3 py-1 text-xs font-medium text-[#0a55c7]">
            Secure Admin
          </span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
