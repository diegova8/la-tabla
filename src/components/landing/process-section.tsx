import { ChefHat, Mouse, Calendar, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const steps = [
  {
    icon: Mouse,
    title: "Elegí tu tabla",
    description: "Explorá nuestro catálogo y personalizá los ingredientes a tu gusto.",
  },
  {
    icon: Calendar,
    title: "Seleccioná fecha",
    description: "Escogé la fecha y franja horaria de entrega. Mínimo 2 días de anticipación.",
  },
  {
    icon: ChefHat,
    title: "Preparación artesanal",
    description: "El chef prepara tu tabla con ingredientes frescos y presentación impecable.",
  },
  {
    icon: Truck,
    title: "Recibí y disfrutá",
    description: "Delivery en el GAM o pick up. Todo listo para servir.",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="py-20 bg-stone-50">
      <Container>
        <div className="text-center mb-14">
          <Heading level={2}>Cómo funciona</Heading>
          <p className="mt-3 text-stone-500 max-w-lg mx-auto">
            Pedí online, armá tu tabla personalizada y recibila en tu puerta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-800 mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Paso {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-stone-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
