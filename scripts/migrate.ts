import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join, resolve } from "path";
import { readdirSync } from "fs";

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);
  const migrationPath = resolve(__dirname, "../drizzle/migrations/0000_public_professor_monster.sql");
  const migration = readFileSync(migrationPath, "utf-8");

  const statements = migration
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter(Boolean);

  console.log(`Running ${statements.length} statements...`);

  for (const stmt of statements) {
    try {
      await sql.query(stmt);
      console.log("✓", stmt.substring(0, 60) + "...");
    } catch (err: any) {
      if (err.message?.includes("already exists")) {
        console.log("⏭", stmt.substring(0, 60) + "... (already exists)");
      } else {
        console.error("✗", stmt.substring(0, 60));
        console.error("  ", err.message);
      }
    }
  }

  console.log("\n✅ Migration complete!");
}

migrate();
