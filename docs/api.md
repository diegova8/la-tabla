# 📡 API Reference — La Tabla

Base URL: `https://your-domain.com/api`

All endpoints return JSON. Admin endpoints require Clerk authentication with an email listed in `ADMIN_EMAILS`.

---

## Table of Contents

- [Products](#products)
- [Ingredients](#ingredients)
- [Categories](#categories)
- [Orders](#orders)
- [Gallery](#gallery)
- [Blocked Dates](#blocked-dates)
- [Delivery Slots](#delivery-slots)
- [Search](#search)
- [Track Order](#track-order)
- [Auth](#auth)
- [Upload](#upload)
- [Cart Validation](#cart-validation)

---

## Products

### List Products

```
GET /api/products
```

**Auth:** None

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `type` | string | Filter by type: `tabla`, `especialidad`, `servicio`, `taller` |
| `active` | string | Filter by active status: `true` or `false` |

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "type": "tabla",
    "name": "Tabla Clásica",
    "slug": "tabla-clasica",
    "description": "Una selección clásica...",
    "shortDesc": "Para 2-4 personas",
    "price": "25000.00",
    "imageUrl": "https://...",
    "personsMin": 2,
    "personsMax": 4,
    "isConfigurable": true,
    "isFixed": false,
    "isActive": true,
    "displayOrder": 0,
    "createdAt": "2026-01-15T...",
    "updatedAt": "2026-01-15T..."
  }
]
```

### Get Product by ID

```
GET /api/products/:id
```

**Auth:** None

**Response:** `200 OK` — Single product object | `404` if not found

### Create Product

```
POST /api/products
```

**Auth:** Admin required

**Request Body:**

```json
{
  "name": "Tabla Premium",
  "slug": "tabla-premium",
  "type": "tabla",
  "description": "Nuestra mejor selección...",
  "shortDesc": "Para 6-8 personas",
  "price": "45000.00",
  "imageUrl": "https://...",
  "personsMin": 6,
  "personsMax": 8,
  "isConfigurable": true,
  "isFixed": false,
  "displayOrder": 1
}
```

**Response:** `201 Created` — Created product object | `400` validation error | `409` duplicate slug

### Update Product

```
PUT /api/products/:id
```

**Auth:** Admin required

**Request Body:** Partial product fields (same schema as create, all optional) + `isActive` (boolean)

**Response:** `200 OK` — Updated product | `404` not found

### Delete (Deactivate) Product

```
DELETE /api/products/:id
```

**Auth:** Admin required

**Response:** `200 OK`

```json
{
  "message": "Product deactivated",
  "product": { ... }
}
```

> ℹ️ Products are soft-deleted (set `isActive: false`), not removed from the database.

---

## Ingredients

### List Ingredients

```
GET /api/ingredients
```

**Auth:** None

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `categoryId` | number | Filter by category ID |

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "Queso Gouda",
    "categoryId": 1,
    "cost": "2500.00",
    "costUnit": "u",
    "imageUrl": "https://...",
    "description": "Queso holandés semi-duro",
    "available": true,
    "categoryName": "Quesos"
  }
]
```

### Get Ingredient by ID

```
GET /api/ingredients/:id
```

**Auth:** None

**Response:** `200 OK` — Single ingredient | `404` not found

### Create Ingredient

```
POST /api/ingredients
```

**Auth:** Admin required

**Request Body:**

```json
{
  "name": "Queso Brie",
  "categoryId": 1,
  "cost": "3500.00",
  "costUnit": "u",
  "imageUrl": "https://...",
  "description": "Queso francés suave"
}
```

**Response:** `201 Created`

### Update Ingredient

```
PUT /api/ingredients/:id
```

**Auth:** Admin required

**Request Body:** Partial — any of: `name`, `categoryId`, `description`, `imageUrl`, `cost`, `costUnit`, `available`

**Response:** `200 OK` — Updated ingredient | `404` not found

### Delete (Deactivate) Ingredient

```
DELETE /api/ingredients/:id
```

**Auth:** Admin required

**Response:** `200 OK`

```json
{
  "message": "Ingredient deactivated",
  "ingredient": { ... }
}
```

> ℹ️ Ingredients are soft-deleted (set `available: false`).

---

## Categories

### List Categories

```
GET /api/categories
```

**Auth:** None

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "Quesos",
    "slug": "quesos",
    "displayOrder": 0
  }
]
```

### Create Category

```
POST /api/categories
```

**Auth:** Admin required

**Request Body:**

```json
{
  "name": "Embutidos",
  "displayOrder": 1
}
```

**Response:** `201 Created` | `409` duplicate name

### Update Category

```
PUT /api/categories/:id
```

**Auth:** Admin required

**Request Body:**

```json
{
  "name": "Quesos Artesanales",
  "displayOrder": 0
}
```

**Response:** `200 OK` | `404` not found | `409` duplicate name

### Delete Category

```
DELETE /api/categories/:id
```

**Auth:** Admin required

**Response:** `200 OK` — `{ "success": true }` | `404` not found | `409` has associated ingredients

---

## Orders

### List Orders

```
GET /api/orders
```

**Auth:** Admin required

**Response:** `200 OK` — Array of the 100 most recent orders (without items)

### Get Order Detail

```
GET /api/orders/:id
```

**Auth:** Admin required

**Response:** `200 OK`

```json
{
  "id": 1,
  "orderNumber": "LT-260214-A3B5C7D9",
  "guestName": "María López",
  "guestEmail": "maria@example.com",
  "guestPhone": "+506 8888-1234",
  "status": "pending",
  "deliveryMethod": "delivery",
  "deliveryDate": "2026-02-16",
  "deliverySlotId": 2,
  "deliveryAddress": "San José, Escazú...",
  "deliveryCost": "0.00",
  "subtotal": "25000.00",
  "discount": "0.00",
  "total": "25000.00",
  "paymentMethod": "sinpe",
  "paymentStatus": "pending",
  "notes": "Sin nueces por favor",
  "createdAt": "2026-02-14T...",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Tabla Clásica",
      "variantId": null,
      "quantity": 1,
      "unitPrice": "25000.00",
      "totalPrice": "25000.00",
      "notes": null
    }
  ]
}
```

### Create Order

```
POST /api/orders
```

**Auth:** None (guest checkout) | **Rate limited:** 5 requests/minute per IP

**Request Body:**

```json
{
  "name": "María López",
  "email": "maria@example.com",
  "phone": "+506 8888-1234",
  "deliveryMethod": "delivery",
  "deliveryDate": "2026-02-16",
  "deliverySlot": "2",
  "address": "San José, Escazú...",
  "paymentMethod": "sinpe",
  "notes": "Sin nueces por favor",
  "items": [
    {
      "productId": 1,
      "variantId": null,
      "quantity": 1,
      "unitPrice": 25000,
      "selectedIngredients": [
        { "ingredientId": 1, "categoryId": 1 },
        { "ingredientId": 5, "categoryId": 2 }
      ],
      "notes": "Extra queso"
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "orderNumber": "LT-260214-A3B5C7D9",
  "orderId": 1
}
```

**Errors:** `400` validation error | `429` rate limited | `500` server error

**Side effects:** Sends confirmation emails to customer and admin (non-blocking).

### Update Order Status

```
PATCH /api/orders/:id
```

**Auth:** Admin required

**Request Body:**

```json
{
  "status": "confirmed",
  "paymentStatus": "verified"
}
```

Both fields are optional. Valid values:
- `status`: `pending`, `confirmed`, `preparing`, `ready`, `delivered`, `cancelled`
- `paymentStatus`: `pending`, `verified`, `rejected`

**Response:** `200 OK` — Updated order | `404` not found

---

## Gallery

### List Gallery Images

```
GET /api/gallery
```

**Auth:** None

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "imageUrl": "https://blob.vercel-storage.com/...",
    "altText": "Tabla Clásica vista superior",
    "displayOrder": 0,
    "productId": 1,
    "productName": "Tabla Clásica"
  }
]
```

### Upload Gallery Image

```
POST /api/gallery
```

**Auth:** Admin required

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ | Image file (JPEG, PNG, WebP) |
| `productId` | string | ✅ | Product ID to associate |
| `altText` | string | ❌ | Alt text for accessibility |

**Response:** `201 Created` — Created product image record

### Delete Gallery Image

```
DELETE /api/gallery/:id
```

**Auth:** Admin required

**Response:** `200 OK` — `{ "success": true }` | `404` not found

---

## Blocked Dates

### List Blocked Dates

```
GET /api/blocked-dates
```

**Auth:** None

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "date": "2026-03-01",
    "reason": "Feriado nacional"
  }
]
```

### Block a Date

```
POST /api/blocked-dates
```

**Auth:** Admin required

**Request Body:**

```json
{
  "date": "2026-03-01",
  "reason": "Feriado nacional"
}
```

**Response:** `201 Created`

### Unblock a Date

```
DELETE /api/blocked-dates/:id
```

**Auth:** Admin required

**Response:** `200 OK` — `{ "success": true }` | `404` not found

---

## Delivery Slots

### List Active Delivery Slots

```
GET /api/delivery-slots
```

**Auth:** None

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "label": "9:00 - 10:00 AM",
    "startTime": "09:00:00",
    "endTime": "10:00:00",
    "isActive": true
  }
]
```

---

## Search

### Search Products

```
GET /api/search?q=queso
```

**Auth:** None | **Rate limited:** 20 requests/minute per IP

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Search query (minimum 2 characters) |

**Response:** `200 OK` — Array of matching active products (max 10)

Returns empty array if query is less than 2 characters.

---

## Track Order

### Track Order by Number

```
GET /api/track-order?n=LT-260214-A3B5C7D9
```

**Auth:** None | **Rate limited:** 10 requests/minute per IP

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `n` | string | Order number |

**Response:** `200 OK`

```json
{
  "orderNumber": "LT-260214-A3B5C7D9",
  "status": "confirmed",
  "guestName": "María",
  "deliveryMethod": "delivery",
  "deliveryDate": "2026-02-16",
  "deliverySlot": "9:00 - 10:00 AM",
  "subtotal": "25000.00",
  "deliveryCost": "0.00",
  "total": "25000.00",
  "paymentMethod": "sinpe",
  "paymentStatus": "verified",
  "createdAt": "2026-02-14T...",
  "items": [
    {
      "id": 1,
      "quantity": 1,
      "unitPrice": "25000.00",
      "totalPrice": "25000.00",
      "notes": null,
      "productName": "Tabla Clásica",
      "productImage": "https://..."
    }
  ]
}
```

> ℹ️ Only the customer's first name is exposed for privacy.

**Errors:** `400` missing order number | `404` order not found | `429` rate limited

---

## Auth

### Check Admin Status

```
GET /api/auth/check-admin
```

**Auth:** Clerk session (optional)

**Response:** `200 OK`

```json
{
  "isAdmin": true
}
```

Returns `{ "isAdmin": false }` if not authenticated or not an admin.

---

## Upload

### Upload Image

```
POST /api/upload
```

**Auth:** Admin required

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ | Image file |

**Constraints:**
- Max size: 5 MB
- Allowed types: `image/jpeg`, `image/png`, `image/webp`

**Response:** `201 Created`

```json
{
  "url": "https://blob.vercel-storage.com/...",
  "filename": "tabla-clasica.jpg",
  "size": 245678
}
```

**Errors:** `400` no file / invalid type / too large | `401` / `403` auth errors

---

## Cart Validation

### Validate Cart Items

```
POST /api/cart/validate
```

**Auth:** None

**Request Body:**

```json
{
  "items": [
    {
      "productId": 1,
      "unitPrice": "25000.00"
    }
  ]
}
```

**Response:** `200 OK`

```json
{
  "valid": true,
  "errors": [],
  "items": [
    {
      "productId": 1,
      "unitPrice": "25000.00",
      "currentPrice": "25000.00",
      "priceChanged": false,
      "productName": "Tabla Clásica"
    }
  ]
}
```

If a product was deactivated or price changed:

```json
{
  "valid": false,
  "errors": ["Tabla Especial is no longer available"],
  "items": [
    {
      "productId": 2,
      "unitPrice": "20000.00",
      "currentPrice": "22000.00",
      "priceChanged": true,
      "productName": "Tabla Premium"
    }
  ]
}
```

---

## Error Format

All error responses follow this format:

```json
{
  "error": "Human-readable error message"
}
```

Validation errors include field details:

```json
{
  "error": "Datos inválidos",
  "details": {
    "name": ["String must contain at least 1 character(s)"],
    "price": ["Invalid"]
  }
}
```

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/orders` | 5 requests | 1 minute |
| `GET /api/search` | 20 requests | 1 minute |
| `GET /api/track-order` | 10 requests | 1 minute |

Rate limiting is per IP address. Returns `429 Too Many Requests` when exceeded.
