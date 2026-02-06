---
description: Read this file to understand how to fetch data for the project.
---
# Data Fetching Guidelines
This document outlines the steps and best practices for fetching data in out Next.js application. Adhering to these guidelines will help ensure consistency, performance, and maintainability across the codebase.
## 1. Use server components for data fetching
In Next.js, ALWAYS use server components for data fetching. NEVER use client components to fetch data.

## 2. Data Fetching Methods
ALWAYS use the helper functions in the /data directory  to fetch data. NEVER fetch data directly in the components.
ALL helper functions in the /data directory should use Drizzle ORM for database interactions.