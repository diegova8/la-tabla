import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, Sparkles, Check } from "lucide-react";

export default function EventsPage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center gap-7 bg-[var(--charcoal-black)] px-6 md:px-12 lg:px-[120px] py-[80px] lg:py-[100px]">
        <h1 className="text-[36px] md:text-[52px] lg:text-[68px] font-medium leading-[1.1] text-[var(--text-on-dark)] font-display text-center">
          Charcuterie & Cheese Tables
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--soft-gold)] font-body text-center max-w-[800px]">
          Elevate your corporate events, weddings, and private celebrations with our expertly curated charcuterie and cheese displays.
        </p>
        <p className="text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[750px]">
          Perfect for cocktail hours, networking events, galas, and receptions. Our event tables are designed to impress your guests while providing exceptional quality and presentation.
        </p>
      </section>

      {/* Pricing Section */}
      <section className="flex flex-col items-center gap-[60px] px-6 md:px-12 lg:px-[120px] py-[100px]">
        {/* Pricing Header */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-[42px] md:text-[56px] font-normal text-[var(--text-primary)] font-display text-center">
            Event Pricing
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[650px]">
            Transparent pricing for your event planning. All packages include setup, service, and elegant presentation.
          </p>
        </div>

        {/* Minimum Note */}
        <div className="px-8 py-4 rounded-3xl bg-[var(--warm-beige)]">
          <span className="text-[16px] font-medium text-[var(--text-primary)] font-body">
            Minimum 25 guests required for event catering services
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row gap-10 w-full justify-center">
          {/* Regular Package */}
          <div className="flex flex-col gap-8 p-12 rounded-[20px] border-[1.5px] border-[#D4CFBF] w-full lg:w-[480px]">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[20px] font-medium text-[var(--soft-gold)] font-body text-center">
                Regular Package
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[48px] font-light text-[var(--text-primary)] font-display">
                  $18
                </span>
                <span className="text-[18px] text-[var(--text-secondary)] font-body">
                  per person
                </span>
              </div>
            </div>
            <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body text-center">
              A beautifully composed selection of artisan cured meats, premium cheeses, fresh fruits, nuts, and gourmet crackers. Perfect for most events.
            </p>
            <div className="flex flex-col gap-4">
              <FeatureItem text="Curated selection of 5 cheeses" />
              <FeatureItem text="Variety of premium cured meats" />
              <FeatureItem text="Fresh fruits & seasonal accents" />
              <FeatureItem text="Professional setup & service" />
            </div>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full py-[18px] rounded-[28px] border-[1.5px] border-[var(--text-primary)] text-[16px] font-medium text-[var(--text-primary)] font-body hover:bg-[var(--text-primary)] hover:text-[var(--bone-white)] transition-colors"
            >
              Request Quote
            </Link>
          </div>

          {/* Premium Package */}
          <div className="flex flex-col gap-8 p-12 rounded-[20px] bg-[var(--charcoal-black)] border-2 border-[var(--soft-gold)] w-full lg:w-[480px]">
            <div className="flex justify-center">
              <span className="px-5 py-2 rounded-[20px] bg-[var(--soft-gold)] text-[12px] font-semibold tracking-[1.5px] text-[var(--charcoal-black)] font-body">
                MOST POPULAR
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[20px] font-medium text-[var(--soft-gold)] font-body text-center">
                Premium Package
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[48px] font-light text-[var(--text-on-dark)] font-display">
                  $28
                </span>
                <span className="text-[18px] text-[var(--text-secondary)] font-body">
                  per person
                </span>
              </div>
            </div>
            <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body text-center">
              Our finest offering featuring rare and imported selections. Includes premium Italian meats, aged cheeses, and luxury accompaniments.
            </p>
            <div className="flex flex-col gap-4">
              <FeatureItem text="8+ artisan cheese varieties" dark />
              <FeatureItem text="Imported Italian charcuterie" dark />
              <FeatureItem text="Luxury accompaniments & truffle honey" dark />
              <FeatureItem text="Dedicated event coordinator" dark />
            </div>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full py-[18px] rounded-[28px] bg-[var(--soft-gold)] text-[16px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="flex flex-col items-center gap-[60px] bg-[var(--warm-beige)] px-6 md:px-12 lg:px-[120px] py-[100px]">
        <h2 className="text-[36px] md:text-[48px] font-medium text-[var(--text-primary)] font-display text-center">
          Why Choose La Tabla for Your Event
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          <TrustCard
            icon={<Award className="w-10 h-10 text-[var(--soft-gold)]" />}
            title="Premium Quality"
            description="Only the finest ingredients from trusted artisan producers and specialty importers."
          />
          <TrustCard
            icon={<Users className="w-10 h-10 text-[var(--soft-gold)]" />}
            title="500+ Events"
            description="Trusted by Fortune 500 companies, wedding planners, and private clients."
          />
          <TrustCard
            icon={<Sparkles className="w-10 h-10 text-[var(--soft-gold)]" />}
            title="White-Glove Service"
            description="Professional setup, presentation, and service that exceeds expectations."
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col items-center gap-10 bg-[var(--charcoal-black)] px-6 md:px-12 lg:px-[120px] py-[100px]">
        <h2 className="text-[36px] md:text-[52px] lg:text-[68px] font-medium leading-[1.1] text-[var(--text-on-dark)] font-display text-center">
          Ready to Plan Your Event?
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--soft-gold)] font-body text-center max-w-[700px]">
          Contact us for a personalized quote and let us create an unforgettable culinary experience for your guests.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            href="/contact"
            className="flex items-center justify-center px-12 py-5 rounded-[32px] bg-[var(--soft-gold)] text-[18px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center px-12 py-5 rounded-[32px] border-[1.5px] border-[var(--soft-gold)] text-[18px] font-medium text-[var(--soft-gold)] font-body hover:bg-[var(--soft-gold)] hover:text-[var(--charcoal-black)] transition-colors"
          >
            Call Us
          </Link>
        </div>
        <span className="text-[15px] text-[var(--text-secondary)] font-body text-center">
          Same-day response • Free consultation • Flexible scheduling
        </span>
      </section>

      <Footer />
    </main>
  );
}

function FeatureItem({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Check className={`w-5 h-5 ${dark ? 'text-[var(--soft-gold)]' : 'text-[var(--soft-gold)]'}`} />
      <span className={`text-[16px] ${dark ? 'text-[var(--text-on-dark)]' : 'text-[var(--text-primary)]'} font-body`}>
        {text}
      </span>
    </div>
  );
}

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      {icon}
      <h3 className="text-[24px] font-medium text-[var(--text-primary)] font-display text-center">
        {title}
      </h3>
      <p className="text-[16px] leading-[1.6] text-[var(--text-secondary)] font-body text-center">
        {description}
      </p>
    </div>
  );
}
