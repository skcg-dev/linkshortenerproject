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
import { updateLinkAction, type UpdateLinkInput } from "./actions";
import type { Link } from "@/db/schema";

interface EditLinkDialogProps {
    link: Link;
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState(link.url);
    const [slug, setSlug] = useState(link.slug);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data: UpdateLinkInput = {
                id: link.id,
                url,
                slug,
            };

            const result = await updateLinkAction(data);

            if (result.error) {
                setError(result.error);
            } else {
                // Success - close dialog
                setOpen(false);
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Form submission error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    // Reset form when dialog opens
    function handleOpenChange(newOpen: boolean) {
        setOpen(newOpen);
        if (newOpen) {
            setUrl(link.url);
            setSlug(link.slug);
            setError(null);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Edit Link</DialogTitle>
                    <DialogDescription>
                        Update the URL or slug for this short link.
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
                            <Label htmlFor="slug">
                                Slug <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="slug"
                                type="text"
                                placeholder="my-custom-slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                                disabled={isLoading}
                                pattern="[a-zA-Z0-9_-]+"
                                title="Only letters, numbers, hyphens, and underscores are allowed"
                            />
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
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
