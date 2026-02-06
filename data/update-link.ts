import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function updateLink(
  linkId: number,
  userId: string,
  data: { url: string; slug: string }
) {
  const result = await db
    .update(links)
    .set({
      url: data.url,
      slug: data.slug,
      updatedAt: new Date(),
    })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  if (result.length === 0) {
    throw new Error("Link not found or you don't have permission to update it");
  }

  return result[0];
}
