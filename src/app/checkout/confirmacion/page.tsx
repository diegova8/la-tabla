import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export default async function ConfirmacionPage({ searchParams }: Props) {
  const { order } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <Container size="sm">
          <div className="text-center py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>

            <Heading level={1}>¡Pedido recibido!</Heading>

            {order && (
              <p className="mt-3 text-lg text-stone-600">
                Número de pedido: <strong className="text-stone-900">{order}</strong>
              </p>
            )}

            <p className="mt-4 text-stone-500 max-w-md mx-auto leading-relaxed">
              Te enviamos un email con las instrucciones de pago. Tu pedido se
              confirmará una vez recibido el 100% del pago.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tablas">
                <Button variant="gold">Seguir comprando</Button>
              </Link>
              <Link href="/cuenta/pedidos">
                <Button variant="secondary">Ver mis pedidos</Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
