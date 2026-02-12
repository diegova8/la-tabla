import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center">
        <Container size="sm">
          <div className="text-center py-20">
            <p className="text-6xl font-serif font-bold text-amber-700">404</p>
            <h1 className="mt-4 text-2xl font-semibold text-stone-900">
              Página no encontrada
            </h1>
            <p className="mt-3 text-stone-500">
              Lo sentimos, no pudimos encontrar lo que buscabas.
            </p>
            <div className="mt-8">
              <Link href="/">
                <Button variant="gold">Volver al inicio</Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
