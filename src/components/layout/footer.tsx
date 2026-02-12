import Link from "next/link";
import { Instagram } from "lucide-react";
import { Container } from "@/components/ui/container";

const footerLinks = {
  Productos: [
    { href: "/tablas", label: "Tablas" },
    { href: "/especialidades", label: "Especialidades" },
    { href: "/servicios", label: "Servicios" },
    { href: "/talleres", label: "Talleres" },
  ],
  Información: [
    { href: "/sobre-nosotros", label: "Sobre nosotros" },
    { href: "/contacto", label: "Contacto" },
    { href: "/#proceso", label: "Cómo funciona" },
    { href: "/#entregas", label: "Zonas de entrega" },
    { href: "/#faq", label: "Preguntas frecuentes" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold text-white">
              La Tabla
            </Link>
            <p className="mt-3 text-sm text-stone-400 max-w-sm leading-relaxed">
              Charcutería & quesos artesanales. Tablas personalizadas, eventos
              privados y talleres en Costa Rica.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://instagram.com/latabla.cr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@latablacr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-stone-400 hover:text-white transition-colors"
              >
                {/* TikTok icon (simple SVG) */}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 py-6 text-center">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} La Tabla — Chef Stewart Heigold. Todos los
            derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
