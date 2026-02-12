"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Egg,
  ShoppingCart,
  Calendar,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/ingredientes", label: "Ingredientes", icon: Egg },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/calendario", label: "Calendario", icon: Calendar },
  { href: "/admin/galeria", label: "Galería", icon: ImageIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 border-r border-stone-200 bg-stone-50 min-h-screen">
      <div className="p-6">
        <Link href="/admin" className="font-serif text-lg font-bold text-stone-900">
          La Tabla
          <span className="block text-xs font-sans font-normal text-stone-500 mt-0.5">
            Panel de administración
          </span>
        </Link>
      </div>

      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-100 text-amber-900"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Back to store */}
      <div className="px-3 pb-6 mt-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-600 transition-colors px-3"
        >
          ← Volver a la tienda
        </Link>
      </div>
    </aside>
  );
}
