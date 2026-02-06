import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserLinks(userId: string) {
  try {
    const result = await db
      .select()
      .from(links)
      .where(eq(links.userId, userId))
      .orderBy(desc(links.createdAt));
    return result;
  } catch (error) {
    console.error("Failed to fetch user links:", error);
    throw new Error("Failed to fetch user links");
  }
}
