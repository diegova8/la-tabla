import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const products = [
  {
    name: "Salamanca",
    people: "1–2 people",
    description: "A refined selection perfect for an intimate tasting. Featuring premium cured meats, artisan cheeses, and complementary accents.",
    price: "$65",
  },
  {
    name: "Malasaña",
    people: "2–4 people",
    description: "Our most popular board, ideal for small gatherings. A generous variety of flavors and textures to delight every palate.",
    price: "$125",
  },
  {
    name: "Andalucía",
    people: "4–6 people",
    description: "A bountiful spread designed for dinner parties and celebrations. Rich, diverse, and visually stunning.",
    price: "$215",
  },
  {
    name: "Serrano",
    people: "8–10 people",
    description: "Our signature grand board for large gatherings and events. An abundant array of flavors, meticulously composed.",
    price: "$385",
  },
];

export default function CollectionsPage() {
  return (
    <main className="flex flex-col w-full bg-[var(--bone-white)]">
      <Header />

      {/* Page Header */}
      <section className="flex flex-col items-center gap-5 px-6 md:px-12 lg:px-[120px] pt-[64px] pb-[80px]">
        <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-medium leading-[1.1] text-[var(--text-primary)] font-display text-center">
          Our Collections
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[700px]">
          Thoughtfully curated boards for every occasion, from intimate gatherings to grand celebrations.
        </p>
      </section>

      {/* Products Grid */}
      <section className="flex flex-col gap-8 px-6 md:px-12 lg:px-[120px] pb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
        <div className="flex justify-center">
          <ProductCard {...products[3]} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center gap-8 bg-[var(--warm-beige)] px-6 md:px-12 lg:px-[120px] py-[80px]">
        <h2 className="text-[36px] md:text-[48px] font-normal text-[var(--text-primary)] font-display text-center">
          Custom Requests Welcome
        </h2>
        <p className="text-[17px] md:text-[18px] leading-[1.6] text-[var(--text-secondary)] font-body text-center max-w-[650px]">
          Need something different? We&apos;re happy to create a bespoke board tailored to your specific needs, dietary requirements, and aesthetic preferences.
        </p>
        <Link
          href="/contact"
          className="flex items-center justify-center px-10 py-[18px] rounded-[28px] border-[1.5px] border-[var(--text-primary)] text-[16px] font-medium text-[var(--text-primary)] font-body hover:bg-[var(--text-primary)] hover:text-[var(--bone-white)] transition-colors"
        >
          Contact Us
        </Link>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({
  name,
  people,
  description,
  price,
}: {
  name: string;
  people: string;
  description: string;
  price: string;
}) {
  return (
    <div className="flex flex-col gap-6 p-10 rounded-[20px] border-[1.5px] border-[#D4CFBF] w-full max-w-[320px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-[32px] md:text-[36px] font-medium text-[var(--text-primary)] font-display">
          {name}
        </h3>
        <span className="text-[15px] font-medium text-[var(--soft-gold)] font-body">
          {people}
        </span>
      </div>
      <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)] font-body">
        {description}
      </p>
      <span className="text-[40px] md:text-[44px] font-light text-[var(--text-primary)] font-display">
        {price}
      </span>
      <Link
        href="/contact"
        className="flex items-center justify-center w-full py-4 rounded-3xl bg-[var(--soft-gold)] text-[15px] font-medium text-[var(--charcoal-black)] font-body hover:opacity-90 transition-opacity"
      >
        Request this board
      </Link>
    </div>
  );
}
