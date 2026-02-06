import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function deleteLink(linkId: number, userId: string) {
  const result = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  if (result.length === 0) {
    throw new Error("Link not found or you don't have permission to delete it");
  }

  return result[0];
}
