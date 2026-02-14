# 📖 Manual de Administración — La Tabla

Guía completa para gestionar tu tienda desde el panel de administración.

---

## Tabla de Contenidos

1. [Iniciar Sesión](#1-iniciar-sesión)
2. [Dashboard](#2-dashboard)
3. [Gestión de Productos](#3-gestión-de-productos)
4. [Gestión de Ingredientes](#4-gestión-de-ingredientes)
5. [Gestión de Categorías](#5-gestión-de-categorías)
6. [Gestión de Pedidos](#6-gestión-de-pedidos)
7. [Calendario](#7-calendario)
8. [Galería de Imágenes](#8-galería-de-imágenes)
9. [Consejos y Tareas Comunes](#9-consejos-y-tareas-comunes)

---

## 1. Iniciar Sesión

1. Ingresá a **tusitio.com/sign-in**
2. Usá tu correo de administrador (el que está configurado en `ADMIN_EMAILS`)
3. Completá el proceso de autenticación con Clerk
4. Serás redirigido automáticamente. Navegá a **tusitio.com/admin**

> ⚠️ **Importante:** Solo los correos electrónicos listados en la variable `ADMIN_EMAILS` tienen acceso al panel de administración. Si alguien intenta acceder sin autorización, será redirigido a la página principal.

---

## 2. Dashboard

La página principal del admin (`/admin`) muestra un resumen rápido de tu negocio:

- **Pedidos pendientes** — Número de pedidos que necesitan tu atención
- **Pedidos del día** — Entregas programadas para hoy
- **Productos activos** — Total de productos disponibles en la tienda
- **Ingresos recientes** — Resumen de ventas

Desde aquí podés navegar a cualquier sección usando la **barra lateral** (sidebar) a la izquierda.

### Secciones del Sidebar

| Icono | Sección | Descripción |
|-------|---------|-------------|
| 📦 | Productos | Gestionar tablas, especialidades, servicios y talleres |
| 🧀 | Ingredientes | Gestionar ingredientes para tablas configurables |
| 📂 | Categorías | Organizar ingredientes en categorías |
| 📋 | Pedidos | Ver y gestionar pedidos de clientes |
| 📅 | Calendario | Ver pedidos por fecha y bloquear días |
| 🖼 | Galería | Subir y gestionar imágenes de productos |

---

## 3. Gestión de Productos

**Ruta:** `/admin/productos`

### Tipos de Productos

| Tipo | Descripción | Ejemplo |
|------|------------|---------|
| **Tabla** | Tabla de charcutería (puede ser configurable) | Tabla Clásica, Tabla Premium |
| **Especialidad** | Producto fijo con precio definido | Queso Brie importado, Salami artesanal |
| **Servicio** | Servicio de catering o evento | Catering para bodas |
| **Taller** | Clase o workshop | Taller de quesos artesanales |

### Crear un Producto

1. Hacé clic en **"Nuevo Producto"**
2. Completá los campos:
   - **Nombre**: Nombre del producto (ej: "Tabla Clásica para 4")
   - **Slug**: URL amigable (se genera automáticamente, ej: `tabla-clasica-para-4`)
   - **Tipo**: Seleccioná tabla, especialidad, servicio o taller
   - **Descripción**: Descripción completa (hasta 2000 caracteres)
   - **Descripción corta**: Texto breve para tarjetas (hasta 300 caracteres)
   - **Precio**: Precio en colones (ej: `25000.00`)
   - **Personas mínimo/máximo**: Rango de personas (para tablas y servicios)
   - **Configurable**: ✅ si el cliente puede elegir ingredientes
   - **Fijo**: ✅ si los ingredientes son fijos (no elegibles)
   - **Orden de visualización**: Número para ordenar en la tienda
3. Hacé clic en **"Guardar"**

### Editar un Producto

1. En la lista, hacé clic en el botón de **editar** (ícono de lápiz)
2. Modificá los campos necesarios
3. Guardá los cambios

### Desactivar un Producto

- Los productos no se eliminan, se **desactivan**
- Un producto desactivado no aparece en la tienda pero se mantiene en el historial de pedidos
- Hacé clic en el botón de **eliminar** para desactivar

> 💡 **Tip:** Usá el campo "Orden de visualización" para controlar qué productos aparecen primero. Menor número = aparece primero.

---

## 4. Gestión de Ingredientes

**Ruta:** `/admin/ingredientes`

Los ingredientes son los componentes que los clientes eligen al armar una tabla configurable.

### Crear un Ingrediente

1. Hacé clic en **"Nuevo Ingrediente"**
2. Completá:
   - **Nombre**: Nombre del ingrediente (ej: "Queso Gouda")
   - **Categoría**: Seleccioná la categoría (ej: "Quesos")
   - **Costo**: Tu costo unitario (para referencia interna)
   - **Unidad de costo**: Gramos (g), Unidades (u), o Mililitros (ml)
   - **Descripción**: Descripción opcional
   - **Imagen**: URL de la imagen
   - **Disponible**: ✅ si está disponible actualmente

### Marcar como No Disponible

Si un ingrediente se agotó temporalmente:
1. Editá el ingrediente
2. Desmarcá la casilla **"Disponible"**
3. El ingrediente no aparecerá como opción para los clientes

> 💡 **Tip:** Cuando eliminás un ingrediente, en realidad se **desactiva** (no se borra). Así se mantiene el historial de pedidos anteriores.

---

## 5. Gestión de Categorías

**Ruta:** `/admin/categorias`

Las categorías agrupan ingredientes (ej: "Quesos", "Embutidos", "Frutas", "Acompañamientos").

### Crear una Categoría

1. Hacé clic en **"Nueva Categoría"**
2. Ingresá el **nombre** (ej: "Quesos Duros")
3. Opcionalmente, asigná un **orden de visualización**
4. Guardá

### Editar / Eliminar

- **Editar**: Cambiá el nombre o el orden
- **Eliminar**: Solo es posible si **no hay ingredientes** asignados a esa categoría. Si hay ingredientes, primero reasignalos a otra categoría.

> ⚠️ El slug se genera automáticamente a partir del nombre.

---

## 6. Gestión de Pedidos

**Ruta:** `/admin/pedidos`

### Vista de Pedidos

La lista muestra los pedidos más recientes (hasta 100) con:
- Número de pedido (ej: `LT-260214-A3B5C7D9`)
- Nombre del cliente
- Estado del pedido
- Estado del pago
- Fecha de entrega
- Total

### Estados del Pedido

| Estado | Significado | Color |
|--------|------------|-------|
| 🟡 Pendiente | Recién creado, esperando confirmación | Amarillo |
| 🔵 Confirmado | Pedido aceptado y confirmado | Azul |
| 🟠 Preparando | En preparación | Naranja |
| 🟢 Listo | Listo para entrega o retiro | Verde |
| ✅ Entregado | Entregado al cliente | Verde oscuro |
| 🔴 Cancelado | Pedido cancelado | Rojo |

### Actualizar un Pedido

1. Hacé clic en un pedido para ver los detalles
2. Podés cambiar:
   - **Estado del pedido**: Pendiente → Confirmado → Preparando → Listo → Entregado
   - **Estado del pago**: Pendiente → Verificado / Rechazado
3. Los cambios se guardan inmediatamente

### Verificar Pago

Cuando un cliente paga por **Sinpe Móvil** o **Transferencia**:
1. Verificá el comprobante de pago
2. Cambiá el estado de pago a **"Verificado"**
3. Cambiá el estado del pedido a **"Confirmado"**

### Flujo Típico de un Pedido

```
Cliente hace pedido → Pendiente
   ↓
Verificás el pago → Confirmado
   ↓
Empezás a preparar → Preparando
   ↓
Todo listo → Listo
   ↓
Entregado al cliente → Entregado
```

---

## 7. Calendario

**Ruta:** `/admin/calendario`

### Vista del Calendario

- Muestra los **pedidos programados** por fecha de entrega
- Podés ver de un vistazo qué días tienen entregas pendientes

### Bloquear Fechas

Si no podés aceptar pedidos en cierta fecha (vacaciones, feriados, etc.):

1. Seleccioná la fecha en el calendario
2. Hacé clic en **"Bloquear fecha"**
3. Opcionalmente agregá una **razón** (ej: "Feriado nacional")
4. Los clientes **no podrán** seleccionar esa fecha al hacer un pedido

### Desbloquear una Fecha

- Hacé clic en la fecha bloqueada
- Hacé clic en **"Desbloquear"** (ícono de eliminar)

> 💡 **Tip:** Los clientes solo pueden pedir con **mínimo 2 días de anticipación**. Esto te da tiempo para preparar todo.

---

## 8. Galería de Imágenes

**Ruta:** `/admin/galeria`

### Subir Imágenes

1. Hacé clic en **"Subir Imagen"**
2. Seleccioná un archivo (JPEG, PNG o WebP, máximo 5MB)
3. Asigná el **producto** al que pertenece la imagen
4. Opcionalmente agregá un **texto alternativo** (para accesibilidad)
5. La imagen se sube automáticamente a Vercel Blob

### Gestionar Imágenes

- Las imágenes se muestran con el nombre del producto asociado
- Podés **eliminar** imágenes que ya no necesités
- Las imágenes aparecen automáticamente en la galería del producto correspondiente

### Formatos Aceptados

| Formato | Tamaño Máximo |
|---------|--------------|
| JPEG (.jpg) | 5 MB |
| PNG (.png) | 5 MB |
| WebP (.webp) | 5 MB |

> 💡 **Tip:** Usá imágenes de al menos 800x600px para que se vean bien. El formato WebP es el más liviano y recomendado.

---

## 9. Consejos y Tareas Comunes

### 🔄 Inicio de Semana

1. Revisá los **pedidos pendientes** en el dashboard
2. Verificá que los **ingredientes** estén actualizados (disponibilidad)
3. Bloqueá cualquier fecha que necesités en el **calendario**

### 📦 Cuando Llega un Pedido Nuevo

1. Recibirás un **email de notificación** con los detalles
2. Verificá el **pago** (Sinpe o transferencia)
3. Cambiá el estado del pago a **Verificado**
4. Cambiá el estado del pedido a **Confirmado**
5. Contactá al cliente si hay alguna duda

### 🧀 Cuando un Ingrediente se Agota

1. Andá a **Ingredientes**
2. Editá el ingrediente agotado
3. Desmarcá **"Disponible"**
4. El ingrediente dejará de mostrarse a los clientes
5. Cuando lo repongas, volvé a marcarlo como disponible

### 📸 Actualizar Fotos de Productos

1. Subí la nueva imagen en **Galería**
2. Asignala al producto correcto
3. Si querés cambiar la imagen principal, editá el producto y actualizá la URL de imagen

### ❌ Cancelar un Pedido

1. Abrí el pedido en **Pedidos**
2. Cambiá el estado a **"Cancelado"**
3. Contactá al cliente para informarle y coordinar el reembolso

### 🔍 Buscar un Pedido

Los pedidos se identifican por su **número de pedido** (ej: `LT-260214-A3B5C7D9`). Los clientes pueden rastrear su pedido en la tienda ingresando este número.

---

## ❓ Preguntas Frecuentes

**¿Puedo agregar otro administrador?**
Sí, agregá su correo electrónico a la variable `ADMIN_EMAILS` en la configuración del servidor (separado por comas).

**¿Los productos eliminados desaparecen completamente?**
No, se desactivan. Los pedidos anteriores que incluían ese producto mantienen su referencia.

**¿Puedo editar un pedido ya creado?**
Podés cambiar el estado del pedido y del pago, pero no los productos o cantidades. Si necesitás cambiar algo, contactá al cliente y pedile que haga un nuevo pedido.

**¿Qué pasa si un cliente pide en una fecha bloqueada?**
No puede. El sistema no muestra las fechas bloqueadas como opciones disponibles.

---

*¿Necesitás ayuda? Contactá al equipo de desarrollo.*
