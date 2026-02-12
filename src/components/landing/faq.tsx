"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "¿Con cuánta anticipación debo hacer mi pedido?",
    a: "Mínimo 2 días antes de la fecha deseada para garantizar la frescura y calidad de los ingredientes.",
  },
  {
    q: "¿Puedo personalizar los ingredientes de mi tabla?",
    a: "¡Sí! En las tablas configurables podés elegir los quesos, carnes, panes y extras que más te gusten de nuestra variedad disponible.",
  },
  {
    q: "¿Cuáles son los métodos de pago?",
    a: "Aceptamos Sinpe Móvil y transferencia bancaria. El pedido se confirma con el 100% del pago.",
  },
  {
    q: "¿Hacen devoluciones?",
    a: "No realizamos devoluciones una vez confirmado el pedido, ya que trabajamos con ingredientes frescos preparados especialmente para cada cliente.",
  },
  {
    q: "¿Qué incluye el pedido?",
    a: "Cada pedido incluye la tabla, todos los ingredientes y los recipientes necesarios para servir.",
  },
  {
    q: "¿Hacen entregas fuera del GAM?",
    a: "Sí, realizamos entregas fuera de San José con un costo adicional según la zona. Consultá disponibilidad al hacer tu pedido.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20">
      <Container size="md">
        <div className="text-center mb-12">
          <Heading level={2}>Preguntas frecuentes</Heading>
        </div>

        <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium text-stone-900 pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-stone-400 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === i ? "max-h-40 pb-5" : "max-h-0"
                )}
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
