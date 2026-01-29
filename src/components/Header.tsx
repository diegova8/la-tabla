import Link from "next/link";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/events", label: "Events" },
  { href: "/signature", label: "Signature" },
  { href: "/services", label: "Services" },
  { href: "/chef-specialties", label: "Menu" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/ordering", label: "Ordering" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full px-6 md:px-12 lg:px-[120px] py-8">
      <Link href="/" className="text-[28px] font-medium text-[var(--text-primary)] font-display">
        La Tabla
      </Link>
      <nav className="hidden xl:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[15px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="flex items-center justify-center px-8 py-3.5 rounded-3xl border border-[var(--soft-gold)] text-[15px] font-medium text-[var(--soft-gold)] font-body hover:bg-[var(--soft-gold)] hover:text-[var(--charcoal-black)] transition-colors"
        >
          Contact
        </Link>
      </nav>
      {/* Mobile menu button */}
      <button className="xl:hidden flex flex-col gap-1.5 p-2">
        <span className="w-6 h-0.5 bg-[var(--text-primary)]"></span>
        <span className="w-6 h-0.5 bg-[var(--text-primary)]"></span>
        <span className="w-6 h-0.5 bg-[var(--text-primary)]"></span>
      </button>
    </header>
  );
}
