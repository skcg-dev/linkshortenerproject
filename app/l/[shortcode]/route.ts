import { NextRequest, NextResponse } from "next/server";
import { getLinkBySlug } from "@/data/get-link-by-slug";
import { incrementClickCount } from "@/data/increment-click-count";

// Validation constants
const SLUG_MAX_LENGTH = 12;
const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;

/**
 * Validates slug format to prevent SQL injection and XSS attacks
 * @param slug - The slug to validate
 * @returns true if valid, false otherwise
 */
function isValidSlug(slug: string): boolean {
  // Check if slug is empty
  if (!slug || slug.trim().length === 0) {
    return false;
  }

  // Check length constraint (max 12 characters as per schema)
  if (slug.length > SLUG_MAX_LENGTH) {
    return false;
  }

  // Check if slug contains only safe characters (alphanumeric, hyphens, underscores)
  if (!SLUG_PATTERN.test(slug)) {
    return false;
  }

  return true;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  try {
    const { shortcode } = await params;

    // Validate and sanitize the slug parameter
    if (!isValidSlug(shortcode)) {
      return new NextResponse("Invalid shortcode format", { status: 400 });
    }

    // Fetch the link from the database
    const link = await getLinkBySlug(shortcode);

    if (!link) {
      return new NextResponse("Link not found", { status: 404 });
    }

    // Check if link has expired
    if (link.expiresAt && new Date() > link.expiresAt) {
      return new NextResponse("Link has expired", { status: 410 });
    }

    // Check if max clicks exceeded
    if (link.maxClicks !== null && link.clickCount >= link.maxClicks) {
      return new NextResponse("Link has reached maximum clicks", {
        status: 410,
      });
    }

    // Increment click count
    await incrementClickCount(link.id);

    // Redirect to the full URL
    return NextResponse.redirect(link.url, { status: 307 });
  } catch (error) {
    console.error("Redirect error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
