import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Sobre Nosotros — La Tabla",
  description:
    "Conocé al Chef Stewart Heigold y la historia detrás de La Tabla. Charcutería & quesos artesanales en Costa Rica.",
};

export default function SobreNosotrosPage() {
  return (
    <section className="py-16">
      <Container>
        {/* Hero section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/chef/stewart-preparando-taller.jpg"
              alt="Chef Stewart Heigold preparando un taller"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <p className="text-amber-600 font-medium text-sm uppercase tracking-widest mb-3">
              Nuestra Historia
            </p>
            <Heading level={1} className="text-4xl sm:text-5xl">
              Chef Stewart Heigold
            </Heading>
            <div className="mt-6 space-y-4 text-stone-600 text-lg leading-relaxed">
              <p>
                Con años de experiencia en gastronomía y una pasión por los
                sabores auténticos, el Chef Stewart creó <strong>La Tabla</strong>{" "}
                para llevar la experiencia de la charcutería artesanal a cada
                mesa de Costa Rica.
              </p>
              <p>
                Cada tabla es diseñada con ingredientes seleccionados, combinando
                quesos importados, embutidos artesanales, frutas frescas y
                acompañamientos que crean una experiencia gastronómica única.
              </p>
              <p>
                Más que un servicio de catering, La Tabla es una experiencia.
                Desde reuniones íntimas hasta eventos corporativos, llevamos la
                mejor charcutería directamente a tu puerta.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-stone-50 rounded-2xl p-10 sm:p-16 mb-20">
          <div className="text-center mb-12">
            <Heading level={2}>Lo Que Nos Define</Heading>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                emoji: "🧀",
                title: "Ingredientes Premium",
                desc: "Seleccionamos los mejores quesos, embutidos y acompañamientos para cada tabla.",
              },
              {
                emoji: "🎨",
                title: "Presentación Impecable",
                desc: "Cada tabla es una obra de arte. El montaje y la estética son parte de la experiencia.",
              },
              {
                emoji: "✨",
                title: "Experiencia Personalizada",
                desc: "Armá tu tabla a tu gusto o dejá que el Chef diseñe la combinación perfecta para vos.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="text-4xl mb-4">{value.emoji}</div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* On-site service */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-amber-600 font-medium text-sm uppercase tracking-widest mb-3">
              Eventos
            </p>
            <Heading level={2}>Servicio en Sitio</Heading>
            <div className="mt-4 space-y-4 text-stone-600 leading-relaxed">
              <p>
                Llevamos nuestra estación móvil a tu evento con todo lo
                necesario. Montaje profesional, iluminación ambiental y una
                experiencia gastronómica que tus invitados no olvidarán.
              </p>
              <p>
                Bodas, cumpleaños, eventos corporativos, reuniones íntimas — nos
                adaptamos a cualquier formato y presupuesto.
              </p>
            </div>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 mt-6 text-amber-700 hover:text-amber-800 font-medium transition-colors"
            >
              Ver servicios para eventos →
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/brand/carrito-la-tabla-iluminado.jpg"
              alt="Carrito La Tabla iluminado en evento"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-stone-900 text-white rounded-2xl p-10 sm:p-16">
          <Heading level={2} className="text-white text-3xl">
            ¿Listo para tu próxima tabla?
          </Heading>
          <p className="mt-4 text-stone-300 text-lg max-w-lg mx-auto">
            Explorá nuestro catálogo, armá tu tabla personalizada o contactanos
            para tu próximo evento.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tablas"
              className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Ver Tablas
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-stone-600 text-stone-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
