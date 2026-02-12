import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-end gap-4 px-8 py-4 border-b border-stone-200">
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
