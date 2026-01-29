import Header from "@/components/Header";
import { FooterDark } from "@/components/Footer";
import { MessageCircle, Phone, Instagram, Heart } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 px-6 md:px-12 lg:px-[120px] py-[80px] lg:py-[100px]">
        <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-medium leading-[1.1] text-[var(--text-primary)] font-display text-center">
          Let&apos;s Connect
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[720px]">
          We&apos;re here to make your next gathering unforgettable.
          <br />
          Reach out and let&apos;s create something special together.
        </p>
      </section>

      {/* Contact Methods Section */}
      <section className="flex flex-col gap-8 px-6 md:px-12 lg:px-[120px]">
        {/* WhatsApp Card */}
        <div
          className="flex flex-col items-center gap-8 p-10 md:p-14 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          }}
        >
          <MessageCircle className="w-16 h-16 text-white" />
          <h2 className="text-[32px] md:text-[40px] font-medium text-white font-display text-center">
            Chat With Us on WhatsApp
          </h2>
          <p className="text-[18px] leading-[1.6] text-white font-body text-center max-w-[600px]">
            Quick questions? Custom orders? We respond fast on WhatsApp.
            <br />
            Tap to start a conversation.
          </p>
          <a
            href="https://wa.me/13055558252"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-14 py-6 rounded-xl bg-white text-[18px] font-semibold text-[#128C7E] font-body hover:opacity-90 transition-opacity"
          >
            Open WhatsApp
          </a>
        </div>

        {/* Phone and Instagram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone Card */}
          <div className="flex flex-col items-center gap-6 p-12 rounded-xl bg-white border border-[#E8E4DD]">
            <Phone className="w-12 h-12 text-[var(--soft-gold)]" />
            <h3 className="text-[28px] md:text-[32px] font-medium text-[var(--text-primary)] font-display text-center">
              Call Us
            </h3>
            <span className="text-[24px] md:text-[28px] font-semibold text-[var(--soft-gold)] font-body text-center">
              (305) 555-TABLA
            </span>
            <p className="text-[16px] leading-[1.6] text-[var(--text-secondary)] font-body text-center">
              Mon-Sat, 9am-7pm EST
              <br />
              Sunday by appointment
            </p>
          </div>

          {/* Instagram Card */}
          <div className="flex flex-col items-center gap-6 p-12 rounded-xl bg-white border border-[#E8E4DD]">
            <Instagram className="w-12 h-12 text-[var(--soft-gold)]" />
            <h3 className="text-[28px] md:text-[32px] font-medium text-[var(--text-primary)] font-display text-center">
              Follow Us
            </h3>
            <a
              href="https://instagram.com/latablagourmet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[24px] md:text-[28px] font-semibold text-[var(--soft-gold)] font-body text-center hover:opacity-80 transition-opacity"
            >
              @latablagourmet
            </a>
            <p className="text-[16px] leading-[1.6] text-[var(--text-secondary)] font-body text-center">
              Daily inspiration, behind-the-scenes,
              <br />
              and customer creations
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="flex flex-col items-center gap-10 bg-[var(--warm-beige)] px-6 md:px-12 lg:px-[120px] py-[100px] mt-[80px]">
        <Heart className="w-14 h-14 text-[var(--soft-gold)]" />
        <h2 className="text-[36px] md:text-[48px] font-medium text-[var(--text-primary)] font-display text-center">
          Share the Experience
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.7] text-[var(--text-secondary)] font-body text-center max-w-[720px]">
          Our boards are made to be shared—with friends, family, and on social media. When you post your La Tabla moment, tag us @latablagourmet so we can celebrate with you.
        </p>

        {/* Stats */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[42px] md:text-[48px] font-medium text-[var(--text-primary)] font-display">
              5,000+
            </span>
            <span className="text-[15px] text-[var(--text-secondary)] font-body">
              Happy Customers
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[42px] md:text-[48px] font-medium text-[var(--text-primary)] font-display">
              12K+
            </span>
            <span className="text-[15px] text-[var(--text-secondary)] font-body">
              Instagram Followers
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[42px] md:text-[48px] font-medium text-[var(--text-primary)] font-display">
              4.9★
            </span>
            <span className="text-[15px] text-[var(--text-secondary)] font-body">
              Average Rating
            </span>
          </div>
        </div>
      </section>

      <FooterDark />
    </main>
  );
}
