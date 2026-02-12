import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { ProcessSection } from "@/components/landing/process-section";
import { DeliveryZones } from "@/components/landing/delivery-zones";
import { FAQ } from "@/components/landing/faq";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { PRODUCT_TYPES } from "@/lib/constants";

export default async function Home() {
  const [featuredTablas, featuredEspecialidades] = await Promise.all([
    db.select().from(products).where(
      and(eq(products.type, PRODUCT_TYPES.TABLA), eq(products.isActive, true))
    ).orderBy(asc(products.displayOrder)).limit(3),
    db.select().from(products).where(
      and(eq(products.type, PRODUCT_TYPES.ESPECIALIDAD), eq(products.isActive, true))
    ).orderBy(asc(products.displayOrder)).limit(3),
  ]);

  return (
    <>
      <a href="#main" className="skip-to-content">
        Ir al contenido principal
      </a>
      <Navbar />
      <main id="main">
        <Hero />

        {featuredTablas.length > 0 && (
          <FeaturedProducts
            title="Nuestras Tablas"
            description="Personalizá tu tabla perfecta con los mejores ingredientes."
            products={featuredTablas}
            basePath="/tablas"
            viewAllHref="/tablas"
            viewAllLabel="Ver todas las tablas"
          />
        )}

        {featuredEspecialidades.length > 0 && (
          <FeaturedProducts
            title="Especialidades del Chef"
            description="Platos únicos preparados por el Chef Stewart para tu evento."
            products={featuredEspecialidades}
            basePath="/especialidades"
            viewAllHref="/especialidades"
            viewAllLabel="Ver especialidades"
          />
        )}

        <ProcessSection />

        {/* About the Chef */}
        <section className="py-20 bg-stone-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="/images/chef/stewart-preparando-taller.jpg"
                  alt="Chef Stewart Heigold preparando un taller"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-amber-600 font-medium text-sm uppercase tracking-widest mb-3">
                  Conocé al Chef
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
                  Chef Stewart Heigold
                </h2>
                <p className="text-stone-600 text-lg leading-relaxed mb-6">
                  Especialista en charcutería y quesos artesanales. Cada tabla es preparada con ingredientes seleccionados y presentación impecable.
                </p>
                <a
                  href="https://instagram.com/latabla.cr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium transition-colors"
                >
                  @latabla.cr en Instagram →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Servicio en Sitio */}
        <section className="py-20 bg-stone-900 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-amber-400 font-medium text-sm uppercase tracking-widest mb-3">
                  Eventos
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
                  Servicio en sitio
                </h2>
                <p className="text-stone-300 text-lg leading-relaxed mb-6">
                  Llevamos nuestra estación móvil a tu evento con todo lo necesario. Montaje profesional, iluminación y una experiencia gastronómica única para tus invitados.
                </p>
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Ver servicios para eventos →
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/images/brand/carrito-la-tabla-iluminado.jpg"
                  alt="Carrito La Tabla iluminado en evento"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <DeliveryZones />
        <FAQ />
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "La Tabla",
            description:
              "Tablas de charcutería y quesos artesanales en Costa Rica. Chef privado, eventos y talleres.",
            image: "/images/detail/jamon-queso-closeup.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "San José",
              addressCountry: "CR",
            },
            sameAs: [
              "https://instagram.com/latabla.cr",
              "https://tiktok.com/@latablacr",
            ],
            priceRange: "$$",
          }),
        }}
      />
    </>
  );
}
