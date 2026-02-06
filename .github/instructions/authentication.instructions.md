---
description: Read this file before implemnting or modifying authentication in the project.
---

# Authentication Guidelines

## Overview

All authentication in this application is handled exclusively by **Clerk**. No other authentication methods, libraries, or custom auth implementations should be used.

## Core Rules

### 1. Clerk Only
- **Always** use Clerk for authentication
- **Never** implement custom auth logic
- **Never** use alternative auth libraries (NextAuth, Auth.js, etc.)

### 2. Protected Routes

#### Dashboard Protection
The `/dashboard` route is protected and requires authentication:

```typescript
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }
  
  // Dashboard content
}
```

### 3. Homepage Redirect
If a logged-in user tries to access the homepage (`/`), redirect them to `/dashboard`:

```typescript
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }
  
  // Homepage content for logged-out users
}
```

### 4. Modal-Based Auth
Sign in and sign up flows must **always** launch as modals (not full pages):

```typescript
"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";

// Use Clerk's modal mode
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

## Common Patterns

### Check Authentication Status

```typescript
// Server Component
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
if (!userId) {
  // User is not logged in
}
```

```typescript
// Client Component
"use client";
import { useUser } from "@clerk/nextjs";

const { isSignedIn, user } = useUser();
```

### Get Current User Data

```typescript
// Server Component
import { currentUser } from "@clerk/nextjs/server";

const user = await currentUser();
if (user) {
  console.log(user.emailAddresses[0].emailAddress);
}
```

### Protect API Routes

```typescript
// app/api/links/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Protected API logic
}
```

## Middleware Configuration

Use Clerk's middleware to protect multiple routes:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/links(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

## Environment Variables

Required Clerk environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional - customize URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## DO NOT

- ❌ Create custom login/signup forms
- ❌ Store passwords or authentication tokens
- ❌ Implement JWT verification manually
- ❌ Use session cookies directly
- ❌ Mix Clerk with other auth solutions
- ❌ Create custom authentication middleware that bypasses Clerk

## Key Clerk Imports

```typescript
// Server-side
import { auth, currentUser } from "@clerk/nextjs/server";

// Client-side
import { 
  useUser, 
  useAuth, 
  SignInButton, 
  SignUpButton, 
  UserButton 
} from "@clerk/nextjs";

// Middleware
import { clerkMiddleware } from "@clerk/nextjs/server";
```

---

**Last Updated**: January 2026  
**Reference**: [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
