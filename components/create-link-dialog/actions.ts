"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createLink } from "@/data/create-link";

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
const createLinkSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          // Only allow http and https protocols
          return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "Only HTTP and HTTPS URLs are allowed" }
    )
    .refine(
      (url) => {
        // Additional check: reject dangerous URL schemes
        const dangerousSchemes = [
          "javascript:",
          "data:",
          "file:",
          "vbscript:",
          "about:",
          "blob:",
        ];
        const lowerUrl = url.toLowerCase().trim();
        return !dangerousSchemes.some((scheme) => lowerUrl.startsWith(scheme));
      },
      { message: "Invalid URL scheme detected" }
    ),
  customSlug: z
    .string()
    .optional()
    .refine(
      (slug) => {
        // Allow empty/undefined (optional slug)
        if (!slug) return true;
        // Minimum length validation (3 characters)
        if (slug.length < 3) return false;
        return true;
      },
      { message: "Slug must be at least 3 characters long" }
    )
    .refine(
      (slug) => {
        // Allow empty/undefined (optional slug)
        if (!slug) return true;
        // Maximum length validation (12 characters based on schema)
        if (slug.length > 12) return false;
        return true;
      },
      { message: "Slug must be at most 12 characters long" }
    )
    .refine(
      (slug) => {
        // Allow empty/undefined (optional slug)
        if (!slug) return true;
        // Strict character validation: only alphanumeric, hyphens, and underscores
        return /^[a-zA-Z0-9_-]+$/.test(slug);
      },
      { message: "Slug can only contain letters, numbers, hyphens, and underscores" }
    )
    .refine(
      (slug) => {
        // Allow empty/undefined (optional slug)
        if (!slug) return true;
        // Prevent reserved slugs to avoid collision attacks
        return !RESERVED_SLUGS.includes(slug.toLowerCase());
      },
      { message: "This slug is reserved and cannot be used" }
    )
    .refine(
      (slug) => {
        // Allow empty/undefined (optional slug)
        if (!slug) return true;
        // Prevent path traversal attempts
        return !slug.includes("..") && !slug.includes("/") && !slug.includes("\\");
      },
      { message: "Slug contains invalid characters" }
    ),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(data: CreateLinkInput) {
  try {
    // Check for authenticated user
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be logged in to create a link" };
    }

    // Validate input
    const validated = createLinkSchema.safeParse(data);
    if (!validated.success) {
      return { error: validated.error.issues[0]?.message || "Invalid input" };
    }

    // Create the link using the data helper
    const link = await createLink({
      userId,
      url: validated.data.url,
      customSlug: validated.data.customSlug,
    });

    // Revalidate the dashboard page to show the new link
    revalidatePath("/dashboard");

    return { success: true, data: link };
  } catch (error) {
    console.error("Failed to create link:", error);
    
    // Handle unique constraint violation (duplicate slug)
    if (error instanceof Error && error.message.includes("unique")) {
      return { error: "This custom slug is already taken. Please choose another one." };
    }
    
    return { error: "Failed to create link. Please try again." };
  }
}
