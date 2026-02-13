import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim()).filter(Boolean);

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ isAdmin: false });

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress;

    return NextResponse.json({ isAdmin: !!email && ADMIN_EMAILS.includes(email) });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
