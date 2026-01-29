import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center gap-12 px-6 md:px-12 lg:px-[120px] pb-[80px]">
        {/* Hero Image */}
        <div
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1624456494702-3453929857bd?w=1080&q=80')",
          }}
        />

        {/* Hero Content */}
        <div className="flex flex-col items-center gap-8 max-w-[800px]">
          <h1 className="text-[36px] md:text-[52px] lg:text-[68px] font-normal leading-[1.1] text-[var(--text-primary)] font-display text-center">
            Curated Experiences, Crafted for Memorable Moments
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--text-secondary)] font-body text-center">
            Artisanal charcuterie boards that transform gatherings into extraordinary celebrations
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/contact"
              className="flex items-center justify-center px-10 py-[18px] rounded-[28px] bg-[var(--soft-gold)] text-[16px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
            >
              Reserve / Get a Quote
            </Link>
            <Link
              href="/collections"
              className="flex items-center justify-center px-10 py-[18px] rounded-[28px] border-[1.5px] border-[var(--text-primary)] text-[16px] font-medium text-[var(--text-primary)] font-body hover:bg-[var(--text-primary)] hover:text-[var(--bone-white)] transition-colors"
            >
              View Our Boards
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="flex flex-col items-center gap-6 bg-[var(--charcoal-black)] px-6 md:px-12 lg:px-[120px] py-[100px]">
        <p className="text-[18px] md:text-[20px] leading-[1.5] text-[var(--text-on-dark)] font-display text-center max-w-[700px]">
          Every board tells a story of craftsmanship, quality, and the art of bringing people together. We source premium ingredients, design with intention, and deliver experiences that linger long after the last bite.
        </p>
        <span className="text-[15px] text-[var(--soft-gold)] font-body">
          — The La Tabla Team
        </span>
      </section>

      {/* Features Section */}
      <section className="flex flex-col gap-20 px-6 md:px-12 lg:px-[120px] py-[100px]">
        {/* Features Header */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[36px] md:text-[48px] lg:text-[52px] font-normal text-[var(--text-primary)] font-display text-center">
            Crafted for Your Occasion
          </h2>
          <p className="text-[18px] leading-[1.5] text-[var(--text-secondary)] font-body text-center max-w-[600px]">
            From intimate gatherings to grand celebrations, each board is tailored to perfection.
          </p>
        </div>

        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[60px]">
          <div
            className="w-full lg:w-[600px] h-[300px] md:h-[400px] rounded-xl bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1549320719-b97a0b5b8294?w=1080&q=80')",
            }}
          />
          <div className="flex flex-col gap-5 flex-1">
            <h3 className="text-[32px] md:text-[42px] font-normal text-[var(--text-primary)] font-display">
              Premium Ingredients
            </h3>
            <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body">
              We partner with local artisans and specialty purveyors to source the finest cured meats, aged cheeses, and accompaniments. Every element is chosen for flavor, quality, and visual harmony.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-[60px]">
          <div
            className="w-full lg:w-[600px] h-[300px] md:h-[400px] rounded-xl bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1758369908837-38166bca7e1e?w=1080&q=80')",
            }}
          />
          <div className="flex flex-col gap-5 flex-1">
            <h3 className="text-[32px] md:text-[42px] font-normal text-[var(--text-primary)] font-display">
              Thoughtful Composition
            </h3>
            <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body">
              Our boards are composed with an artist&apos;s eye. Each arrangement balances color, texture, and flavor to create a stunning centerpiece that tastes as exceptional as it looks.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[60px]">
          <div
            className="w-full lg:w-[600px] h-[300px] md:h-[400px] rounded-xl bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1767070807536-05c89be31e25?w=1080&q=80')",
            }}
          />
          <div className="flex flex-col gap-5 flex-1">
            <h3 className="text-[32px] md:text-[42px] font-normal text-[var(--text-primary)] font-display">
              Tailored to You
            </h3>
            <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body">
              Whether it&apos;s dietary preferences, guest count, or aesthetic vision, we customize every board to match your needs. From corporate events to intimate celebrations, we bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="flex flex-col items-center gap-[60px] bg-[var(--warm-beige)] px-6 md:px-12 lg:px-[120px] py-[100px]">
        <h2 className="text-[36px] md:text-[48px] font-normal text-[var(--text-primary)] font-display text-center">
          Trusted by Discerning Hosts
        </h2>

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[48px] md:text-[56px] font-light text-[var(--soft-gold)] font-display">
              500+
            </span>
            <span className="text-[16px] text-[var(--text-secondary)] font-body">
              Events Catered
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[48px] md:text-[56px] font-light text-[var(--soft-gold)] font-display">
              98%
            </span>
            <span className="text-[16px] text-[var(--text-secondary)] font-body">
              Client Satisfaction
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[48px] md:text-[56px] font-light text-[var(--soft-gold)] font-display">
              Local
            </span>
            <span className="text-[16px] text-[var(--text-secondary)] font-body">
              Artisan Partners
            </span>
          </div>
        </div>

        {/* Testimonial */}
        <div className="flex flex-col items-center gap-6 max-w-[800px]">
          <p className="text-[18px] md:text-[22px] italic leading-[1.5] text-[var(--text-primary)] font-display text-center">
            La Tabla transformed our corporate event into something truly memorable. The attention to detail and quality of ingredients exceeded our expectations. Our clients are still talking about it.
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[16px] font-medium text-[var(--text-primary)] font-body">
              Sarah Martinez
            </span>
            <span className="text-[14px] text-[var(--text-secondary)] font-body">
              Event Director, Meridian Group
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col items-center gap-9 bg-[var(--charcoal-black)] px-6 md:px-12 lg:px-[120px] py-[100px]">
        <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-medium leading-[1.1] text-[var(--text-on-dark)] font-display text-center">
          Ready to Elevate Your Next Event?
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.5] text-[var(--soft-gold)] font-body text-center max-w-[700px]">
          Let&apos;s create something extraordinary together. Reserve your custom board or request a personalized quote.
        </p>
        <Link
          href="/contact"
          className="flex items-center justify-center px-12 py-5 rounded-[32px] bg-[var(--soft-gold)] text-[18px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
        >
          Reserve / Get a Quote
        </Link>
        <span className="text-[15px] text-[var(--text-secondary)] font-body text-center">
          Free consultation • Custom quotes • Same-day response
        </span>
      </section>

      <Footer />
    </main>
  );
}
