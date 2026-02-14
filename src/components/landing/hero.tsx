import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-stone-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/detail/jamon-queso-closeup.webp"
          alt="Tabla de charcutería artesanal"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 to-stone-950/40" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p className="text-amber-500 font-medium text-sm uppercase tracking-widest mb-4">
            Chef Privado — Charcutería & Quesos
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            El arte de la
            <br />
            <span className="text-amber-400">mesa perfecta</span>
          </h1>
          <p className="mt-6 text-lg text-stone-300 leading-relaxed max-w-lg">
            Tablas artesanales personalizadas con los mejores quesos y
            charcutería. Eventos privados, talleres y experiencias
            gastronómicas únicas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/tablas">
              <Button variant="gold" size="lg">
                Ver tablas
              </Button>
            </Link>
            <Link href="/#proceso">
              <Button variant="secondary" size="lg" className="border-stone-500 text-stone-200 hover:bg-stone-800">
                Cómo funciona
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
