import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim()).filter(Boolean);

export async function requireAdmin(): Promise<{ authorized: true } | NextResponse> {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!email || !ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  return { authorized: true };
}
