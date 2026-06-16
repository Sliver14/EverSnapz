import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { users, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  const signature = req.headers.get("x-paystack-signature");

  if (!signature) return new Response("No signature", { status: 400 });

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(JSON.stringify(body))
    .digest("hex");

  if (hash !== signature) return new Response("Invalid signature", { status: 400 });

  if (body.event === "charge.success") {
    const { userId, plan } = body.data.metadata;
    const reference = body.data.reference;
    const amount = body.data.amount / 100;

    await db.transaction(async (tx) => {
      await tx.update(users).set({ plan }).where(eq(users.id, userId));
      await tx.insert(subscriptions).values({
        userId,
        status: "active",
        paymentId: reference,
        amount: amount.toString(),
      });
    });
  }

  return NextResponse.json({ received: true });
}
