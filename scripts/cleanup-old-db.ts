import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  // Connect to OLD neondb to drop la-tabla tables
  const oldUrl = process.env.DATABASE_URL!.replace("/latabla?", "/neondb?");
  const sql = neon(oldUrl);

  const tablesToDrop = [
    "order_item_ingredients", "order_items", "orders",
    "tabla_fixed_ingredients", "tabla_rules", "service_config",
    "product_variants", "product_images", "products",
    "ingredients", "categories", "delivery_slots", "blocked_dates",
  ];

  console.log("🧹 Cleaning La Tabla tables from neondb...");
  for (const table of tablesToDrop) {
    try {
      await sql.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
      console.log(`  ✓ Dropped ${table}`);
    } catch (err: any) {
      console.log(`  ⏭ ${table}: ${err.message}`);
    }
  }
  console.log("\n✅ Cleanup done! neondb only has Festival Pulse tables now.");
}

main();
