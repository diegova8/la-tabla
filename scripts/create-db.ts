import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  // Connect to default db to create new one
  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql.query("CREATE DATABASE latabla");
    console.log("✅ Database 'latabla' created");
  } catch (err: any) {
    if (err.message?.includes("already exists")) {
      console.log("⏭ Database 'latabla' already exists");
    } else {
      console.error("Error:", err.message);
    }
  }
}

main();
