import { MapPin, Truck, Store } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent } from "@/components/ui/card";

const methods = [
  {
    icon: Truck,
    title: "Delivery",
    description: "Entrega a domicilio en el Gran Área Metropolitana. Costo adicional según zona.",
  },
  {
    icon: Store,
    title: "Pick Up",
    description: "Recogé tu pedido directamente. Sin costo adicional.",
  },
  {
    icon: MapPin,
    title: "Fuera del GAM",
    description: "Hacemos entregas fuera de San José con costo adicional. Consultá disponibilidad.",
  },
];

export function DeliveryZones() {
  return (
    <section id="entregas" className="py-20 bg-stone-50">
      <Container size="lg">
        <div className="text-center mb-12">
          <Heading level={2}>Zonas de entrega</Heading>
          <p className="mt-3 text-stone-500 max-w-md mx-auto">
            Entregamos en el GAM y también fuera de San José.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {methods.map((method) => (
            <Card key={method.title}>
              <CardContent className="flex flex-col items-center text-center py-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800 mb-4">
                  <method.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900">{method.title}</h3>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                  {method.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
