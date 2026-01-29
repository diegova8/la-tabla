import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChefHat, Flame } from "lucide-react";

const menuItems = [
  {
    name: "Paella",
    description: "Traditional Spanish rice dish with saffron, seafood, chicken, and vegetables. Serves 6–8.",
    price: "$145",
  },
  {
    name: "Clam & Shrimp Risotto",
    description: "Creamy Arborio rice with fresh clams, shrimp, white wine, and Parmigiano-Reggiano. Serves 4–6.",
    price: "$95",
  },
  {
    name: "Caprese Skewers",
    description: "Fresh mozzarella, heirloom tomatoes, and basil drizzled with aged balsamic. 24 skewers.",
    price: "$65",
  },
  {
    name: "Spanish Potato Tortilla",
    description: "Classic Spanish omelet with slow-cooked potatoes, onions, and eggs. Serves 8–10 as appetizer.",
    price: "$55",
  },
  {
    name: "Thanksgiving Turkey",
    description: "Heritage breed turkey, brined and roasted to perfection. Seasonal availability. Serves 10–12.",
    price: "$285",
  },
];

export default function ChefSpecialtiesPage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Page Hero */}
      <section className="flex flex-col items-center gap-7 bg-[var(--charcoal-black)] px-6 md:px-12 lg:px-[120px] py-[80px] lg:pt-[80px] lg:pb-[64px]">
        <ChefHat className="w-12 h-12 text-[var(--soft-gold)]" />
        <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-normal leading-[1.1] text-[var(--text-on-dark)] font-display text-center">
          Chef Specialties
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--soft-gold)] font-body text-center max-w-[750px]">
          Handcrafted hot dishes and gourmet creations, prepared by our culinary team with the same care and expertise we bring to every board.
        </p>
      </section>

      {/* Menu Section */}
      <section className="flex flex-col items-center gap-12 px-6 md:px-12 lg:px-[120px] py-[100px]">
        {/* Menu Header */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[42px] md:text-[52px] font-normal text-[var(--text-primary)] font-display text-center">
            Our Menu
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[650px]">
            Each dish is prepared fresh to order with premium ingredients and chef-driven technique.
          </p>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col w-full max-w-[900px]">
          {menuItems.map((item, index) => (
            <div key={item.name}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 py-10">
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-[28px] md:text-[32px] font-medium text-[var(--text-primary)] font-display">
                    {item.name}
                  </h3>
                  <p className="text-[17px] leading-[1.6] text-[var(--text-secondary)] font-body">
                    {item.description}
                  </p>
                </div>
                <span className="text-[32px] md:text-[36px] font-light text-[var(--soft-gold)] font-display">
                  {item.price}
                </span>
              </div>
              {index < menuItems.length - 1 && (
                <div className="h-px w-full bg-[#D4CFBF]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Chef Note Section */}
      <section className="flex flex-col items-center gap-7 bg-[var(--warm-beige)] px-6 md:px-12 lg:px-[120px] py-[80px]">
        <Flame className="w-9 h-9 text-[var(--soft-gold)]" />
        <h2 className="text-[36px] md:text-[48px] font-normal text-[var(--text-primary)] font-display text-center">
          From Our Kitchen
        </h2>
        <p className="text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[750px]">
          All hot dishes require 48-hour advance notice and are prepared fresh on the day of your event. We use locally sourced ingredients whenever possible and can accommodate dietary restrictions.
        </p>
        <Link
          href="/contact"
          className="flex items-center justify-center px-10 py-4 rounded-[28px] border-[1.5px] border-[var(--text-primary)] text-[16px] font-medium text-[var(--text-primary)] font-body hover:bg-[var(--text-primary)] hover:text-[var(--bone-white)] transition-colors"
        >
          Discuss Your Order
        </Link>
      </section>

      <Footer />
    </main>
  );
}
