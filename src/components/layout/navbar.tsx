"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/tablas", label: "Tablas" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/servicios", label: "Servicios" },
  { href: "/talleres", label: "Talleres" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <Container>
        <nav className="flex items-center justify-between h-16" aria-label="Principal">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold text-stone-900 tracking-tight"
          >
            La Tabla
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                  Iniciar sesión
                </button>
              </SignInButton>
            </SignedOut>

            <Link href="/carrito" className="relative" aria-label="Carrito">
              <IconButton label="Carrito" size="sm">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-700 text-[10px] font-bold text-white flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </IconButton>
            </Link>

            {/* Mobile toggle */}
            <IconButton
              label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              size="sm"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </IconButton>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200",
          mobileOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <ul className="border-t border-stone-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-sm font-medium text-stone-700 hover:text-stone-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
