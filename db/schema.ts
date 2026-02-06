import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 12 }).notNull().unique(),
    url: text().notNull(),
    clickCount: integer().notNull().default(0),
    maxClicks: integer(),
    expiresAt: timestamp({ mode: "date", withTimezone: true }),
    createdAt: timestamp({ mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ mode: "date", withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("user_id_idx").on(table.userId),
  })
);

// Export types for type-safe operations
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
