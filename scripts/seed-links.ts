import "dotenv/config";
import { db } from "@/db";
import { links } from "@/db/schema";
import type { NewLink } from "@/db/schema";

const userId = "user_38sbyiMokwax3eMvNmb2MLKUOfw";

const exampleLinks: Omit<NewLink, "createdAt" | "updatedAt">[] = [
  {
    userId,
    slug: "github-prof",
    url: "https://github.com/johndoe",
  },
  {
    userId,
    slug: "portfolio",
    url: "https://johndoe.dev",
  },
  {
    userId,
    slug: "linkedin",
    url: "https://www.linkedin.com/in/johndoe",
  },
  {
    userId,
    slug: "blog-post",
    url: "https://medium.com/@johndoe/my-first-article",
  },
  {
    userId,
    slug: "youtube",
    url: "https://www.youtube.com/@johndoecodes",
  },
  {
    userId,
    slug: "twitter",
    url: "https://twitter.com/johndoe",
  },
  {
    userId,
    slug: "docs-page",
    url: "https://docs.myproject.com/getting-started",
  },
  {
    userId,
    slug: "demo-app",
    url: "https://demo.myapp.com",
  },
  {
    userId,
    slug: "meeting",
    url: "https://meet.google.com/abc-defg-hij",
  },
  {
    userId,
    slug: "calendar",
    url: "https://calendly.com/johndoe/30min",
  },
];

async function seedLinks() {
  try {
    console.log("Starting to seed links...");
    
    const result = await db.insert(links).values(exampleLinks).returning();
    
    console.log(`✅ Successfully created ${result.length} links`);
    console.log("\nCreated links:");
    result.forEach((link) => {
      console.log(`- /${link.slug} → ${link.url}`);
    });
  } catch (error) {
    console.error("❌ Failed to seed links:", error);
    throw error;
  }
}

seedLinks()
  .then(() => {
    console.log("\n✨ Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  });
