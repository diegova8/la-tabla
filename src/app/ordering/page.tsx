import Link from "next/link";
import Header from "@/components/Header";
import { FooterDark } from "@/components/Footer";
import { Calendar, CreditCard, Shield, Truck, Package } from "lucide-react";

const infoCards = [
  {
    icon: <Calendar className="w-10 h-10 text-[var(--soft-gold)]" />,
    title: "Advance Notice Required",
    description: "All orders require a minimum of 2 days advance notice to ensure we can source the freshest ingredients and prepare your board with the care it deserves. For large events or specialty requests, we recommend booking 5–7 days in advance.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-[var(--soft-gold)]" />,
    title: "Payment & Pricing",
    description: "We require 100% payment upfront at the time of booking. This helps us secure your premium ingredients and reserve your delivery slot. We accept all major credit cards and digital payment methods.",
  },
  {
    icon: <Shield className="w-10 h-10 text-[var(--soft-gold)]" />,
    title: "Cancellation Policy",
    description: "Due to the fresh, perishable nature of our ingredients and the customized preparation involved, we are unable to offer refunds once an order is placed. If you need to modify your order, please contact us as soon as possible and we'll do our best to accommodate changes.",
  },
];

export default function OrderingPage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Page Hero */}
      <section className="flex flex-col items-center gap-6 px-6 md:px-12 lg:px-[120px] py-[80px] lg:py-[100px]">
        <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-normal leading-[1.1] text-[var(--text-primary)] font-display text-center">
          How Ordering Works
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[700px]">
          We believe in transparency and simplicity. Here&apos;s everything you need to know about placing an order with La Tabla.
        </p>
      </section>

      {/* Info Cards Section */}
      <section className="flex flex-col gap-6 px-6 md:px-12 lg:px-[120px] pb-[100px]">
        {infoCards.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </section>

      {/* Delivery Card */}
      <section className="px-6 md:px-12 lg:px-[120px]">
        <div className="flex flex-col gap-4 p-12 rounded-xl bg-white border border-[#E8E4DD]">
          <Truck className="w-12 h-12 text-[var(--soft-gold)]" />
          <h2 className="text-[28px] md:text-[32px] font-medium text-[var(--text-primary)] font-display">
            Delivery Cost Varies
          </h2>
          <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body">
            Delivery fees are calculated based on your location. We&apos;ll provide an exact quote when you place your order. Local delivery within 10 miles is typically $15-25.
          </p>
        </div>
      </section>

      {/* What's Included Card */}
      <section className="px-6 md:px-12 lg:px-[120px] py-6">
        <div className="flex flex-col gap-4 p-12 rounded-xl bg-white border border-[#E8E4DD]">
          <Package className="w-12 h-12 text-[var(--soft-gold)]" />
          <h2 className="text-[28px] md:text-[32px] font-medium text-[var(--text-primary)] font-display">
            What&apos;s Included
          </h2>
          <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body">
            Every order includes premium serving boards, all ingredients beautifully arranged, and high-quality containers for storage. We provide everything you need for an exceptional presentation.
          </p>
        </div>
      </section>

      {/* Reassurance CTA Section */}
      <section className="flex flex-col items-center gap-6 bg-[var(--warm-beige)] px-6 md:px-12 lg:px-[120px] py-[80px] mt-[60px]">
        <h2 className="text-[36px] md:text-[48px] font-medium text-[var(--text-primary)] font-display text-center">
          Questions About Our Policies?
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[640px]">
          We&apos;re here to help. Reach out to our team for clarification on any policy or to discuss custom arrangements for your event.
        </p>
        <Link
          href="/contact"
          className="flex items-center justify-center px-12 py-5 rounded-lg bg-[var(--charcoal-black)] text-[17px] font-medium text-[var(--bone-white)] font-body hover:opacity-90 transition-opacity"
        >
          Contact Us
        </Link>
      </section>

      <FooterDark />
    </main>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-9 p-10 md:p-12 rounded-[20px] border-[1.5px] border-[#D4CFBF]">
      {icon}
      <div className="flex flex-col gap-4">
        <h2 className="text-[28px] md:text-[32px] font-medium text-[var(--text-primary)] font-display">
          {title}
        </h2>
        <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body">
          {description}
        </p>
      </div>
    </div>
  );
}
