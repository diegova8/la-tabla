import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Instagram, Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto — La Tabla",
  description:
    "Contactá a La Tabla para cotizaciones, pedidos especiales y consultas. WhatsApp, Instagram y email.",
};

const contactMethods = [
  {
    icon: Instagram,
    title: "Instagram",
    description: "@latabla.cr — Seguinos para novedades",
    action: "Ver perfil",
    href: "https://instagram.com/latabla.cr",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Para consultas corporativas y eventos",
    action: "Enviar email",
    href: "mailto:info@latabla.cr",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default function ContactoPage() {
  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Heading level={1}>Contactanos</Heading>
          <p className="mt-4 text-lg text-stone-600">
            ¿Tenés una pregunta, querés cotizar un evento o armarte una tabla
            personalizada? Estamos para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${method.bg} mb-4`}
                >
                  <method.icon className={`h-7 w-7 ${method.color}`} />
                </div>
                <h3 className="font-semibold text-stone-900 mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-stone-500 mb-4">
                  {method.description}
                </p>
                <span
                  className={`text-sm font-medium ${method.color} group-hover:underline`}
                >
                  {method.action} →
                </span>
              </Card>
            </a>
          ))}
        </div>

        {/* Info section */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <Heading level={3} className="mb-6 text-center">
              Información
            </Heading>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-stone-900">Zona de cobertura</p>
                  <p className="text-sm text-stone-600">
                    Gran Área Metropolitana (GAM), Costa Rica
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-stone-900">Horario de atención</p>
                  <p className="text-sm text-stone-600">
                    Lunes a Sábado, 9:00 AM — 6:00 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800">
                💡 <strong>Tip:</strong> Pedidos con mínimo 2 días de anticipación.
                Para eventos grandes, contactanos con al menos 1 semana de
                antelación.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
