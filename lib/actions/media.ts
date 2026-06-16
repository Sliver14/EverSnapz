"use server";

import { db } from "@/lib/db";
import { photos } from "@/lib/db/schema";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadMedia(formData: FormData) {
  const file = formData.get("file") as File;
  const eventId = formData.get("eventId") as string;
  const guestName = formData.get("guestName") as string;

  if (!file || !eventId) throw new Error("Missing file or event ID");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `moments/${eventId}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  }) as any;

  const [newPhoto] = await db.insert(photos).values({
    eventId,
    url: result.secure_url,
    publicId: result.public_id,
    guestName: guestName || "Anonymous Guest",
    metadata: {
      width: result.width,
      height: result.height,
      format: result.format,
    },
  }).returning();

  revalidatePath(`/guest/${eventId}`);
  revalidatePath(`/live-wall/${eventId}`);
  
  return newPhoto;
}

export async function getPhotos(eventId: string) {
  return await db.query.photos.findMany({
    where: (photos, { eq }) => eq(photos.eventId, eventId),
    orderBy: (photos, { desc }) => [desc(photos.createdAt)],
  });
}
