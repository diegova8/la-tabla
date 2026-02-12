export const PRODUCT_TYPES = {
  TABLA: "tabla",
  ESPECIALIDAD: "especialidad",
  SERVICIO: "servicio",
  TALLER: "taller",
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  READY: "ready",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;

export const PAYMENT_METHODS = {
  SINPE: "sinpe",
  TRANSFER: "transfer",
  GATEWAY: "gateway",
} as const;

export const DELIVERY_METHODS = {
  DELIVERY: "delivery",
  PICKUP: "pickup",
} as const;

export const COST_UNITS = {
  GRAM: "g",
  UNIT: "u",
  ML: "ml",
} as const;

export const MIN_ORDER_DAYS_AHEAD = 2;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "Preparando",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  verified: "Verificado",
  rejected: "Rechazado",
};
