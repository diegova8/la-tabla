import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-[60px] bg-[var(--bone-white)] px-6 md:px-12 lg:px-[120px] pt-[80px] pb-10">
      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-[100px]">
        {/* Brand Section */}
        <div className="flex flex-col gap-5 lg:w-[300px]">
          <span className="text-[32px] font-medium text-[var(--text-primary)] font-display">
            La Tabla
          </span>
          <p className="text-[15px] leading-[1.5] text-[var(--text-secondary)] font-body">
            Artisanal charcuterie experiences for the discerning host.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="flex gap-20">
          {/* Explore Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[15px] font-medium text-[var(--text-primary)] font-body">
              Explore
            </span>
            <Link
              href="/"
              className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/collections"
              className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/events"
              className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
            >
              Events
            </Link>
            <Link
              href="/signature"
              className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
            >
              Gallery
            </Link>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[15px] font-medium text-[var(--text-primary)] font-body">
              Connect
            </span>
            <Link
              href="/contact"
              className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
            >
              Instagram
            </a>
            <Link
              href="/contact"
              className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
            >
              Reservations
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[var(--footer-divider)]" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[14px] text-[var(--text-secondary)] font-body">
          © 2024 La Tabla. All rights reserved.
        </span>
        <div className="flex gap-8">
          <Link
            href="/privacy"
            className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-[14px] text-[var(--text-secondary)] font-body hover:text-[var(--text-primary)] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Dark variant of the footer for certain pages
export function FooterDark() {
  return (
    <footer className="flex flex-col gap-[60px] bg-[var(--charcoal-black)] px-6 md:px-12 lg:px-[120px] pt-[80px] pb-10">
      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-[120px]">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <span className="text-[32px] font-medium text-[var(--bone-white)] font-display">
            La Tabla
          </span>
          <p className="text-[15px] text-[var(--text-on-dark)] font-body">
            Artisanal charcuterie & gourmet experiences
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="flex flex-wrap gap-16">
          {/* Products Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[15px] font-semibold text-[var(--bone-white)] font-body">
              Products
            </span>
            <Link
              href="/collections"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              Charcuterie Boards
            </Link>
            <Link
              href="/events"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              Event Catering
            </Link>
            <Link
              href="/signature"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              Special Boards
            </Link>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[15px] font-semibold text-[var(--bone-white)] font-body">
              Services
            </span>
            <Link
              href="/chef-specialties"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              Chef Specialties
            </Link>
            <Link
              href="/services"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              In-Home Classes
            </Link>
            <Link
              href="/services"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              Private Chef
            </Link>
          </div>

          {/* Information Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[15px] font-semibold text-[var(--bone-white)] font-body">
              Information
            </span>
            <Link
              href="/ordering"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              How Ordering Works
            </Link>
            <Link
              href="/ingredients"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              Ingredients Reference
            </Link>
            <Link
              href="/contact"
              className="text-[15px] text-[var(--text-on-dark)] font-body hover:text-[var(--soft-gold)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[var(--footer-divider)]" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[14px] text-[var(--text-on-dark)] font-body">
          © 2024 La Tabla. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-on-dark)] hover:text-[var(--soft-gold)] transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-on-dark)] hover:text-[var(--soft-gold)] transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@latabla.com"
            className="text-[var(--text-on-dark)] hover:text-[var(--soft-gold)] transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
