import "server-only";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function requireAuth(): Promise<void> {
  const session = await auth();

  if (!session?.user) {
    throw NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
