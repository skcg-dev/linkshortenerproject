"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { updateLink } from "@/data/update-link";

// Reserved slugs that cannot be used to prevent collision attacks
const RESERVED_SLUGS = [
  "api",
  "dashboard",
  "admin",
  "auth",
  "signin",
  "signout",
  "signup",
  "login",
  "logout",
  "register",
  "app",
  "public",
  "static",
  "assets",
  "images",
  "scripts",
  "styles",
  "css",
  "js",
  "fonts",
  "_next",
  "favicon",
  "robots",
  "sitemap",
  "health",
  "status",
];

// Validation schema
const updateLinkSchema = z.object({
  id: z.number(),
  url: z.string().url({ message: "Please enter a valid URL" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(12, { message: "Slug must be at most 12 characters long" })
    .refine(
      (slug) => /^[a-zA-Z0-9_-]+$/.test(slug),
      { message: "Slug can only contain letters, numbers, hyphens, and underscores" }
    )
    .refine(
      (slug) => !RESERVED_SLUGS.includes(slug.toLowerCase()),
      { message: "This slug is reserved and cannot be used" }
    )
    .refine(
      (slug) => !slug.includes("..") && !slug.includes("/") && !slug.includes("\\"),
      { message: "Slug contains invalid characters" }
    ),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(data: UpdateLinkInput) {
  try {
    // Check for authenticated user
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be logged in to update a link" };
    }

    // Validate input
    const validated = updateLinkSchema.safeParse(data);
    if (!validated.success) {
      return { error: validated.error.issues[0]?.message || "Invalid input" };
    }

    // Update the link using the data helper
    const link = await updateLink(validated.data.id, userId, {
      url: validated.data.url,
      slug: validated.data.slug,
    });

    // Revalidate the dashboard page to show the updated link
    revalidatePath("/dashboard");

    return { success: true, data: link };
  } catch (error) {
    console.error("Failed to update link:", error);
    
    // Handle unique constraint violation (duplicate slug)
    if (error instanceof Error && error.message.includes("unique")) {
      return { error: "This slug is already taken. Please choose another one." };
    }
    
    if (error instanceof Error && error.message.includes("not found")) {
      return { error: error.message };
    }
    
    return { error: "Failed to update link. Please try again." };
  }
}
