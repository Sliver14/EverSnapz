"use server";

import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { getServerSession } from "next-auth/next";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: { name: string; date?: string }) {
  const session = await getServerSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const slug = formData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const [newEvent] = await db.insert(events).values({
    hostId: session.user.id,
    name: formData.name,
    slug: `${slug}-${Math.random().toString(36).substring(2, 7)}`,
    date: formData.date ? new Date(formData.date) : null,
  }).returning();

  revalidatePath("/dashboard");
  return newEvent;
}

export async function getEvents() {
  const session = await getServerSession();
  if (!session?.user?.id) return [];

  return await db.query.events.findMany({
    where: eq(events.hostId, session.user.id),
    orderBy: [desc(events.createdAt)],
  });
}

export async function getEventBySlug(slug: string) {
  return await db.query.events.findFirst({
    where: eq(events.slug, slug),
  });
}
