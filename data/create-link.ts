import { db } from "@/db";
import { links } from "@/db/schema";
import { nanoid } from "nanoid";

export interface CreateLinkInput {
  userId: string;
  url: string;
  customSlug?: string;
}

export async function createLink(input: CreateLinkInput) {
  const slug = input.customSlug || nanoid(8);
  
  const result = await db
    .insert(links)
    .values({
      userId: input.userId,
      slug,
      url: input.url,
    })
    .returning();
  
  return result[0];
}
