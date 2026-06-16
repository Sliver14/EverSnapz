"use server";

import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { getServerSession } from "next-auth/next";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createEvent(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const date = formData.get("date") as string;
  const coverPhoto = formData.get("coverPhoto") as File;

  if (!name) throw new Error("Event name is required");

  let coverPhotoUrl = null;
  let coverPhotoPublicId = null;

  if (coverPhoto && coverPhoto.size > 0) {
    const arrayBuffer = await coverPhoto.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `moments/covers`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    coverPhotoUrl = result.secure_url;
    coverPhotoPublicId = result.public_id;
  }

  const slugBase = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const [newEvent] = await db.insert(events).values({
    hostId: session.user.id,
    name,
    slug: `${slugBase}-${Math.random().toString(36).substring(2, 7)}`,
    date: date ? new Date(date) : null,
    coverPhotoUrl,
    coverPhotoPublicId,
  }).returning();

  revalidatePath("/dashboard");
  return newEvent;
}

export async function updateEventCoverPhoto(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const eventId = formData.get("eventId") as string;
  const coverPhoto = formData.get("coverPhoto") as File;

  if (!eventId || !coverPhoto) throw new Error("Missing event ID or cover photo");

  const arrayBuffer = await coverPhoto.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `moments/covers`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  }) as any;

  await db.update(events)
    .set({ 
      coverPhotoUrl: result.secure_url, 
      coverPhotoPublicId: result.public_id 
    })
    .where(eq(events.id, eventId));

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/settings`);
  return { success: true, url: result.secure_url };
}

export async function getEvents() {
  const session = await getServerSession(authOptions);
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

export async function deleteEvent(eventId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Verify ownership
  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!event || event.hostId !== session.user.id) {
    throw new Error("Unauthorized or event not found");
  }

  await db.delete(events).where(eq(events.id, eventId));

  revalidatePath("/dashboard");
  return { success: true };
}
