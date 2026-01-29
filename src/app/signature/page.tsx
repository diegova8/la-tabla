import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Heart } from "lucide-react";

export default function SignaturePage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Page Hero */}
      <section className="flex flex-col items-center gap-6 px-6 md:px-12 lg:px-[120px] py-[80px] lg:py-[100px]">
        <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-normal leading-[1.1] text-[var(--text-primary)] font-display text-center">
          Signature Experiences
        </h1>
        <p className="text-[18px] md:text-[20px] italic leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[750px]">
          Curated moments of pure indulgence. Each board tells a story, crafted to transform your gathering into an unforgettable sensory journey.
        </p>
      </section>

      {/* Marbella Board Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-6 md:px-12 lg:px-[120px] pb-[120px]">
        {/* Image */}
        <div
          className="w-full lg:w-[600px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl bg-cover bg-center flex-shrink-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1769326541255-c6612ab334a0?w=1080&q=80')",
          }}
        />

        {/* Content */}
        <div className="flex flex-col gap-8 flex-1">
          <span className="self-start px-5 py-2 rounded-[20px] bg-[var(--soft-gold)] text-[12px] font-semibold tracking-[1.5px] text-[var(--charcoal-black)] font-body">
            SAVORY EXPERIENCE
          </span>
          <h2 className="text-[42px] md:text-[56px] font-normal leading-[1.1] text-[var(--text-primary)] font-display">
            Marbella Board
          </h2>
          <p className="text-[18px] md:text-[20px] italic leading-[1.6] text-[var(--text-secondary)] font-body">
            An homage to the sun-drenched coast of Spain. This board captures the essence of Mediterranean luxury with carefully selected premium cured meats and aged cheeses that transport you to seaside terraces and golden afternoons.
          </p>

          {/* What's Included */}
          <div className="flex flex-col gap-5">
            <span className="text-[16px] font-medium text-[var(--soft-gold)] font-body">
              What&apos;s Included
            </span>
            <div className="flex flex-col gap-3">
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Jamón Ibérico de Bellota, Prosciutto di Parma, Salchichón
              </span>
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Manchego, Mahón, aged Parmigiano-Reggiano
              </span>
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Marcona almonds, Spanish olives, quince paste
              </span>
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Artisan crackers, fresh figs, honeycomb
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <span className="text-[48px] md:text-[52px] font-light text-[var(--text-primary)] font-display">
              $185
            </span>
            <span className="text-[18px] text-[var(--text-secondary)] font-body">
              Serves 4–6
            </span>
          </div>

          <Link
            href="/contact"
            className="self-start flex items-center justify-center px-10 py-[18px] rounded-[28px] bg-[var(--soft-gold)] text-[16px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
          >
            Reserve This Experience
          </Link>
        </div>
      </section>

      {/* Divider */}
      <section className="flex justify-center py-[80px]">
        <Sparkles className="w-8 h-8 text-[var(--soft-gold)]" />
      </section>

      {/* Marie Antoinette Section */}
      <section className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 bg-[#FBF8F3] px-6 md:px-12 lg:px-[120px] py-[80px] lg:py-[120px]">
        {/* Image */}
        <div
          className="w-full lg:w-[600px] h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl bg-cover bg-center flex-shrink-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1609618299278-cc53dc850f98?w=1080&q=80')",
          }}
        />

        {/* Content */}
        <div className="flex flex-col gap-8 flex-1">
          <span className="self-start px-5 py-2 rounded-[20px] bg-[var(--soft-gold)] text-[12px] font-semibold tracking-[1.5px] text-[var(--charcoal-black)] font-body">
            SWEET INDULGENCE
          </span>
          <h2 className="text-[42px] md:text-[56px] font-normal leading-[1.1] text-[var(--text-primary)] font-display">
            Marie Antoinette
          </h2>
          <p className="text-[18px] md:text-[20px] italic leading-[1.6] text-[var(--text-secondary)] font-body">
            Let them eat cake—and chocolates, and pastries, and all things decadent. A dessert board fit for royalty, bringing together French patisserie elegance with artisan confections for an opulent finale to any celebration.
          </p>

          {/* What's Included */}
          <div className="flex flex-col gap-5">
            <span className="text-[16px] font-medium text-[var(--soft-gold)] font-body">
              What&apos;s Included
            </span>
            <div className="flex flex-col gap-3">
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Assorted French macarons, chocolate truffles, pralines
              </span>
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Mini éclairs, petit fours, madeleines
              </span>
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Fresh berries, candied fruits, edible flowers
              </span>
              <span className="text-[17px] text-[var(--text-primary)] font-body">
                • Honeycomb, salted caramel, Belgian chocolate
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <span className="text-[48px] md:text-[52px] font-light text-[var(--text-primary)] font-display">
              $165
            </span>
            <span className="text-[18px] text-[var(--text-secondary)] font-body">
              Serves 4–6
            </span>
          </div>

          <Link
            href="/contact"
            className="self-start flex items-center justify-center px-10 py-[18px] rounded-[28px] bg-[var(--soft-gold)] text-[16px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
          >
            Reserve This Experience
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col items-center gap-9 bg-[var(--charcoal-black)] px-6 md:px-12 lg:px-[120px] py-[100px]">
        <Heart className="w-10 h-10 text-[var(--soft-gold)]" />
        <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-normal leading-[1.1] text-[var(--text-on-dark)] font-display text-center">
          Create Your Perfect Moment
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--soft-gold)] font-body text-center max-w-[700px]">
          Each board is lovingly crafted to order. Reserve your experience and let us bring your vision to life.
        </p>
        <Link
          href="/contact"
          className="flex items-center justify-center px-12 py-5 rounded-[32px] bg-[var(--soft-gold)] text-[18px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
        >
          Reserve Now
        </Link>
      </section>

      <Footer />
    </main>
  );
}
