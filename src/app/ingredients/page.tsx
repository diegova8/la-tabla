import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Milk, Wheat, Beef, Cookie, Apple, Nut } from "lucide-react";

const categories = [
  {
    icon: <Milk className="w-7 h-7 text-[var(--soft-gold)]" />,
    title: "Cheeses",
    items: [
      "Manchego (aged 6 months)",
      "Parmigiano-Reggiano (24 months)",
      "Brie de Meaux",
      "Aged Gouda",
      "Blue Stilton",
      "Fresh Mozzarella",
    ],
  },
  {
    icon: <Wheat className="w-7 h-7 text-[var(--soft-gold)]" />,
    title: "Breads & Crackers",
    items: [
      "Artisan sourdough crisps",
      "Rosemary flatbreads",
      "Multigrain crackers",
      "Gluten-free options available",
      "Fresh baguette slices",
      "Grissini breadsticks",
    ],
  },
  {
    icon: <Beef className="w-7 h-7 text-[var(--soft-gold)]" />,
    title: "Cured Meats",
    items: [
      "Jamón Ibérico de Bellota",
      "Prosciutto di Parma",
      "Salchichón",
      "Coppa",
      "Soppressata",
      "Bresaola",
    ],
  },
  {
    icon: <Cookie className="w-7 h-7 text-[var(--soft-gold)]" />,
    title: "Sweet Elements",
    items: [
      "Raw honeycomb",
      "Fig preserves",
      "Quince paste (membrillo)",
      "Dark chocolate",
      "Truffle honey",
      "Apricot compote",
    ],
  },
  {
    icon: <Apple className="w-7 h-7 text-[var(--soft-gold)]" />,
    title: "Fresh Fruits",
    items: [
      "Fresh figs (seasonal)",
      "Grapes (red & green)",
      "Sliced pears",
      "Fresh berries",
      "Dried apricots",
      "Medjool dates",
    ],
  },
  {
    icon: <Nut className="w-7 h-7 text-[var(--soft-gold)]" />,
    title: "Nuts & Seeds",
    items: [
      "Marcona almonds",
      "Candied walnuts",
      "Pistachios",
      "Cashews",
      "Hazelnuts",
      "Pepitas",
    ],
  },
];

export default function IngredientsPage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Page Hero */}
      <section className="flex flex-col items-center gap-6 px-6 md:px-12 lg:px-[120px] py-[80px] lg:py-[100px]">
        <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-normal leading-[1.1] text-[var(--text-primary)] font-display text-center">
          Our Ingredients
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[700px]">
          A curated collection of artisan ingredients sourced from specialty purveyors and trusted partners.
        </p>
      </section>

      {/* Categories Section */}
      <section className="flex flex-col items-center gap-6 px-6 md:px-12 lg:px-[120px] pb-[100px]">
        <div className="flex flex-col gap-6 w-full max-w-[1000px]">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CategoryCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-6 p-10 rounded-[20px] border-[1.5px] border-[#D4CFBF]">
      <div className="flex items-center justify-between">
        {icon}
        <h2 className="text-[32px] md:text-[36px] font-medium text-[var(--text-primary)] font-display">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <span
            key={item}
            className="text-[16px] text-[var(--text-secondary)] font-body"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
