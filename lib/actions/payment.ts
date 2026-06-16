"use server";

import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";
import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";

const CONVERSION_RATE = 1400; // 1 USD = 1,400 NGN

export async function initializePaystack(plan: 'PRO' | 'PREMIUM') {
  const session = await getServerSession();
  if (!session?.user?.id || !session.user.email) throw new Error("Unauthorized");

  const amountInUsd = plan === 'PRO' ? 19 : 49;
  const amountInNgn = amountInUsd * CONVERSION_RATE;
  
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: session.user.email,
      amount: amountInNgn * 100, // Paystack expects amount in kobo
      metadata: {
        userId: session.user.id,
        plan,
      },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
    }),
  });

  const data = await response.json();
  if (!data.status) throw new Error(data.message);

  return data.data; // authorization_url, access_code, reference
}

export async function handlePaymentSuccess(reference: string) {
  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  });

  const data = await response.json();
  if (!data.status || data.data.status !== 'success') return false;

  const { userId, plan } = data.data.metadata;

  await db.transaction(async (tx) => {
    await tx.update(users).set({ plan }).where(eq(users.id, userId));
    await tx.insert(subscriptions).values({
      userId,
      status: 'active',
      paymentId: reference,
      amount: (data.data.amount / 100).toString(),
    });
  });

  return true;
}
