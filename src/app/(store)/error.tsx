"use client";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function StoreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-6" />
          <Heading level={1} className="text-2xl mb-3">
            Algo salió mal
          </Heading>
          <p className="text-stone-500 mb-8 max-w-md">
            Hubo un error al cargar esta página. Por favor intentá de nuevo.
          </p>
          <div className="flex gap-4">
            <Button onClick={reset}>Intentar de nuevo</Button>
            <Button variant="secondary" onClick={() => window.location.href = "/"}>
              Ir al inicio
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
