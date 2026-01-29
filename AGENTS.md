# Agent Instructions for Link Shortener Project

This document provides guidelines and coding standards for AI assistants working on this Next.js link shortener application. Following these conventions ensures consistency, maintainability, and quality across the codebase.

## Project Overview

This is a **Next.js 16** link shortener application built with:
- **Framework**: Next.js 16.1.4 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **UI Components**: Custom components with shadcn/ui patterns
- **State Management**: React 19 with Server Components

## ⚠️ CRITICAL: Read Documentation First

**BEFORE GENERATING ANY CODE, YOU MUST READ THE RELEVANT DOCUMENTATION FILES IN THE `/docs` DIRECTORY.**

This is not optional. Each documentation file contains essential patterns, conventions, and implementation details that MUST be followed. Skipping this step will result in code that doesn't match project standards.

### Required Reading by Feature:

- **Authentication**: `/docs/authentication.md` - MUST read before implementing ANY authentication, protected routes, or user-related features
- **UI Components**: `/docs/ui-components.md` - MUST read before using or creating ANY UI components

**Workflow**: Read relevant docs → Understand patterns → Generate code following those patterns

## Core Principles

### 1. Type Safety First
- Always use TypeScript with strict mode enabled
- Avoid `any` types - use `unknown` or proper types
- Define interfaces for all data structures
- Use type inference where appropriate

### 2. Server Components by Default
- Use React Server Components unless interactivity is required
- Add `"use client"` directive only when necessary (events, hooks, state)
- Keep client-side JavaScript minimal

### 3. Modern React Patterns
- Use functional components exclusively
- Prefer React 19 features (Server Components, Server Actions)
- Use hooks appropriately in client components
- Implement proper error boundaries

### 4. Database Best Practices
- Use Drizzle ORM for all database operations
- Define schemas with proper types and constraints
- Use transactions for related operations
- Implement proper error handling

### 5. Code Quality
- Write self-documenting code with clear variable names
- Add comments only for complex business logic
- Keep functions small and focused (single responsibility)
- Handle errors explicitly, avoid silent failures

## File Naming Conventions

```
kebab-case:     file-name.ts, my-component.tsx
PascalCase:     ComponentName.tsx (React components)
camelCase:      utilityFunction.ts
SCREAMING_CASE: CONSTANTS.ts (rare)
```

## Import Organization

```typescript
// 1. External dependencies
import { useState } from "react";
import type { Metadata } from "next";

// 2. Internal modules
import { db } from "@/db";
import { links } from "@/db/schema";

// 3. Components
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

// 4. Utils and types
import { cn } from "@/lib/utils";
import type { LinkType } from "@/types";

// 5. Styles (if needed)
import "./styles.css";
```

## Common Patterns

### Server Actions

```typescript
"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function createLink(formData: FormData) {
  try {
    const url = formData.get("url") as string;
    
    // Validate input
    if (!url) {
      return { error: "URL is required" };
    }
    
    // Database operation
    const result = await db.insert(links).values({ url }).returning();
    
    // Revalidate cache
    revalidatePath("/");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Failed to create link:", error);
    return { error: "Failed to create link" };
  }
}
```

### Client Components

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LinkForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      // Handle form submission
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
}
```

### Database Queries

```typescript
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

// Fetch with error handling
export async function getLinkBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(links)
      .where(eq(links.slug, slug))
      .limit(1);
      
    return result[0] ?? null;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch link");
  }
}
```

## Error Handling

- Use try-catch blocks for async operations
- Return error objects from Server Actions: `{ error: string }`
- Log errors with context: `console.error("Context:", error)`
- Display user-friendly error messages
- Implement error boundaries for client components

## Performance Considerations

- Use dynamic imports for large components: `const Component = dynamic(() => import('./Component'))`
- Implement proper loading states
- Use React Suspense with fallbacks
- Optimize images with Next.js Image component
- Enable appropriate caching strategies

## Security Guidelines

- Validate all user inputs
- Use Clerk's built-in protections for authentication
- Sanitize data before database insertion
- Use parameterized queries (Drizzle handles this)
- Implement rate limiting for public endpoints
- Never expose sensitive environment variables to client

## Testing Approach

- Test business logic separately from UI
- Use TypeScript for type checking as first line of defense
- Test error cases and edge conditions
- Validate form inputs comprehensively

## Documentation

- Add JSDoc comments for public APIs and complex functions
- Document non-obvious business logic
- Keep README.md updated with setup instructions
- Document environment variables in `.env.example`

## When Making Changes

1. **Understand Context**: Read related files before making changes
2. **Follow Patterns**: Match existing code style and patterns
3. **Type Everything**: Ensure all new code is properly typed
4. **Test Locally**: Verify changes work as expected
5. **Consider Impact**: Think about performance and security implications
6. **Update Docs**: Update relevant documentation if needed

## Getting Help

- Check Next.js 16 documentation for App Router features
- Reference Drizzle ORM docs for database operations
- Consult Clerk documentation for authentication patterns
- Review Tailwind CSS 4 docs for styling utilities

---

**Last Updated**: January 2026  
**Next.js Version**: 16.1.4  
**React Version**: 19.2.3
