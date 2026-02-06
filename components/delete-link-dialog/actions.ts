"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { deleteLink } from "@/data/delete-link";

// Validation schema
const deleteLinkSchema = z.object({
  id: z.number(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(data: DeleteLinkInput) {
  try {
    // Check for authenticated user
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be logged in to delete a link" };
    }

    // Validate input
    const validated = deleteLinkSchema.safeParse(data);
    if (!validated.success) {
      return { error: validated.error.issues[0]?.message || "Invalid input" };
    }

    // Delete the link using the data helper
    await deleteLink(validated.data.id, userId);

    // Revalidate the dashboard page to show the updated list
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete link:", error);
    
    if (error instanceof Error && error.message.includes("not found")) {
      return { error: error.message };
    }
    
    return { error: "Failed to delete link. Please try again." };
  }
}
