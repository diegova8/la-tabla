import { resend, FROM_EMAIL } from "@/lib/resend";
import {
  buildOrderConfirmationEmail,
  buildOrderConfirmationText,
} from "./order-confirmation";

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  notes?: string;
}

interface SendOrderEmailsParams {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: string;
  deliveryCost: string;
  total: string;
  deliveryMethod: string;
  deliveryDate: string;
  deliveryAddress?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
}

const ADMIN_EMAIL = "dvargas.dev@gmail.com";

export async function sendOrderEmails(params: SendOrderEmailsParams) {
  const emailData = {
    orderNumber: params.orderNumber,
    customerName: params.customerName,
    items: params.items,
    subtotal: params.subtotal,
    deliveryCost: params.deliveryCost,
    total: params.total,
    deliveryMethod: params.deliveryMethod,
    deliveryDate: params.deliveryDate,
    deliveryAddress: params.deliveryAddress,
    paymentMethod: params.paymentMethod,
    notes: params.notes,
  };

  const html = buildOrderConfirmationEmail(emailData);
  const text = buildOrderConfirmationText(emailData);

  // Send both emails in parallel, don't block the order response
  const results = await Promise.allSettled([
    // 1. Customer confirmation
    resend.emails.send({
      from: FROM_EMAIL,
      to: params.customerEmail,
      subject: `Pedido confirmado #${params.orderNumber} — La Tabla`,
      html,
      text,
    }),
    // 2. Admin notification
    resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🧀 Nuevo pedido #${params.orderNumber} — ₡${Number(params.total).toLocaleString("es-CR")}`,
      html,
      text,
    }),
  ]);

  // Log all results
  results.forEach((r, i) => {
    const label = i === 0 ? "customer" : "admin";
    if (r.status === "fulfilled") {
      console.log(`✅ Email ${label} sent:`, JSON.stringify(r.value));
    } else {
      console.error(`❌ Email ${label} failed:`, r.reason);
    }
  });

  return results;
}
