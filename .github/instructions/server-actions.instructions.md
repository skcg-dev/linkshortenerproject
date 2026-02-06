---
description: Use these instructions when implementing or modifying server actions for data mutations in the app.
---

# Server Actions Instructions

## When to Use
Use these instructions for **all data mutations** in the application. All data-changing logic must be implemented via server actions.

## Key Rules

- **All data mutations must use server actions.**
- **Server actions must be called from client components.**
- **Server action files must be named `actions.ts` and colocated in the directory of the component that calls them.**
- **All data passed to server actions must have explicit TypeScript types.**
  - _Do not use the `FormData` TypeScript type._
- **All data must be validated in server actions using [zod](https://zod.dev/).**
- **Every server action must check for a logged-in user before any database operation.**
- **Database operations must be performed via helper functions in the `/data` directory.**
  - _Do not use Drizzle queries directly in server actions._

## Example Structure

```
/components/my-form/actions.ts
  - export async function createItem(data: CreateItemInput) { ... }

/components/my-form/MyForm.tsx
  - Calls createItem via a server action

/data/create-item.ts
  - Exports a helper function that wraps the Drizzle query
```

## Validation & Typing
- Define input types for all server actions.
- Use zod schemas to validate all incoming data.
- Return user-friendly error objects on validation or auth failure.

## Error Handling
- **Server actions must NOT throw errors.**
- **Always return an object with either an `error` or `success` property.**
- Use the pattern: `{ error: string }` for failures or `{ success: true, data?: T }` for success.
- Handle all exceptions with try-catch and return error objects.

## Authentication
- Use Clerk or the app's auth system to check for a logged-in user at the start of every server action.

## Database Access
- Only use helper functions from `/data` for database operations.
- Do not import or use Drizzle directly in server actions.

---
**Always follow these conventions for maintainable, secure, and type-safe data mutations.**
