"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <Heading level={2} className="text-xl mb-2">
        Error en el panel
      </Heading>
      <p className="text-stone-500 mb-6 text-sm">
        {error.message || "Ocurrió un error inesperado."}
      </p>
      <Button onClick={reset}>Reintentar</Button>
    </div>
  );
}
