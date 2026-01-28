import { UtensilsCrossed, Wine, Cake } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-[var(--cream)]">
      {/* Hero Section */}
      <section className="relative h-[780px] w-full bg-[var(--black-primary)]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.png')",
          }}
        />
        <div className="absolute inset-0 bg-[#0A0A0A99]" />
        <div className="relative flex h-full flex-col justify-center gap-6 px-[120px] max-w-[800px]">
          <span className="inline-flex self-start rounded-full bg-[var(--gold-muted)] px-5 py-2.5 text-[13px] font-medium tracking-[0.5px] text-[var(--gold-light)] font-body border border-[var(--gold-primary)]/30">
            Experiencias exclusivas desde 2020
          </span>
          <h1 className="text-[64px] font-bold leading-[1.1] text-[var(--text-light)] font-display">
            Experiencias gastronómicas
            <br />
            gourmet a domicilio
          </h1>
          <p className="max-w-[600px] text-lg leading-[1.6] text-[var(--text-light-muted)] font-body">
            Tablas de quesos artesanales, charcutería premium y servicios de chef privado para eventos, celebraciones y momentos especiales.
          </p>
          <div className="flex gap-5">
            <button className="rounded-lg bg-[var(--gold-primary)] px-9 py-[18px] text-base font-semibold text-[var(--black-primary)] font-body hover:bg-[var(--gold-light)] transition-colors">
              Ordenar ahora
            </button>
            <button className="rounded-lg border border-[var(--gold-primary)]/50 bg-[var(--gold-primary)]/10 px-9 py-[18px] text-base font-semibold text-[var(--gold-light)] font-body hover:bg-[var(--gold-primary)]/20 transition-colors">
              Cotizar evento
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col gap-12 bg-[var(--ivory)] px-[120px] py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-[2px] text-[var(--gold-dark)] font-body">
            NUESTRA HISTORIA
          </span>
          <h2 className="text-center text-5xl font-bold leading-[1.2] text-[var(--text-dark)] font-display">
            Pasión por la gastronomía,
            <br />
            compromiso con la excelencia
          </h2>
        </div>
        <div className="flex gap-[60px]">
          <div className="flex flex-1 flex-col gap-6">
            <p className="text-lg leading-[1.7] text-[var(--text-dark-muted)] font-body">
              Creamos experiencias gastronómicas únicas que transforman tus eventos y celebraciones en momentos inolvidables. Desde nuestras icónicas tablas de charcutería hasta servicios de chef privado, cada detalle está cuidadosamente diseñado para deleitar tus sentidos.
            </p>
            <p className="text-lg leading-[1.7] text-[var(--text-dark-muted)] font-body">
              Trabajamos exclusivamente con ingredientes de la más alta calidad, inspirados en la tradición mediterránea y española. Nuestro equipo de chefs expertos combina técnica profesional con presentación artística para crear experiencias que sorprenden y enamoran.
            </p>
          </div>
          <div className="flex w-[380px] flex-col gap-8">
            <div className="flex flex-col gap-2 rounded-xl bg-[var(--black-primary)] p-8 border border-[var(--gold-primary)]/20">
              <span className="text-[42px] font-bold text-[var(--gold-primary)] font-display">500+</span>
              <span className="text-base font-medium text-[var(--text-light-muted)] font-body">Eventos realizados</span>
            </div>
            <div className="flex flex-col gap-2 rounded-xl bg-[var(--black-primary)] p-8 border border-[var(--gold-primary)]/20">
              <span className="text-[42px] font-bold text-[var(--gold-primary)] font-display">100%</span>
              <span className="text-base font-medium text-[var(--text-light-muted)] font-body">Ingredientes premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="flex flex-col gap-14 bg-[var(--black-soft)] px-[120px] py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-[2px] text-[var(--gold-primary)] font-body">
            TABLAS ARTESANALES
          </span>
          <h2 className="text-center text-5xl font-bold leading-[1.2] text-[var(--text-light)] font-display">
            Nuestras tablas de charcutería
          </h2>
          <p className="text-center text-lg text-[var(--text-light-muted)] font-body">
            Perfectas para cualquier ocasión, desde cenas íntimas hasta grandes celebraciones
          </p>
        </div>

        {/* Product Grid - 3 cards */}
        <div className="flex gap-7">
          <ProductCard
            image="/images/tabla1.png"
            title="Salamanca"
            subtitle="1-2 personas"
            description="Perfecta para una cena íntima. Selección curada de 3 quesos artesanales, embutidos premium y acompañamientos."
            price="$45"
          />
          <ProductCard
            image="/images/tabla2.png"
            title="Malasaña"
            subtitle="2-4 personas"
            description="Ideal para reuniones pequeñas. Variedad de 5 quesos, charcutería española, frutas frescas y frutos secos."
            price="$75"
          />
          <ProductCard
            image="/images/tabla3.png"
            title="Andalucía"
            subtitle="4-6 personas"
            description="Para celebraciones especiales. Gran selección de 7 quesos premium, embutidos ibéricos y acompañamientos gourmet."
            price="$120"
          />
        </div>

        {/* Featured Product Card */}
        <div className="flex h-[360px] overflow-hidden rounded-2xl bg-[var(--black-medium)] border border-[var(--gold-primary)]/20">
          <div
            className="h-full w-[480px] rounded-l-2xl bg-cover bg-center"
            style={{ backgroundImage: "url('/images/tabla1.png')" }}
          />
          <div className="flex flex-1 flex-col justify-center gap-5 p-10">
            <h3 className="text-4xl font-bold text-[var(--text-light)] font-display">Serrano</h3>
            <span className="text-base font-medium text-[var(--gold-primary)] font-body">8-10 personas</span>
            <p className="text-base leading-[1.7] text-[var(--text-light-muted)] font-body">
              La experiencia definitiva. Tabla espectacular con 10+ quesos internacionales, charcutería premium, frutas de temporada, frutos secos, mermeladas artesanales y más.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-[var(--gold-light)] font-body">$185</span>
              <button className="rounded-lg bg-[var(--gold-primary)] px-8 py-4 text-base font-semibold text-[var(--black-primary)] font-body hover:bg-[var(--gold-light)] transition-colors">
                Ordenar ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="flex flex-col gap-14 bg-[var(--black-primary)] px-[120px] py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-[2px] text-[var(--gold-primary)] font-body">
            EVENTOS EXCLUSIVOS
          </span>
          <h2 className="text-center text-5xl font-bold leading-[1.2] text-[var(--text-light)] font-display">
            Grazing tables para tus eventos
          </h2>
          <p className="text-center text-lg text-[var(--text-light-muted)] font-body">
            Impresionantes mesas de degustación para bodas, eventos corporativos y celebraciones
          </p>
        </div>
        <div className="flex gap-8">
          {/* Regular Event Card */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[var(--black-medium)] border border-[var(--gold-primary)]/20">
            <div
              className="h-[180px] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/evento3.png')" }}
            />
            <div className="flex flex-col gap-6 p-8">
            <h3 className="text-[28px] font-bold text-[var(--text-light)] font-display">Grazing Table Regular</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-base text-[var(--text-light-muted)] font-body">• Mínimo 20 personas</li>
              <li className="text-base text-[var(--text-light-muted)] font-body">• Selección de 8 quesos artesanales</li>
              <li className="text-base text-[var(--text-light-muted)] font-body">• Charcutería premium variada</li>
              <li className="text-base text-[var(--text-light-muted)] font-body">• Frutas frescas y secas</li>
              <li className="text-base text-[var(--text-light-muted)] font-body">• Presentación elegante</li>
            </ul>
            <span className="text-2xl font-semibold text-[var(--gold-primary)] font-body">Desde $18 por persona</span>
            <button className="w-full rounded-lg bg-[var(--gold-primary)] py-4 text-base font-semibold text-[var(--black-primary)] font-body hover:bg-[var(--gold-light)] transition-colors">
              Cotizar mi evento
            </button>
            </div>
          </div>

          {/* Premium Event Card */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[var(--gold-primary)]">
            <div
              className="h-[180px] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/evento1.png')" }}
            />
            <div className="flex flex-col gap-6 p-8">
            <span className="self-start rounded-full bg-[var(--black-primary)]/20 px-3.5 py-1.5 text-[11px] font-bold tracking-[1px] text-[var(--black-primary)] font-body">
              MÁS POPULAR
            </span>
            <h3 className="text-[28px] font-bold text-[var(--black-primary)] font-display">Grazing Table Premium</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-base text-[var(--black-primary)]/80 font-body">• Mínimo 30 personas</li>
              <li className="text-base text-[var(--black-primary)]/80 font-body">• Selección de 12 quesos premium</li>
              <li className="text-base text-[var(--black-primary)]/80 font-body">• Charcutería ibérica de lujo</li>
              <li className="text-base text-[var(--black-primary)]/80 font-body">• Frutas exóticas y frutos secos gourmet</li>
              <li className="text-base text-[var(--black-primary)]/80 font-body">• Decoración artística personalizada</li>
              <li className="text-base text-[var(--black-primary)]/80 font-body">• Servicio de montaje incluido</li>
            </ul>
            <span className="text-2xl font-semibold text-[var(--black-primary)] font-body">Desde $28 por persona</span>
            <button className="w-full rounded-lg bg-[var(--black-primary)] py-4 text-base font-semibold text-[var(--gold-primary)] font-body hover:bg-[var(--black-soft)] transition-colors">
              Cotizar mi evento
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="flex flex-col gap-14 bg-[var(--ivory)] px-[120px] py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-[2px] text-[var(--gold-dark)] font-body">
            COMPLEMENTOS GOURMET
          </span>
          <h2 className="text-center text-5xl font-bold leading-[1.2] text-[var(--text-dark)] font-display">
            Especialidades del chef
          </h2>
          <p className="text-center text-lg text-[var(--text-dark-muted)] font-body">
            Platos premium para complementar tu experiencia gastronómica
          </p>
        </div>

        {/* Specialties Grid Row 1 */}
        <div className="flex gap-6">
          <SpecialtyCard
            icon={<UtensilsCrossed className="h-8 w-8 text-[var(--gold-primary)]" />}
            title="Paella Tradicional"
            description="Auténtica paella valenciana preparada por nuestro chef. Mínimo 8 personas."
            price="$22/persona"
          />
          <SpecialtyCard
            icon={<Wine className="h-8 w-8 text-[var(--gold-primary)]" />}
            title="Risotto Gourmet"
            description="Risotto cremoso con hongos porcini y parmesano añejo. Mínimo 6 personas."
            price="$18/persona"
          />
          <SpecialtyCard
            icon={<Cake className="h-8 w-8 text-[var(--gold-primary)]" />}
            title="Tabla de Postres"
            description="Selección de postres artesanales, frutas frescas y chocolates premium."
            price="Desde $65"
          />
        </div>

        {/* Specialties Grid Row 2 */}
        <div className="flex gap-6">
          <SpecialtyCardSimple
            title="Pavo Thanksgiving"
            description="Pavo completo con relleno gourmet y guarniciones tradicionales. 10-12 personas."
            price="$185"
          />
          <SpecialtyCardSimple
            title="Brochetas Caprese"
            description="Tomate cherry, mozzarella fresca, albahaca y reducción balsámica."
            price="$45 (20 pzas)"
          />
          <SpecialtyCardSimple
            title="Tortilla Española"
            description="Clásica tortilla de patatas con cebolla caramelizada. 6-8 porciones."
            price="$38"
          />
        </div>
      </section>

      {/* Experiences Section */}
      <section className="flex flex-col gap-14 bg-[var(--black-soft)] px-[120px] py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-[2px] text-[var(--gold-primary)] font-body">
            APRENDE Y DISFRUTA
          </span>
          <h2 className="text-center text-5xl font-bold leading-[1.2] text-[var(--text-light)] font-display">
            Experiencias y clases
          </h2>
          <p className="text-center text-lg text-[var(--text-light-muted)] font-body">
            Aprende el arte de la charcutería con nuestros expertos o disfruta de un chef privado
          </p>
        </div>
        <div className="flex gap-7">
          <ExperienceCard
            image="/images/clase-grupal.png"
            title="Clase presencial"
            description="Aprende a crear tablas de charcutería profesionales en tu hogar. Incluye todos los ingredientes y materiales."
            details={[
              "2 horas de duración",
              "Máximo 8 participantes",
              "Todos los ingredientes incluidos",
              "Certificado de participación"
            ]}
            price="$85/persona"
          />
          <ExperienceCard
            image="/images/evento1.png"
            title="Taller virtual"
            description="Clase online en vivo con nuestro chef. Aprende desde la comodidad de tu hogar con lista de compras previa."
            details={[
              "1.5 horas de duración",
              "Grupos privados disponibles",
              "Grabación disponible 7 días",
              "Q&A en vivo"
            ]}
            price="$45/persona"
          />
          <ExperienceCard
            image="/images/evento2.png"
            title="Chef privado"
            description="Experiencia culinaria completa en tu hogar. Nuestro chef prepara un menú personalizado para ti y tus invitados."
            details={[
              "Menú personalizado",
              "Compra de ingredientes incluida",
              "Servicio y limpieza",
              "Mínimo 6 personas"
            ]}
            price="Desde $65/persona"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col items-center gap-16 bg-[var(--ivory)] px-[120px] py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-[2px] text-[var(--gold-dark)] font-body">
            PROCESO SIMPLE
          </span>
          <h2 className="text-center text-5xl font-bold leading-[1.2] text-[var(--text-dark)] font-display">
            Cómo funciona
          </h2>
        </div>
        <div className="flex gap-12">
          <StepCard
            number="1"
            title="Elige tu experiencia"
            description="Selecciona la tabla, evento o servicio que mejor se adapte a tus necesidades"
          />
          <StepCard
            number="2"
            title="Reserva con 50%"
            description="Confirma tu pedido con un anticipo del 50%. El resto se paga al recibir"
          />
          <StepCard
            number="3"
            title="Entrega y disfruta"
            description="Recibe tu pedido en la fecha acordada y disfruta de una experiencia gourmet inolvidable"
          />
        </div>
        <div className="flex w-[800px] flex-col gap-3 rounded-xl bg-[var(--black-primary)] p-8 border border-[var(--gold-primary)]/20">
          <h4 className="text-lg font-semibold text-[var(--gold-primary)] font-body">Información importante</h4>
          <p className="text-[15px] text-[var(--text-light-muted)] font-body">• Costo de entrega según ubicación (consultar al reservar)</p>
          <p className="text-[15px] text-[var(--text-light-muted)] font-body">• Pedidos con mínimo 48 horas de anticipación</p>
          <p className="text-[15px] text-[var(--text-light-muted)] font-body">• Eventos grandes requieren 7 días de anticipación</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col gap-14 bg-[var(--black-primary)] px-[120px] py-[100px]">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-[2px] text-[var(--gold-primary)] font-body">
            CONTÁCTANOS
          </span>
          <h2 className="text-center text-5xl font-bold leading-[1.2] text-[var(--text-light)] font-display">
            Reserva tu experiencia gourmet
          </h2>
          <p className="text-center text-lg text-[var(--text-light-muted)] font-body">
            Estamos aquí para crear la experiencia perfecta para ti
          </p>
        </div>
        <div className="flex gap-12">
          {/* Contact Info */}
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-5 rounded-xl bg-[var(--black-medium)] p-8 border border-[var(--gold-primary)]/20">
              <h3 className="text-2xl font-bold text-[var(--text-light)] font-display">WhatsApp</h3>
              <p className="leading-[1.6] text-[var(--text-light-subtle)] font-body">
                La forma más rápida de reservar. Respuesta inmediata durante horario de atención.
              </p>
              <button className="w-full rounded-lg bg-[var(--gold-primary)] py-4 text-base font-semibold text-[var(--black-primary)] font-body hover:bg-[var(--gold-light)] transition-colors">
                Enviar mensaje
              </button>
            </div>
            <div className="flex flex-col gap-4 rounded-xl bg-[var(--black-medium)] p-8 border border-[var(--gold-primary)]/20">
              <h3 className="text-2xl font-bold text-[var(--text-light)] font-display">Teléfono</h3>
              <span className="text-[28px] font-semibold text-[var(--gold-primary)] font-body">+1 (555) 123-4567</span>
              <p className="leading-[1.8] text-[var(--text-light-subtle)] font-body">
                Lun - Sáb: 9:00 AM - 8:00 PM
                <br />
                Dom: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-1 flex-col gap-6 rounded-xl bg-[var(--black-medium)] p-9 border border-[var(--gold-primary)]/20">
            <h3 className="text-2xl font-bold text-[var(--text-light)] font-display">Solicita una cotización</h3>
            <p className="leading-[1.6] text-[var(--text-light-subtle)] font-body">
              Cuéntanos sobre tu evento y te responderemos con una propuesta personalizada
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="h-[52px] rounded-lg border border-[var(--gold-primary)]/30 bg-[var(--black-soft)] px-4 text-[var(--text-light)] placeholder:text-[var(--text-light-subtle)] font-body focus:outline-none focus:border-[var(--gold-primary)]"
              />
              <input
                type="email"
                placeholder="Tu email"
                className="h-[52px] rounded-lg border border-[var(--gold-primary)]/30 bg-[var(--black-soft)] px-4 text-[var(--text-light)] placeholder:text-[var(--text-light-subtle)] font-body focus:outline-none focus:border-[var(--gold-primary)]"
              />
              <input
                type="tel"
                placeholder="Tu teléfono"
                className="h-[52px] rounded-lg border border-[var(--gold-primary)]/30 bg-[var(--black-soft)] px-4 text-[var(--text-light)] placeholder:text-[var(--text-light-subtle)] font-body focus:outline-none focus:border-[var(--gold-primary)]"
              />
              <textarea
                placeholder="Cuéntanos sobre tu evento..."
                className="h-[120px] resize-none rounded-lg border border-[var(--gold-primary)]/30 bg-[var(--black-soft)] p-4 text-[var(--text-light)] placeholder:text-[var(--text-light-subtle)] font-body focus:outline-none focus:border-[var(--gold-primary)]"
              />
            </div>
            <button className="w-full rounded-lg bg-[var(--gold-primary)] py-4 text-base font-semibold text-[var(--black-primary)] font-body hover:bg-[var(--gold-light)] transition-colors">
              Enviar solicitud
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col bg-[var(--black-primary)]">
        <div className="flex gap-20 px-[120px] py-20">
          <div className="flex w-[400px] flex-col gap-5">
            <span className="text-[28px] font-bold text-[var(--gold-primary)] font-display">Gourmet Experience</span>
            <p className="leading-[1.7] text-[var(--text-light-subtle)] font-body">
              Experiencias gastronómicas que transforman momentos ordinarios en recuerdos extraordinarios.
            </p>
          </div>
          <div className="flex flex-1 gap-20">
            <div className="flex flex-1 flex-col gap-4">
              <h4 className="text-base font-semibold text-[var(--gold-primary)] font-body">Productos</h4>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Tablas de charcutería</a>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Grazing tables</a>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Especialidades</a>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <h4 className="text-base font-semibold text-[var(--gold-primary)] font-body">Servicios</h4>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Clases presenciales</a>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Talleres virtuales</a>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Chef privado</a>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <h4 className="text-base font-semibold text-[var(--gold-primary)] font-body">Empresa</h4>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Sobre nosotros</a>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Contacto</a>
              <a href="#" className="text-[15px] text-[var(--text-light-subtle)] hover:text-[var(--gold-light)] font-body transition-colors">Términos y condiciones</a>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-[var(--gold-primary)]/20" />
        <div className="flex items-center justify-between px-[120px] py-8">
          <span className="text-sm text-[var(--text-light-subtle)] font-body">© 2024 Gourmet Experience. Todos los derechos reservados.</span>
          <span className="text-sm text-[var(--gold-primary)] font-body">Instagram • Facebook • WhatsApp</span>
        </div>
      </footer>
    </main>
  );
}

// Product Card Component
function ProductCard({
  image,
  title,
  subtitle,
  description,
  price,
}: {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[var(--black-medium)] border border-[var(--gold-primary)]/20">
      <div
        className="h-[280px] bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="flex flex-col gap-4 p-7">
        <h3 className="text-[28px] font-bold text-[var(--text-light)] font-display">{title}</h3>
        <span className="text-sm font-medium text-[var(--gold-primary)] font-body">{subtitle}</span>
        <p className="text-[15px] leading-[1.6] text-[var(--text-light-muted)] font-body">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-[var(--gold-light)] font-body">{price}</span>
          <button className="rounded-lg bg-[var(--gold-primary)] px-6 py-3 text-sm font-semibold text-[var(--black-primary)] font-body hover:bg-[var(--gold-light)] transition-colors">
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}

// Specialty Card with Icon
function SpecialtyCard({
  icon,
  title,
  description,
  price,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-xl bg-[var(--black-primary)] p-7 border border-[var(--gold-primary)]/20">
      {icon}
      <h3 className="text-[22px] font-bold text-[var(--text-light)] font-display">{title}</h3>
      <p className="text-[15px] leading-[1.6] text-[var(--text-light-muted)] font-body">{description}</p>
      <span className="text-lg font-semibold text-[var(--gold-primary)] font-body">{price}</span>
    </div>
  );
}

// Specialty Card Simple (without icon)
function SpecialtyCardSimple({
  title,
  description,
  price,
}: {
  title: string;
  description: string;
  price: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-xl bg-[var(--black-primary)] p-7 border border-[var(--gold-primary)]/20">
      <h3 className="text-[22px] font-bold text-[var(--text-light)] font-display">{title}</h3>
      <p className="text-[15px] leading-[1.6] text-[var(--text-light-muted)] font-body">{description}</p>
      <span className="text-lg font-semibold text-[var(--gold-primary)] font-body">{price}</span>
    </div>
  );
}

// Experience Card
function ExperienceCard({
  image,
  title,
  description,
  details,
  price,
}: {
  image: string;
  title: string;
  description: string;
  details: string[];
  price: string;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[var(--black-medium)] border border-[var(--gold-primary)]/20">
      <div
        className="h-[200px] bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="flex flex-col gap-4 p-7">
        <h3 className="text-[24px] font-bold text-[var(--text-light)] font-display">{title}</h3>
        <p className="text-[14px] leading-[1.6] text-[var(--text-light-muted)] font-body">{description}</p>
        <p className="text-sm leading-[1.8] text-[var(--text-light-subtle)] font-body whitespace-pre-line">
          {details.map((detail) => `• ${detail}`).join('\n')}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-[var(--gold-primary)] font-body">{price}</span>
          <button className="rounded-lg bg-[var(--gold-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--black-primary)] font-body hover:bg-[var(--gold-light)] transition-colors">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}

// Step Card
function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-5">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gold-primary)]">
        <span className="text-4xl font-bold text-[var(--black-primary)] font-display">{number}</span>
      </div>
      <h3 className="text-center text-2xl font-bold text-[var(--text-dark)] font-display">{title}</h3>
      <p className="text-center text-base leading-[1.6] text-[var(--text-dark-muted)] font-body">{description}</p>
    </div>
  );
}
