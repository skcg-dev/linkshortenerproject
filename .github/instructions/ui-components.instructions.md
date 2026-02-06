---
description: Read this before creating or modifying UI components in the project.
---

# UI Components Guidelines

This document outlines the UI component standards for this Next.js link shortener application.

## Core Principle

**Always use shadcn/ui components. Never create custom UI components.**

## What is shadcn/ui?

shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS. Components are copied into your project, giving you full control while maintaining consistency.

## Component Usage

### Installing Components

When you need a new UI component, use the shadcn CLI:

```bash
npx shadcn@latest add [component-name]
```

Common components:
- `button` - Buttons with variants (default, destructive, outline, ghost, link)
- `input` - Text inputs with proper styling
- `label` - Form labels
- `card` - Content containers
- `dialog` - Modals and dialogs
- `form` - Form components with validation
- `toast` - Toast notifications
- `dropdown-menu` - Dropdown menus
- `select` - Select dropdowns
- `checkbox` - Checkboxes
- `radio-group` - Radio buttons
- `textarea` - Multi-line text inputs
- `badge` - Status badges
- `alert` - Alert messages

### Component Location

All shadcn components are installed in `/components/ui/` directory.

### Using Components

```typescript
// Import from the ui directory
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Component Variants

shadcn components come with built-in variants. Always use these instead of custom styling:

```typescript
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

## Customizing Components

If you need to customize a shadcn component:

1. **Prefer variants**: Use the built-in variant system
2. **Use className**: Extend with Tailwind classes via `className` prop
3. **Modify source**: Edit the component in `/components/ui/` if needed (you own the code)

```typescript
// Extend with additional Tailwind classes
<Button className="w-full mt-4">
  Full Width Button
</Button>
```

## Forms

Use shadcn's form components with React Hook Form:

```typescript
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LinkForm() {
  const { register, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="url">URL</Label>
          <Input id="url" {...register("url")} />
        </div>
        <Button type="submit">Create Link</Button>
      </div>
    </form>
  );
}
```

## Accessibility

shadcn components are built on Radix UI, which provides excellent accessibility out of the box. Always use the provided components to maintain accessibility standards.

## Key Rules

1. ❌ **Never create custom UI components** - Use shadcn/ui
2. ✅ **Install missing components** - Use `npx shadcn@latest add [component]`
3. ✅ **Use component variants** - Don't reinvent styling
4. ✅ **Extend with Tailwind** - Use `className` prop for customization
5. ✅ **Check documentation** - Visit [ui.shadcn.com](https://ui.shadcn.com) for component APIs

## Reference

- **Official Documentation**: https://ui.shadcn.com
- **Component List**: https://ui.shadcn.com/docs/components
- **Installation Guide**: https://ui.shadcn.com/docs/installation/next

---

**Remember**: If you need a UI element, check shadcn/ui first. It likely exists.
