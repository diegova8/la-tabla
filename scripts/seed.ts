import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log("🌱 Seeding database...\n");

  // ============================================================
  // CATEGORIES
  // ============================================================
  console.log("📂 Categories...");
  const [catQueso] = await db.insert(schema.categories).values({ name: "Quesos", slug: "quesos", displayOrder: 1 }).returning();
  const [catCarne] = await db.insert(schema.categories).values({ name: "Carnes", slug: "carnes", displayOrder: 2 }).returning();
  const [catPan] = await db.insert(schema.categories).values({ name: "Panes", slug: "panes", displayOrder: 3 }).returning();
  const [catDulce] = await db.insert(schema.categories).values({ name: "Dulce", slug: "dulce", displayOrder: 4 }).returning();
  const [catSemillas] = await db.insert(schema.categories).values({ name: "Semillas", slug: "semillas", displayOrder: 5 }).returning();
  const [catExtras] = await db.insert(schema.categories).values({ name: "Extras", slug: "extras", displayOrder: 6 }).returning();
  console.log("  ✓ 6 categories");

  // ============================================================
  // INGREDIENTS
  // ============================================================
  console.log("🧀 Ingredients...");

  // Quesos
  const quesos = [
    "Gouda", "Chedar", "Marble Jack", "Peper Jack", "Swiss",
    "Muenster", "Cabra", "Parmesano", "Edam", "Babybel",
    "Mozzarella", "Provolone",
  ];
  for (const name of quesos) {
    await db.insert(schema.ingredients).values({
      categoryId: catQueso.id, name, cost: "0", costUnit: "u",
    });
  }

  // Carnes
  const carnes = [
    "Salami", "Fuet Catalán", "Lomo curado", "Chorizo Picante",
    "Proscuiutto", "Jamón Serrano", "Jamón Ibérico",
    "Chorizo Español Normal", "Chorizo Español Picante",
    "Jamón de york y de pavo ahumado", "Peperoni",
  ];
  for (const name of carnes) {
    await db.insert(schema.ingredients).values({
      categoryId: catCarne.id, name, cost: "0", costUnit: "u",
    });
  }

  // Panes
  const panes = [
    "Ciabata", "Ciabata integral", "Ciabata Español", "Baguette",
    "Especias", "Palitos de pan", "Galletas Triscuit",
    "Galletas Sodas", "Galletas Integrales",
  ];
  for (const name of panes) {
    await db.insert(schema.ingredients).values({
      categoryId: catPan.id, name, cost: "0", costUnit: "u",
    });
  }

  // Dulce
  const dulces = [
    "Jalea de Fresa", "Jalea de Melocotón", "Miel Romero",
    "Reducción Balsámico", "Uvas verdes", "Uvas rojas",
    "Peras", "Manzana", "Melocotón deshidratado",
    "Higos deshidratados", "Ciruela deshidratada",
  ];
  for (const name of dulces) {
    await db.insert(schema.ingredients).values({
      categoryId: catDulce.id, name, cost: "0", costUnit: "u",
    });
  }

  // Semillas
  const semillas = [
    "Maní", "Pistachos", "Almendras", "Marañón", "Pecanas", "Avellanas",
  ];
  for (const name of semillas) {
    await db.insert(schema.ingredients).values({
      categoryId: catSemillas.id, name, cost: "0", costUnit: "u",
    });
  }

  console.log(`  ✓ ${quesos.length + carnes.length + panes.length + dulces.length + semillas.length} ingredients`);

  // ============================================================
  // PRODUCTS — TABLAS
  // ============================================================
  console.log("🧀 Products — Tablas...");

  // Tabla Salamanca (configurable)
  const [salamanca] = await db.insert(schema.products).values({
    type: "tabla", name: "Tabla Salamanca", slug: "salamanca",
    description: "Tabla íntima para compartir en pareja. Incluye una selección de queso, charcutería, fruta, miel o reducción y pan artesanal.",
    shortDesc: "Tabla para 1-2 personas",
    imageUrl: "/images/detail/jamon-queso-closeup.jpg",
    price: "50", personsMin: 1, personsMax: 2,
    isConfigurable: true, isFixed: false, isActive: true, displayOrder: 1,
  }).returning();

  await db.insert(schema.tablaRules).values([
    { productId: salamanca.id, categoryId: catQueso.id, quantity: 1 },
    { productId: salamanca.id, categoryId: catCarne.id, quantity: 3 },
    { productId: salamanca.id, categoryId: catDulce.id, quantity: 1 },
    { productId: salamanca.id, categoryId: catPan.id, quantity: 1 },
  ]);

  // Tabla Malasaña (configurable)
  const [malasana] = await db.insert(schema.products).values({
    type: "tabla", name: "Tabla Malasaña", slug: "malasana",
    description: "Tabla versátil para una reunión pequeña. Elegí tus quesos, carnes, pan y extras favoritos.",
    shortDesc: "Tabla para 2-4 personas",
    imageUrl: "/images/tablas/tabla-grande-exterior.jpg",
    price: "85", personsMin: 2, personsMax: 4,
    isConfigurable: true, isFixed: false, isActive: true, displayOrder: 2,
  }).returning();

  await db.insert(schema.tablaRules).values([
    { productId: malasana.id, categoryId: catQueso.id, quantity: 2 },
    { productId: malasana.id, categoryId: catPan.id, quantity: 1 },
    { productId: malasana.id, categoryId: catCarne.id, quantity: 4 },
    { productId: malasana.id, categoryId: catExtras.id, quantity: 2 },
  ]);

  // Tabla Andalucía (configurable)
  const [andalucia] = await db.insert(schema.products).values({
    type: "tabla", name: "Tabla Andalucía", slug: "andalucia",
    description: "Tabla generosa para una reunión familiar o de amigos. Mayor variedad de ingredientes a tu elección.",
    shortDesc: "Tabla para 4-6 personas",
    imageUrl: "/images/tablas/tres-tablas-cocina.jpg",
    price: "100", personsMin: 4, personsMax: 6,
    isConfigurable: true, isFixed: false, isActive: true, displayOrder: 3,
  }).returning();

  await db.insert(schema.tablaRules).values([
    { productId: andalucia.id, categoryId: catQueso.id, quantity: 3 },
    { productId: andalucia.id, categoryId: catPan.id, quantity: 2 },
    { productId: andalucia.id, categoryId: catCarne.id, quantity: 3 },
    { productId: andalucia.id, categoryId: catExtras.id, quantity: 3 },
  ]);

  // Tabla Marbella (fija)
  const [marbella] = await db.insert(schema.products).values({
    type: "tabla", name: "Tabla Marbella", slug: "marbella",
    description: "Nuestra tabla premium con selección curada por el chef. Tortilla de patata, quesos selectos, jamones y acompañamientos frescos.",
    shortDesc: "Tabla para 7-8 personas",
    imageUrl: "/images/tablas/tres-tablas-cocina.jpg",
    price: "150", personsMin: 7, personsMax: 8,
    isConfigurable: false, isFixed: true, isActive: true, displayOrder: 4,
  }).returning();

  // Get ingredient IDs for fixed items
  const allIngredients = await db.select().from(schema.ingredients);
  const findIngredient = (name: string) => allIngredients.find((i) => i.name === name);

  const marbellaIngredients = [
    "Edam", "Peperoni", "Jamón Serrano",
    "Jamón de york y de pavo ahumado",
    "Uvas verdes", "Uvas rojas", "Palitos de pan",
  ];
  for (const name of marbellaIngredients) {
    const ing = findIngredient(name);
    if (ing) {
      await db.insert(schema.tablaFixedIngredients).values({
        productId: marbella.id, ingredientId: ing.id,
      });
    }
  }

  // Tabla Serrano (configurable)
  const [serrano] = await db.insert(schema.products).values({
    type: "tabla", name: "Tabla Serrano", slug: "serrano",
    description: "Nuestra tabla más completa. Ideal para reuniones grandes con la mayor variedad de ingredientes premium.",
    shortDesc: "Tabla para 8-10 personas",
    imageUrl: "/images/servicios/mesa-evento-completa.jpg",
    price: "180", personsMin: 8, personsMax: 10,
    isConfigurable: true, isFixed: false, isActive: true, displayOrder: 5,
  }).returning();

  await db.insert(schema.tablaRules).values([
    { productId: serrano.id, categoryId: catQueso.id, quantity: 4 },
    { productId: serrano.id, categoryId: catPan.id, quantity: 1 },
    { productId: serrano.id, categoryId: catCarne.id, quantity: 5 },
    { productId: serrano.id, categoryId: catExtras.id, quantity: 4 },
  ]);

  // Tabla Marie Antoinette (fija, dulce)
  const [marieAntoinette] = await db.insert(schema.products).values({
    type: "tabla", name: "Marie Antoinette", slug: "marie-antoinette",
    description: "Tabla dulce especial para actividades o eventos. Nutella, frutas frescas, chocolates y galletas.",
    shortDesc: "Tabla dulce para eventos especiales",
    imageUrl: "/images/detail/jamon-queso-closeup.jpg",
    price: "50", personsMin: null, personsMax: null,
    isConfigurable: false, isFixed: true, isActive: true, displayOrder: 6,
  }).returning();

  console.log("  ✓ 6 tablas");

  // ============================================================
  // PRODUCTS — ESPECIALIDADES
  // ============================================================
  console.log("🍳 Products — Especialidades...");

  await db.insert(schema.products).values({
    type: "especialidad", name: "Paella", slug: "paella",
    description: "Deliciosa paella de mariscos con camarón, pescado, pulpo y almejas. O bien Paella de presa cerdo y pollo. El sabor clave lo da nuestro pimentón dulce español.",
    shortDesc: "Paella artesanal para 6-7 personas",
    price: "135", personsMin: 6, personsMax: 7,
    isActive: true, displayOrder: 1,
  });

  await db.insert(schema.products).values({
    type: "especialidad", name: "Risotto de Almejas y Gambas", slug: "risotto-almejas-gambas",
    description: "Platillo único y perfecto para esa ocasión. Con sal de alcaparras y mantequilla de coliflor obtenemos una cremosidad y un sabor exquisito.",
    shortDesc: "Risotto cremoso con mariscos",
    price: "50",
    isActive: true, displayOrder: 2,
  });

  await db.insert(schema.products).values({
    type: "especialidad", name: "Pinchos Capresse", slug: "pinchos-capresse",
    description: "Perfectos pinchos capresse bañados en reducción balsámica para acompañar cualquier platillo.",
    shortDesc: "Pinchos con reducción balsámica",
    price: "2",
    isActive: true, displayOrder: 3,
  });

  await db.insert(schema.products).values({
    type: "especialidad", name: "Tortilla de Patata", slug: "tortilla-de-patata",
    description: "Deliciosa torta española con cebolla y ajo. Especialidad del chef.",
    shortDesc: "Torta española — especialidad del chef",
    price: "30",
    isActive: true, displayOrder: 4,
  });

  // Pavo Thanksgiving with variants
  const [pavo] = await db.insert(schema.products).values({
    type: "especialidad", name: "Pavo Thanksgiving", slug: "pavo-thanksgiving",
    description: "Delicioso pavo al horno para cualquier evento especial.",
    shortDesc: "Pavo al horno para eventos",
    price: "125",
    isActive: true, displayOrder: 5,
  }).returning();

  await db.insert(schema.productVariants).values([
    { productId: pavo.id, name: "7 kg", price: "125" },
    { productId: pavo.id, name: "9 kg", price: "175" },
  ]);

  console.log("  ✓ 5 especialidades (+ 2 variantes)");

  // ============================================================
  // PRODUCTS — SERVICIOS (MESAS)
  // ============================================================
  console.log("🍽️ Products — Servicios...");

  const [mesaRegular] = await db.insert(schema.products).values({
    type: "servicio", name: "Mesa Regular", slug: "mesa-regular",
    description: "Paquete de charcutería y quesos diseñado para actividades o eventos grandes.",
    shortDesc: "Paquete para eventos — $17 por persona",
    price: "17", personsMin: 25, personsMax: null,
    isActive: true, displayOrder: 1,
  }).returning();

  await db.insert(schema.serviceConfig).values({
    productId: mesaRegular.id, pricePerPerson: "17", minPersons: 25,
  });

  const [mesaPremium] = await db.insert(schema.products).values({
    type: "servicio", name: "Mesa Premium", slug: "mesa-premium",
    description: "Paquete premium de charcutería y quesos para actividades o eventos grandes.",
    shortDesc: "Paquete premium para eventos — $20 por persona",
    price: "20", personsMin: 25, personsMax: null,
    isActive: true, displayOrder: 2,
  }).returning();

  await db.insert(schema.serviceConfig).values({
    productId: mesaPremium.id, pricePerPerson: "20", minPersons: 25,
  });

  const [privateChef] = await db.insert(schema.products).values({
    type: "servicio", name: "Servicio Private Chef", slug: "private-chef",
    description: "Te ofrecemos preparación completa de cualquier comida a domicilio. Todo preparado y servido por el chef. Cotizá tu paquete.",
    shortDesc: "Comida a domicilio preparada por el chef",
    price: "0",
    isActive: true, displayOrder: 3,
  }).returning();

  await db.insert(schema.serviceConfig).values({
    productId: privateChef.id, requiresQuote: true,
  });

  console.log("  ✓ 3 servicios");

  // ============================================================
  // PRODUCTS — TALLERES
  // ============================================================
  console.log("🎓 Products — Talleres...");

  const [clasePresencial] = await db.insert(schema.products).values({
    type: "taller", name: "Clase de Montaje de Tablas", slug: "clase-montaje-tablas",
    description: "Te enseñamos a crear tus propias tablas. Clases a domicilio con un mínimo de 4 personas por evento. Incluye materiales.",
    shortDesc: "Clase presencial a domicilio — incluye materiales",
    price: "150", personsMin: 4, personsMax: null,
    isActive: true, displayOrder: 1,
  }).returning();

  await db.insert(schema.serviceConfig).values({
    productId: clasePresencial.id, pricePerPerson: "150", minPersons: 4, includesMaterials: true,
  });

  const [tallerVirtual] = await db.insert(schema.products).values({
    type: "taller", name: "Taller Virtual", slug: "taller-virtual",
    description: "Aprendé a armar tus tablas desde la comodidad de tu casa con nuestro taller virtual.",
    shortDesc: "Taller online de montaje de tablas",
    price: "90",
    isActive: true, displayOrder: 2,
  }).returning();

  await db.insert(schema.serviceConfig).values({
    productId: tallerVirtual.id, isVirtual: true,
  });

  console.log("  ✓ 2 talleres");

  // ============================================================
  // DELIVERY SLOTS
  // ============================================================
  console.log("🕐 Delivery slots...");

  const slots = [
    { label: "9:00 - 10:00 AM", startTime: "09:00", endTime: "10:00" },
    { label: "10:00 - 11:00 AM", startTime: "10:00", endTime: "11:00" },
    { label: "11:00 AM - 12:00 PM", startTime: "11:00", endTime: "12:00" },
    { label: "12:00 - 1:00 PM", startTime: "12:00", endTime: "13:00" },
    { label: "2:00 - 3:00 PM", startTime: "14:00", endTime: "15:00" },
    { label: "3:00 - 4:00 PM", startTime: "15:00", endTime: "16:00" },
    { label: "4:00 - 5:00 PM", startTime: "16:00", endTime: "17:00" },
    { label: "5:00 - 6:00 PM", startTime: "17:00", endTime: "18:00" },
  ];

  for (const slot of slots) {
    await db.insert(schema.deliverySlots).values(slot);
  }

  console.log(`  ✓ ${slots.length} delivery slots`);

  // ============================================================
  console.log("\n✅ Seed complete!");
  console.log("   📂 6 categories");
  console.log("   🧀 49 ingredients");
  console.log("   📦 16 products (6 tablas + 5 especialidades + 3 servicios + 2 talleres)");
  console.log("   🕐 8 delivery slots");
}

seed().catch(console.error);
