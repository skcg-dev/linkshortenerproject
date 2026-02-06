import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function incrementClickCount(linkId: number) {
  try {
    const result = await db
      .update(links)
      .set({
        clickCount: sql`${links.clickCount} + 1`,
      })
      .where(eq(links.id, linkId))
      .returning();

    return result[0] ?? null;
  } catch (error) {
    console.error("Failed to increment click count:", error);
    throw new Error("Failed to increment click count");
  }
}
