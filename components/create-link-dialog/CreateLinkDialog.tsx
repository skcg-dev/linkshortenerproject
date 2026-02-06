"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLinkAction, type CreateLinkInput } from "./actions";

export function CreateLinkDialog() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState("");
    const [customSlug, setCustomSlug] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data: CreateLinkInput = {
                url,
                customSlug: customSlug || undefined,
            };

            const result = await createLinkAction(data);

            if (result.error) {
                setError(result.error);
            } else {
                // Success - close dialog and reset form
                setOpen(false);
                setUrl("");
                setCustomSlug("");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Form submission error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Create Short Link</DialogTitle>
                    <DialogDescription>
                        Enter a URL to shorten. Optionally, provide a custom slug.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="url">
                                URL <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="url"
                                type="url"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="customSlug">
                                Custom Slug <span className="text-muted-foreground">(optional)</span>
                            </Label>
                            <Input
                                id="customSlug"
                                type="text"
                                placeholder="my-custom-slug"
                                value={customSlug}
                                onChange={(e) => setCustomSlug(e.target.value)}
                                disabled={isLoading}
                                pattern="[a-zA-Z0-9_-]*"
                                title="Only letters, numbers, hyphens, and underscores are allowed"
                            />
                            <p className="text-xs text-muted-foreground">
                                Leave empty to generate a random slug
                            </p>
                        </div>
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Link"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
