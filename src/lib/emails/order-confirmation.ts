interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  notes?: string;
}

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
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

export function buildOrderConfirmationEmail(data: OrderEmailData): string {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e6d6;">${item.name}${item.notes ? `<br><small style="color:#8b7355;">${item.notes}</small>` : ""}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e6d6;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e6d6;text-align:right;">$${Number(item.unitPrice).toLocaleString("es-CR")}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e6d6;text-align:right;">$${Number(item.totalPrice).toLocaleString("es-CR")}</td>
      </tr>`
    )
    .join("");

  const deliveryLabel = data.deliveryMethod === "delivery" ? "Entrega a domicilio" : "Retiro en punto";
  const paymentLabel =
    data.paymentMethod === "sinpe" ? "Sinpe Móvil" :
    data.paymentMethod === "transfer" ? "Transferencia bancaria" :
    data.paymentMethod || "Por confirmar";

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:#1a1a1a;padding:32px 24px;text-align:center;">
      <h1 style="margin:0;color:#d4a853;font-size:28px;font-weight:700;letter-spacing:1px;">La Tabla</h1>
      <p style="margin:8px 0 0;color:#c4b5a0;font-size:14px;">Charcutería & Quesos Artesanales</p>
    </div>

    <!-- Confirmation -->
    <div style="padding:32px 24px;text-align:center;border-bottom:2px solid #f0e6d6;">
      <div style="font-size:48px;margin-bottom:8px;">✅</div>
      <h2 style="margin:0 0 8px;color:#1a1a1a;font-size:22px;">¡Pedido Confirmado!</h2>
      <p style="margin:0;color:#8b7355;font-size:16px;">Hola <strong>${data.customerName}</strong>, recibimos tu pedido.</p>
      <div style="margin-top:16px;padding:12px 24px;background:#faf7f2;border-radius:8px;display:inline-block;">
        <span style="color:#8b7355;font-size:13px;">Número de pedido</span><br>
        <strong style="color:#1a1a1a;font-size:20px;letter-spacing:1px;">${data.orderNumber}</strong>
      </div>
    </div>

    <!-- Items -->
    <div style="padding:24px;">
      <h3 style="margin:0 0 16px;color:#1a1a1a;font-size:16px;text-transform:uppercase;letter-spacing:1px;">Detalle del Pedido</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#faf7f2;">
            <th style="padding:8px 12px;text-align:left;color:#8b7355;font-weight:600;">Producto</th>
            <th style="padding:8px 12px;text-align:center;color:#8b7355;font-weight:600;">Cant.</th>
            <th style="padding:8px 12px;text-align:right;color:#8b7355;font-weight:600;">Precio</th>
            <th style="padding:8px 12px;text-align:right;color:#8b7355;font-weight:600;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="margin-top:16px;padding:16px;background:#faf7f2;border-radius:8px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span style="color:#8b7355;">Subtotal</span>
          <span style="color:#1a1a1a;">$${Number(data.subtotal).toLocaleString("es-CR")}</span>
        </div>
        ${Number(data.deliveryCost) > 0 ? `
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span style="color:#8b7355;">Envío</span>
          <span style="color:#1a1a1a;">$${Number(data.deliveryCost).toLocaleString("es-CR")}</span>
        </div>` : ""}
        <div style="display:flex;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:2px solid #d4a853;">
          <strong style="color:#1a1a1a;font-size:16px;">Total</strong>
          <strong style="color:#1a1a1a;font-size:18px;">$${Number(data.total).toLocaleString("es-CR")}</strong>
        </div>
      </div>
    </div>

    <!-- Delivery & Payment Info -->
    <div style="padding:0 24px 24px;">
      <div style="background:#faf7f2;border-radius:8px;padding:16px;">
        <div style="margin-bottom:12px;">
          <span style="color:#8b7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Entrega</span><br>
          <strong style="color:#1a1a1a;">${deliveryLabel}</strong><br>
          <span style="color:#555;">📅 ${data.deliveryDate}</span>
          ${data.deliveryAddress ? `<br><span style="color:#555;">📍 ${data.deliveryAddress}</span>` : ""}
        </div>
        <div>
          <span style="color:#8b7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Método de Pago</span><br>
          <strong style="color:#1a1a1a;">${paymentLabel}</strong>
        </div>
        ${data.notes ? `
        <div style="margin-top:12px;">
          <span style="color:#8b7355;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Notas</span><br>
          <span style="color:#555;">${data.notes}</span>
        </div>` : ""}
      </div>
    </div>

    <!-- CTA -->
    <div style="padding:0 24px 32px;text-align:center;">
      <p style="color:#8b7355;font-size:14px;margin:0 0 16px;">Te contactaremos para confirmar los detalles de tu pedido.</p>
      <a href="https://wa.me/50688888888" style="display:inline-block;padding:12px 32px;background:#1a1a1a;color:#d4a853;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">
        💬 Contactar por WhatsApp
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#1a1a1a;padding:24px;text-align:center;">
      <p style="margin:0 0 8px;color:#d4a853;font-size:16px;font-weight:700;">La Tabla</p>
      <p style="margin:0 0 4px;color:#8b7355;font-size:12px;">Charcutería & Quesos Artesanales · Costa Rica</p>
      <p style="margin:0;color:#555;font-size:11px;">
        <a href="https://instagram.com/latabla.cr" style="color:#8b7355;text-decoration:none;">@latabla.cr</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function buildOrderConfirmationText(data: OrderEmailData): string {
  const items = data.items
    .map((i) => `• ${i.name} x${i.quantity} — $${Number(i.totalPrice).toLocaleString("es-CR")}`)
    .join("\n");

  return `¡Pedido Confirmado! 🎉

Hola ${data.customerName}, recibimos tu pedido #${data.orderNumber}.

${items}

Total: $${Number(data.total).toLocaleString("es-CR")}
Entrega: ${data.deliveryDate}
Pago: ${data.paymentMethod || "Por confirmar"}

Te contactaremos pronto para confirmar los detalles.

— La Tabla | Charcutería & Quesos Artesanales`;
}
