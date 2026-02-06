import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getLinkBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(links)
      .where(eq(links.slug, slug))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch link by slug:", error);
    throw new Error("Failed to fetch link");
  }
}
