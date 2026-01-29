import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Clock, Users, Package, Video, MapPin, ChefHat, UtensilsCrossed, Star } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Page Hero */}
      <section className="flex flex-col items-center gap-7 px-6 md:px-12 lg:px-[120px] py-[80px] lg:py-[100px]">
        <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-normal leading-[1.1] text-[var(--text-primary)] font-display text-center">
          Learn & Experience
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[750px]">
          Beyond our boards, we offer personalized experiences designed to deepen your appreciation for artisan ingredients and the art of gathering.
        </p>
      </section>

      {/* Services Section */}
      <section className="flex flex-col gap-12 px-6 md:px-12 lg:px-[120px] pb-[100px]">
        {/* Service 1: In-Home Classes */}
        <div className="flex flex-col gap-6 p-10 md:p-[60px] rounded-[20px] bg-[var(--warm-beige)]">
          <span className="self-start px-5 py-2 rounded-[20px] bg-[var(--soft-gold)] text-[12px] font-semibold tracking-[1.5px] text-[var(--charcoal-black)] font-body">
            IN-PERSON
          </span>
          <h2 className="text-[36px] md:text-[48px] font-normal leading-[1.2] text-[var(--text-primary)] font-display">
            In-Home Charcuterie Classes
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body max-w-full">
            Host an intimate gathering while learning the art of board composition. We bring everything to your home—premium ingredients, boards, and expert guidance—so you and your guests can create restaurant-quality charcuterie together.
          </p>
          <div className="flex flex-col gap-3">
            <FeatureItem icon={<Clock className="w-5 h-5 text-[var(--soft-gold)]" />} text="2-hour hands-on experience" />
            <FeatureItem icon={<Users className="w-5 h-5 text-[var(--soft-gold)]" />} text="Groups of 4–12 people" />
            <FeatureItem icon={<Package className="w-5 h-5 text-[var(--soft-gold)]" />} text="All ingredients & materials included" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <span className="text-[32px] md:text-[36px] font-light text-[var(--text-primary)] font-display">
              $95 per person
            </span>
            <Link
              href="/contact"
              className="flex items-center justify-center px-9 py-4 rounded-3xl bg-[var(--soft-gold)] text-[16px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
            >
              Book a Class
            </Link>
          </div>
        </div>

        {/* Service 2: Virtual Workshop */}
        <div className="flex flex-col gap-6 p-10 md:p-[60px] rounded-[20px] border-[1.5px] border-[#D4CFBF]">
          <span className="self-start px-5 py-2 rounded-[20px] border-[1.5px] border-[var(--soft-gold)] text-[12px] font-semibold tracking-[1.5px] text-[var(--soft-gold)] font-body">
            VIRTUAL
          </span>
          <h2 className="text-[36px] md:text-[48px] font-normal leading-[1.2] text-[var(--text-primary)] font-display">
            Virtual Charcuterie Workshop
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body max-w-full">
            Join us from anywhere for an interactive online class. We&apos;ll ship a curated ingredient box to your door, then guide you through creating a beautiful board via live video. Perfect for remote teams, friends, or solo learners.
          </p>
          <div className="flex flex-col gap-3">
            <FeatureItem icon={<Video className="w-5 h-5 text-[var(--soft-gold)]" />} text="Live 90-minute video session" />
            <FeatureItem icon={<Package className="w-5 h-5 text-[var(--soft-gold)]" />} text="Ingredient box shipped to you" />
            <FeatureItem icon={<MapPin className="w-5 h-5 text-[var(--soft-gold)]" />} text="Available nationwide" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <span className="text-[32px] md:text-[36px] font-light text-[var(--text-primary)] font-display">
              $75 per person
            </span>
            <Link
              href="/contact"
              className="flex items-center justify-center px-9 py-4 rounded-3xl border-[1.5px] border-[var(--text-primary)] text-[16px] font-medium text-[var(--text-primary)] font-body hover:bg-[var(--text-primary)] hover:text-[var(--bone-white)] transition-colors"
            >
              Reserve a Spot
            </Link>
          </div>
        </div>

        {/* Service 3: Private Chef */}
        <div className="flex flex-col gap-6 p-10 md:p-[60px] rounded-[20px] bg-[var(--charcoal-black)]">
          <span className="self-start px-5 py-2 rounded-[20px] bg-[var(--soft-gold)] text-[12px] font-semibold tracking-[1.5px] text-[var(--charcoal-black)] font-body">
            PREMIUM
          </span>
          <h2 className="text-[36px] md:text-[48px] font-normal leading-[1.2] text-[var(--text-on-dark)] font-display">
            Private Chef Service
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body max-w-full">
            Elevate your event with our private chef experience. We design and execute a fully customized menu tailored to your vision, dietary needs, and occasion—from intimate dinners to grand celebrations.
          </p>
          <div className="flex flex-col gap-3">
            <FeatureItem icon={<ChefHat className="w-5 h-5 text-[var(--soft-gold)]" />} text="Dedicated private chef" dark />
            <FeatureItem icon={<UtensilsCrossed className="w-5 h-5 text-[var(--soft-gold)]" />} text="Fully customized menu" dark />
            <FeatureItem icon={<Star className="w-5 h-5 text-[var(--soft-gold)]" />} text="White-glove service & cleanup" dark />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <span className="text-[32px] md:text-[36px] font-light text-[var(--soft-gold)] font-display">
              Request a Quote
            </span>
            <Link
              href="/contact"
              className="flex items-center justify-center px-9 py-4 rounded-3xl bg-[var(--soft-gold)] text-[16px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="flex flex-col items-center gap-9 bg-[var(--warm-beige)] px-6 md:px-12 lg:px-[120px] py-[80px]">
        <Heart className="w-9 h-9 text-[var(--soft-gold)]" />
        <h2 className="text-[36px] md:text-[48px] font-normal text-[var(--text-primary)] font-display text-center">
          Why Learn with La Tabla?
        </h2>
        <p className="text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[750px]">
          We believe that great food brings people together. Our classes and services are designed to be approachable, fun, and deeply personal—whether you&apos;re a complete beginner or a seasoned host looking to refine your craft.
        </p>
      </section>

      <Footer />
    </main>
  );
}

function FeatureItem({ icon, text, dark = false }: { icon: React.ReactNode; text: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className={`text-[16px] ${dark ? 'text-[var(--text-on-dark)]' : 'text-[var(--text-primary)]'} font-body`}>
        {text}
      </span>
    </div>
  );
}
